/**
 * 分类详情页面 - Category Detail Page
 * 
 * 这个页面显示特定分类的所有音频项目，支持分页浏览
 * 使用 Supabase API 获取数据，支持 SSR 和动态 SEO
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryAudioList } from "@/components/category/CategoryAudioList";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";
import type { Category } from "@/lib/supabase/types";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    page?: string;
  };
}

// 获取分类信息 (服务端)
async function getCategoryById(categoryId: string): Promise<(Category & { audio_count: number }) | null> {
  const supabase = createClient();
  
  const categoryIdNum = parseInt(categoryId, 10);
  if (isNaN(categoryIdNum)) {
    return null;
  }
  
  const { data: category, error } = await supabase
    .from('sound_categories')
    .select('*')
    .eq('id', categoryIdNum)
    .eq('is_active', true)
    .single<Category>();

  if (error || !category) {
    return null;
  }

  // 获取音频数量
  const { count } = await supabase
    .from('sound_audio_items')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryIdNum)
    .eq('is_active', true);

  return {
    ...category,
    audio_count: count || 0
  };
}

// 生成动态元数据
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryById(params.categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found - SoundBoard.run',
      description: 'The requested audio category was not found.',
    };
  }

  const title = `${category.name} Sound Effects (${category.audio_count} sounds) - ${siteConfig.name}`;
  const description = `Browse ${category.audio_count} high-quality ${category.name.toLowerCase()} sound effects. Free download, instant play.`;

  return {
    title,
    description,
    keywords: [category.name, 'sound effects', 'audio', 'free download', 'soundboard'],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteConfig.url}/category/${category.id}`,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/category/${category.id}`,
    },
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: `${siteConfig.url}/category/${category.id}`,
        mainEntity: {
          '@type': 'ItemList',
          name: `${category.name} Sound Effects`,
          numberOfItems: category.audio_count,
          itemListElement: `${siteConfig.url}/api/audio?category=${category.id}`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteConfig.url,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: category.name,
              item: `${siteConfig.url}/category/${category.id}`,
            },
          ],
        },
      }),
    },
  };
}

// 生成静态路径 (ISR)
export async function generateStaticParams() {
  // 在静态生成时不能使用 cookies，直接使用环境变量创建客户端
  const { createClient } = await import('@supabase/supabase-js');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  const { data: categories } = await supabase
    .from('sound_categories')
    .select('id')
    .eq('is_active', true)
    .order('sort_order');

  return categories?.map((category) => ({
    categoryId: category.id,
  })) || [];
}

// 加载指示器组件
function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryById(params.categoryId);
  
  // 如果分类不存在，返回404
  if (!category) {
    notFound();
  }

  const currentPage = parseInt(searchParams.page || '1');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full md:w-4/5 max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题和描述 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {category.name} Sound Effects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of {category.name.toLowerCase()} sound effects
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {category.audio_count} sounds available
            </span>
          </div>
        </div>
        
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>
          <span>→</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </nav>
        
        {/* 音频列表 */}
        <Suspense fallback={<LoadingIndicator />}>
          <CategoryAudioList categoryId={parseInt(params.categoryId, 10)} />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}
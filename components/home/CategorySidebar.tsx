/**
 * 分类侧边栏组件 - CategorySidebar.tsx
 * 
 * 这个组件负责：
 * 1. 显示所有音频分类
 * 2. 显示每个分类的音频数量
 * 3. 处理分类选择和筛选
 * 4. 提供清晰的视觉层次结构
 * 5. 从 Supabase API 动态加载数据
 */

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { categoriesApi } from "@/lib/api-client";
import type { Category } from "@/lib/supabase/types";

interface CategorySidebarProps {
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

export function CategorySidebar({ selectedCategory, onCategorySelect }: CategorySidebarProps) {
  const [categories, setCategories] = useState<(Category & { audio_count?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await categoriesApi.getAll(true); // 包含音频数量
        setCategories(response.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full lg:max-w-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 h-fit lg:sticky lg:top-4">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-24 mb-4"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:max-w-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 h-fit lg:sticky lg:top-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">
          Categories
        </h3>
        <p className="text-red-500 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-primary hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const totalAudioCount = categories.reduce((total, cat) => total + (cat.audio_count || 0), 0);

  return (
    <div className="w-full lg:max-w-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 h-fit lg:sticky lg:top-4">
      {/* 标题 */}
      <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">
        Categories
      </h3>
      
      {/* 全部分类选项 */}
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex justify-between items-center",
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-gray-100 dark:hover:bg-slate-800 text-foreground"
          )}
        >
          <span>All Categories</span>
          <span className="text-sm opacity-70">
            ({totalAudioCount})
          </span>
        </button>
        
        {/* 分类列表 */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex justify-between items-center",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-gray-100 dark:hover:bg-slate-800 text-foreground"
            )}
          >
            <span className="capitalize">{category.name}</span>
            <span className="text-sm opacity-70">
              ({category.audio_count || 0})
            </span>
          </button>
        ))}
      </div>
      
      {/* 底部说明 */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
        <p className="text-xs text-muted-foreground">
          Click on a category to filter sounds or select "All Categories" to view everything.
        </p>
      </div>
    </div>
  );
}
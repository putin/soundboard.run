import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Latest news, updates, and articles about sound effects, meme sounds, and audio trends.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest updates and articles about sound effects and audio trends
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Featured Blog Post */}
            <article className="border-2 border-primary/20 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
                <div className="text-sm text-muted-foreground">
                  January 18, 2025
                </div>
              </div>
              <a href="/blog/meme-soundboard-best-free-meme-sounds" className="block hover:text-primary transition-colors">
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  Meme Soundboard: The Best Free Meme Sounds Online
                </h2>
                <p className="text-muted-foreground mb-4">
                  Discover the ultimate collection of viral audio clips that everyone recognizes. From the legendary "Bruh" to the dramatic Vine Boom, learn why meme soundboards are the perfect tool for gaming, streaming, and content creation.
                </p>
                <div className="inline-flex items-center text-primary font-medium">
                  Read more →
                </div>
              </a>
            </article>

            {/* 暂时没有其他文章 */}
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                More articles coming soon!
              </h3>
              <p className="text-muted-foreground">
                We're working on more exciting content about sound effects and audio trends.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
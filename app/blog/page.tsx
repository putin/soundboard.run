import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Latest news, updates, and articles about sound effects, meme sounds, and audio trends.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
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
            {/* Blog Post 1 */}
            <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                New Trending Sounds Added This Week
              </h2>
              <p className="text-muted-foreground mb-4">
                Discover the latest viral audio clips and meme sounds that are taking the internet by storm. 
                From TikTok trends to classic internet humor, we've got you covered.
              </p>
              <div className="text-sm text-muted-foreground">
                Published: January 15, 2025
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                How to Use Sound Effects in Content Creation
              </h2>
              <p className="text-muted-foreground mb-4">
                Learn the best practices for incorporating sound effects into your videos, podcasts, 
                and other creative projects. Tips and tricks from professional content creators.
              </p>
              <div className="text-sm text-muted-foreground">
                Published: January 10, 2025
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                The History of Meme Sounds
              </h2>
              <p className="text-muted-foreground mb-4">
                Explore the fascinating evolution of internet meme sounds, from early viral clips 
                to modern audio trends. How these sounds shape internet culture.
              </p>
              <div className="text-sm text-muted-foreground">
                Published: January 5, 2025
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
} 
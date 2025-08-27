/**
 * 分类未找到页面 - Category Not Found Page
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Category Not Found
          </h2>
          <p className="text-muted-foreground">
            The sound category you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full">
              Back to Home
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Or browse all available sound categories on our homepage
          </p>
        </div>
      </div>
    </div>
  );
}
/**
 * 音效页面模板组件 - SoundBoardPageTemplate.tsx
 * 
 * 这是音效页面的通用模板组件，可以被不同类型的音效页面复用
 */

interface SoundBoardPageTemplateProps {
  soundBoardConfig: {
    title: string;
    description: string;
    category: string;
    featured?: boolean;
    metadata?: {
      tags: string[];
      duration?: string;
      size?: string;
    };
  };
}

export function SoundBoardPageTemplate({ soundBoardConfig }: SoundBoardPageTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{soundBoardConfig.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{soundBoardConfig.description}</p>
        
        {soundBoardConfig.featured && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
            <p className="text-primary font-medium">⭐ Featured Sound Effect</p>
          </div>
        )}
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Category: {soundBoardConfig.category}</h2>
          
          {soundBoardConfig.metadata && (
            <div className="flex flex-wrap gap-2">
              {soundBoardConfig.metadata.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
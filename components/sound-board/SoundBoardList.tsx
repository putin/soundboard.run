"use client";

import { useState, useEffect } from "react";
import { SoundBoardCard } from "./SoundBoardCard";
import { PaginationCustom } from "@/components/ui/pagination-custom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { audioApi } from "@/lib/api-client";
import type { AudioItemWithCategory } from "@/lib/supabase/types";

interface SoundBoardListProps {
  onSoundBoardSelect: (url: string) => void;
  selectedCategory?: string | null;
  searchQuery?: string;
}

export function SoundBoardList({ onSoundBoardSelect, selectedCategory, searchQuery }: SoundBoardListProps) {
  const [audioItems, setAudioItems] = useState<AudioItemWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 24,
    total: 0,
    total_pages: 0,
    has_next: false,
    has_prev: false
  });
  
  // 当搜索条件或分类改变时，重置页面到第1页
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // 加载音频数据
  useEffect(() => {
    const loadAudioItems = async () => {
      try {
        setLoading(true);
        setError(null);

        // 如果有搜索查询，使用更大的限制来获取更多结果
        const hasSearch = searchQuery && searchQuery.trim().length > 0
        const searchLimit = hasSearch ? 100 : 24  // 搜索时显示更多结果
        
        const response = await audioApi.getList({
          page: currentPage,
          limit: searchLimit,
          category: selectedCategory || undefined,
          search: searchQuery || undefined,
          sort: hasSearch ? 'play_count' : 'created_at', // 搜索时按热度排序
          order: 'desc'
        });

        setAudioItems(response.audio_items);
        setPagination(response.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load audio items');
        console.error('Error loading audio items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAudioItems();
  }, [selectedCategory, currentPage, searchQuery]);

  // 处理播放音频
  const handlePlay = async (audioId: string) => {
    try {
      await audioApi.updateStats(audioId, 'play');
      onSoundBoardSelect(audioId);
    } catch (err) {
      console.error('Error updating play stats:', err);
      // 仍然允许播放，即使统计更新失败
      onSoundBoardSelect(audioId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  if (audioItems.length === 0) {
    const hasSearch = searchQuery && searchQuery.trim().length > 0;
    
    return (
      <div className="text-center py-12">
        {hasSearch ? (
          <div>
            <p className="text-muted-foreground mb-2">No results found for "{searchQuery}"</p>
            <p className="text-sm text-muted-foreground mb-4">Try different keywords or browse all sounds</p>
          </div>
        ) : (
          <p className="text-muted-foreground mb-4">No audio items found</p>
        )}
        
        {(selectedCategory || hasSearch) && (
          <Link href="/">
            <Button variant="outline">Browse All Categories</Button>
          </Link>
        )}
      </div>
    );
  }

  const hasSearch = searchQuery && searchQuery.trim().length > 0;

  return (
    <section id="sound-board-list" className="space-y-8">
      {/* 搜索结果提示 */}
      {hasSearch && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Found {pagination.total} results for "{searchQuery}"
          </p>
        </div>
      )}
      
      {/* 音频网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
        {audioItems.map((audioItem) => (
          <SoundBoardCard
            key={audioItem.id}
            id={audioItem.id}
            title={audioItem.title}
            description={audioItem.description || ''}
            mp3Url={audioItem.mp3_url}
            category={audioItem.category_id}
            tags={audioItem.tags || []}
            onPlay={() => handlePlay(audioItem.id)}
          />
        ))}
      </div>
      
      {/* 分页组件 */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationCustom
            currentPage={pagination.page}
            totalPages={pagination.total_pages}
            onPageChange={setCurrentPage}
            className="mt-6"
          />
        </div>
      )}
    </section>
  );
}
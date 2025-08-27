/**
 * 分类音频列表组件 - CategoryAudioList.tsx
 * 
 * 专门用于分类详情页的客户端组件
 * 处理音频选择和播放功能
 */

"use client";

import { useState } from "react";
import { SoundBoardList } from "@/components/sound-board/SoundBoardList";

interface CategoryAudioListProps {
  categoryId: string;
}

export function CategoryAudioList({ categoryId }: CategoryAudioListProps) {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  const handleAudioSelect = (audioId: string) => {
    setActiveAudio(audioId);
    // 这里可以添加音频播放逻辑
    console.log("Selected audio:", audioId);
  };

  return (
    <SoundBoardList
      onSoundBoardSelect={handleAudioSelect}
      selectedCategory={categoryId}
    />
  );
}
"use client";

import { useState, useRef } from 'react';
import { theme } from "@/config/theme";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Heart, Link, Share2, Play, Pause } from "lucide-react";
import { audioApi } from "@/lib/api-client";

interface SoundBoardCardProps {
  id: string;
  title: string;
  description: string;
  mp3Url: string;
  category: string;
  tags: string[];
  onPlay?: () => void;
}

export function SoundBoardCard({ id, title, description, mp3Url, category, tags, onPlay }: SoundBoardCardProps) {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000) + 10);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (isLoading) return;

    try {
      if (!audioRef.current) {
        setIsLoading(true);
        
        // 使用API代理URL进行播放，避免CORS问题
        const proxyUrl = `/api/audio/${id}/download?action=stream`;
        const audio = new Audio(proxyUrl);
        audioRef.current = audio;

        audio.addEventListener('loadstart', () => {
          setIsLoading(true);
        });

        audio.addEventListener('canplay', () => {
          setIsLoading(false);
        });

        audio.addEventListener('ended', () => {
          setIsPlaying(false);
        });

        audio.addEventListener('error', (e) => {
          setIsLoading(false);
          console.error('Audio failed to load:', e);
        });

        // 等待音频加载
        await new Promise((resolve, reject) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', reject, { once: true });
          audio.load();
        });
        
        setIsLoading(false);
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        // 调用父组件的 onPlay 回调
        onPlay?.();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleLike = async () => {
    try {
      // 乐观更新 UI
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      
      if (newIsLiked) {
        setLikes(prev => prev + 1);
        // 更新服务器统计
        await audioApi.updateStats(id, 'like');
      } else {
        setLikes(prev => prev - 1);
        // 注意：这里可能需要实现 "unlike" API，目前只有增加统计
      }
    } catch (error) {
      console.error('Error updating like:', error);
      // 回滚 UI 状态
      setIsLiked(!isLiked);
      if (isLiked) {
        setLikes(prev => prev + 1);
      } else {
        setLikes(prev => prev - 1);
      }
    }
  };

  const handleDownload = async () => {
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim() || 'audio';
    
    try {
      // 使用后端代理下载
      const link = document.createElement('a');
      link.href = `/api/audio/${id}/download?action=download&t=${Date.now()}`;
      link.download = `${cleanTitle}.mp3`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
      // 更新统计
      audioApi.updateStats(id, 'download').catch(console.error);
      
    } catch (error) {
      console.error('Download failed:', error);
      // 降级到手动下载
      if (confirm(`无法自动下载。点击确定在新窗口打开文件，然后右键保存。\n\n文件名: ${cleanTitle}.mp3`)) {
        window.open(mp3Url, '_blank');
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href
      });
    } else {
      // 备选方案：复制到剪贴板
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  // 预定义的渐变颜色
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 p-1.5 flex flex-col items-center w-[110px] sm:w-[120px] transform hover:scale-105 hover:-translate-y-1 flex-shrink-0">
      {/* 顶部：标题 */}
      <div className="text-center mb-2 w-full">
        <h3 className="font-bold text-gray-900 text-xs mb-0 line-clamp-2 min-h-[1.5rem] leading-tight">
          {title}
        </h3>
      </div>

      {/* 中间：增强的圆形播放按钮 */}
      <div className="mb-2">
        <div className="relative">
          {/* 渐变彩色圆形背景 */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden transform transition-transform duration-200 hover:scale-110"
            style={{ background: randomColor }}
          >
            {/* 内层光泽效果 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
            
            {/* 播放按钮 */}
            <button
              onClick={handlePlay}
              disabled={isLoading}
              className="w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm relative z-10"
              title={isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-3 h-3 text-gray-700 drop-shadow-sm" />
              ) : (
                <Play className="w-3 h-3 text-gray-700 ml-0.5 drop-shadow-sm" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 底部：超紧凑的操作按钮行 */}
      <div className="flex items-center w-full gap-0 px-1">
        
        {/* 点赞按钮 */}
        <button
          onClick={handleLike}
          className={`flex items-center p-1 rounded transition-colors duration-200 ${
            isLiked 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-red-400'
          }`}
          title="Like"
        >
          <Heart 
            className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} 
          />
        </button>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          className="flex items-center p-1 text-gray-400 hover:text-blue-500 rounded transition-colors duration-200"
          title="Download"
        >
          <Download className="w-3 h-3" />
        </button>

        {/* 分享按钮 */}
        <button
          onClick={handleShare}
          className="flex items-center p-1 text-gray-400 hover:text-green-500 rounded transition-colors duration-200"
          title="Share"
        >
          <Share2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
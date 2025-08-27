'use client';

import React, { useState } from 'react';
import { Heart, Link, Share2 } from 'lucide-react';

interface MyInstantsButtonProps {
  title: string;
  soundUrl?: string;
  instantId: string;
  backgroundColor?: string;
  onPlay?: () => void;
  onFavorite?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
}

export const MyInstantsButton: React.FC<MyInstantsButtonProps> = ({
  title,
  soundUrl,
  instantId,
  backgroundColor = '#FF0000',
  onPlay,
  onFavorite,
  onCopy,
  onShare,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    }
    
    if (soundUrl) {
      setIsPlaying(true);
      const audio = new Audio(soundUrl);
      audio.play();
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
      };
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onFavorite) {
      onFavorite();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/instant/${instantId}`);
      setShowCopied(true);
      if (onCopy) {
        onCopy();
      }
      
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: `${window.location.origin}/instant/${instantId}`,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopy();
    }
    
    if (onShare) {
      onShare();
    }
  };

  return (
    <div className="instant">
      {/* 圆形背景 */}
      <div 
        className="circle small-button-background" 
        style={{ backgroundColor }}
      ></div>
      
      {/* 主按钮 */}
      <button 
        className={`small-button ${isPlaying ? 'playing' : ''}`}
        onClick={handlePlay}
        title={`Play ${title} sound`}
        type="button"
        disabled={isPlaying}
      >
        {isPlaying && (
          <div className="loader" style={{ display: 'block' }}>
            <div className="spinner"></div>
          </div>
        )}
      </button>
      
      {/* 阴影效果 */}
      <div className="small-button-shadow"></div>
      
      {/* 标题链接 */}
      <a href={`/instant/${instantId}`} className="instant-link link-secondary">
        {title}
      </a>
      
      {/* 操作按钮区域 */}
      <div className="result-page-instant-sharebox">
        {/* 收藏按钮 */}
        <button 
          type="button" 
          className={`instant-action-button ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavorite}
          title={isFavorite ? 'Remove from favorites' : `Add '${title}' to favorites`}
        >
          <Heart 
            className={`instant-action-button-icon ${isFavorite ? 'text-red-500 fill-current' : ''}`}
            size={16}
          />
        </button>
        
        {/* 复制链接按钮 */}
        <button 
          type="button" 
          className="instant-action-button"
          onClick={handleCopy}
          title={`Copy '${title}' link to clipboard`}
        >
          <Link 
            className="instant-action-button-icon"
            size={16}
          />
          {showCopied && <span className="copied-tooltip">Copied!</span>}
        </button>
        
        {/* 分享按钮 */}
        <button 
          type="button" 
          className="webshare instant-action-button"
          onClick={handleShare}
          title={`Share '${title}'`}
        >
          <Share2 
            className="instant-action-button-icon"
            size={16}
          />
        </button>
      </div>
    </div>
  );
}; 
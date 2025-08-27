/**
 * 首页模板组件 - HomeTemplate.tsx
 * 
 * 这是网站首页的主要模板组件，负责：
 * 1. 组织首页的整体布局结构
 * 2. 管理搜索功能和音频选择状态
 * 3. 集成所有首页相关的子组件
 * 4. 处理用户交互和页面导航
 */

"use client"; // 声明这是一个客户端组件，支持浏览器API和状态管理

// React 核心导入
import { useState } from "react";

// 布局组件导入
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// 首页内容组件导入
import { SoundBoardList } from "@/components/sound-board/SoundBoardList";
import { CategorySidebar } from "@/components/home/CategorySidebar";

// API 客户端导入
import { searchApi } from "@/lib/api-client";

/**
 * 首页模板组件
 * 
 * 功能：
 * - 提供完整的首页布局和内容
 * - 管理搜索查询状态
 * - 处理音频选择和搜索交互
 * - 集成所有首页相关的子组件
 */
export function HomeTemplate() {
  // 状态管理
  // searchQuery: 存储用户输入的搜索关键词
  const [searchQuery, setSearchQuery] = useState("");
  
  // activeAudio: 存储当前选中的音频ID，用于高亮显示
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  
  // selectedCategory: 存储当前选中的分类ID，用于筛选显示
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /**
   * 处理搜索表单提交
   * 
   * 功能：
   * 1. 阻止表单默认提交行为
   * 2. 滚动到音频列表区域，让 SoundBoardList 处理搜索
   * 
   * @param e - React 表单事件对象
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认提交行为
    
    // 滚动到音频列表区域
    if (searchQuery.trim()) {
      const element = document.getElementById("sound-board-list");
      element?.scrollIntoView({ behavior: "smooth" }); // 平滑滚动
    }
  };

  /**
   * 渲染首页内容
   * 
   * 页面结构：
   * 1. Header - 页面头部，包含导航和搜索功能
   * 2. Main - 主要内容区域，包含所有首页组件
   * 3. Footer - 页面底部
   */
  return (
    // 根容器：最小高度为屏幕高度，背景色为主题背景色
    <div className="min-h-screen bg-background">
      
      {/* 页面头部组件 */}
      {/* 传递搜索相关的状态和回调函数 */}
      <Header
        searchQuery={searchQuery}        // 当前搜索关键词
        onSearchChange={setSearchQuery}  // 搜索关键词更新回调
        onSearch={handleSearch}          // 搜索提交回调
      />

      {/* 主要内容区域 */}
      {/* 在桌面端使用80%宽度布局，移动端使用全宽，居中对齐，两边留空白 */}
      <main className="w-full md:w-4/5 max-w-7xl mx-auto px-4 py-8">
        
        {/* 侧边栏和内容区域的布局容器 */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* 左侧分类侧边栏 */}
          {/* 在移动端隐藏，桌面端显示 */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </aside>
          
          {/* 右侧主内容区域 */}
          <div className="flex-1 min-w-0">
            {/* 移动端分类选择器 */}
            <div className="lg:hidden mb-6">
              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
            
            {/* 音频分类展示区域 */}
            {/* 传递音频数据和选择回调 */}
            <SoundBoardList
              onSoundBoardSelect={setActiveAudio}        // 音频选择回调
              selectedCategory={selectedCategory}  // 传递选中的分类
              searchQuery={searchQuery} // 传递搜索查询
            />
          </div>
        </div>
      </main>

      {/* 页面底部组件 */}
      <Footer />
    </div>
  );
}
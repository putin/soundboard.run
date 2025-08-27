/**
 * API 客户端 - 统一的 API 调用接口
 */

import { AudioItemWithCategory, Category } from './supabase/types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// API 响应类型定义
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

export interface AudioListResponse {
  audio_items: AudioItemWithCategory[]
  pagination: PaginationInfo
  filters: {
    category?: string
    search?: string
    featured?: boolean
    sort: string
    order: string
  }
}

export interface CategoriesResponse {
  categories: (Category & { audio_count?: number })[]
  total: number
}

export interface SearchResponse {
  results: AudioItemWithCategory[]
  suggestions: string[]
  query: string
  page: number
  limit: number
  method: 'fulltext' | 'fallback'
}

// API 调用工具函数
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}/api${endpoint}`
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

// 分类相关 API
export const categoriesApi = {
  // 获取所有分类
  getAll: async (includeCount = false): Promise<CategoriesResponse> => {
    const params = new URLSearchParams()
    if (includeCount) params.set('include_count', 'true')
    
    return apiCall<CategoriesResponse>(`/categories?${params.toString()}`)
  },

  // 获取单个分类
  getById: async (categoryId: string): Promise<{ category: Category & { audio_count: number } }> => {
    return apiCall<{ category: Category & { audio_count: number } }>(`/categories/${categoryId}`)
  },
}

// 音频相关 API
export const audioApi = {
  // 获取音频列表
  getList: async (params: {
    page?: number
    limit?: number
    category?: string
    search?: string
    featured?: boolean
    sort?: string
    order?: 'asc' | 'desc'
  } = {}): Promise<AudioListResponse> => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString())
      }
    })

    return apiCall<AudioListResponse>(`/audio?${searchParams.toString()}`)
  },

  // 获取单个音频
  getById: async (audioId: string): Promise<{ audio_item: AudioItemWithCategory }> => {
    return apiCall<{ audio_item: AudioItemWithCategory }>(`/audio/${audioId}`)
  },

  // 更新播放统计
  updateStats: async (audioId: string, action: 'play' | 'download' | 'like'): Promise<{ success: boolean }> => {
    return apiCall<{ success: boolean }>(`/audio/${audioId}`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    })
  },

  // 获取音频流 URL (用于播放)
  getStreamUrl: (audioId: string): string => {
    return `${BASE_URL}/api/audio/${audioId}/download?action=stream`
  },

  // 获取音频下载 URL
  getDownloadUrl: (audioId: string): string => {
    return `${BASE_URL}/api/audio/${audioId}/download?action=download`
  },

  // 获取音频下载信息
  getDownloadInfo: async (audioId: string): Promise<{
    audio_item: AudioItemWithCategory
    download_url: string
    stream_url: string
  }> => {
    return apiCall<{
      audio_item: AudioItemWithCategory
      download_url: string
      stream_url: string
    }>(`/audio/${audioId}/download`)
  },
}

// 搜索 API
export const searchApi = {
  search: async (params: {
    q: string
    page?: number
    limit?: number
  }): Promise<SearchResponse> => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString())
      }
    })

    return apiCall<SearchResponse>(`/search?${searchParams.toString()}`)
  },
}

// 统计 API
export const statsApi = {
  getOverview: async (): Promise<{
    overview: {
      total_audio_items: number
      total_categories: number
      total_tags: number
      recent_plays: number
    }
    popular_tags: { name: string; usage_count: number }[]
    featured_audio: any[]
    top_audio: any[]
    category_stats: any[]
    generated_at: string
  }> => {
    return apiCall('/stats')
  },
}

// React Hook 包装器 (可选，使用 SWR 或 React Query)
export const useApiData = <T>(
  key: string,
  fetcher: () => Promise<T>,
  options: { revalidateOnFocus?: boolean; refreshInterval?: number } = {}
) => {
  // 这里可以集成 SWR 或 React Query
  // 现在提供一个简单的实现
  return {
    data: null as T | null,
    error: null as Error | null,
    isLoading: false,
    mutate: async () => {},
  }
}
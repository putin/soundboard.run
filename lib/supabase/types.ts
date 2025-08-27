export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sound_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          sort_order: number
          is_active: boolean
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string | null
          sort_order?: number
          is_active?: boolean
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          sort_order?: number
          is_active?: boolean
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sound_audio_items: {
        Row: {
          id: string
          title: string
          description: string | null
          mp3_url: string
          category_id: string
          file_size: number | null
          duration: number | null
          bitrate: number | null
          format: string
          slug: string | null
          meta_title: string | null
          meta_description: string | null
          play_count: number
          download_count: number
          like_count: number
          is_active: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description?: string | null
          mp3_url: string
          category_id: string
          file_size?: number | null
          duration?: number | null
          bitrate?: number | null
          format?: string
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          play_count?: number
          download_count?: number
          like_count?: number
          is_active?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          mp3_url?: string
          category_id?: string
          file_size?: number | null
          duration?: number | null
          bitrate?: number | null
          format?: string
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          play_count?: number
          download_count?: number
          like_count?: number
          is_active?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sound_tags: {
        Row: {
          id: string
          name: string
          color: string | null
          usage_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          color?: string | null
          usage_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string | null
          usage_count?: number
          created_at?: string
        }
      }
      sound_audio_tags: {
        Row: {
          audio_id: string
          tag_id: string
        }
        Insert: {
          audio_id: string
          tag_id: string
        }
        Update: {
          audio_id?: string
          tag_id?: string
        }
      }
      sound_play_history: {
        Row: {
          id: string
          audio_id: string
          ip_address: string
          user_agent: string
          created_at: string
        }
        Insert: {
          id?: string
          audio_id: string
          ip_address: string
          user_agent: string
          created_at?: string
        }
        Update: {
          id?: string
          audio_id?: string
          ip_address?: string
          user_agent?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_counter: {
        Args: [{
          table_name: string
          row_id: string
          column_name: string
        }]
        Returns: any
      }
    }
  }
}

// 便于使用的类型定义
export type Category = Database['public']['Tables']['sound_categories']['Row']
export type AudioItem = Database['public']['Tables']['sound_audio_items']['Row']
export type Tag = Database['public']['Tables']['sound_tags']['Row']

// 自定义类型：音频项目与分类信息的组合
export type AudioItemWithCategory = AudioItem & {
  category_name: string | null
  category_description: string | null
  category_color: string | null
  tags: string[]
}

export type CategoryInsert = Database['public']['Tables']['sound_categories']['Insert']
export type AudioItemInsert = Database['public']['Tables']['sound_audio_items']['Insert']
export type TagInsert = Database['public']['Tables']['sound_tags']['Insert']
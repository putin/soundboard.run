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
          id: number
          name: string
          color: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          color?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          color?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sound_audio_items: {
        Row: {
          id: number
          title: string
          description: string | null
          mp3_url: string
          category_id: number | null
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
          id?: number
          title: string
          description?: string | null
          mp3_url: string
          category_id?: number | null
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
          id?: number
          title?: string
          description?: string | null
          mp3_url?: string
          category_id?: number | null
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
      sound_audio_items_stat: {
        Row: {
          audio_id: number
          play_count: number
          download_count: number
          like_count: number
        }
        Insert: {
          audio_id: number
          play_count?: number
          download_count?: number
          like_count?: number
        }
        Update: {
          audio_id?: number
          play_count?: number
          download_count?: number
          like_count?: number
        }
      }

    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_audio_counter: {
        Args: [{
          p_audio_id: number
          counter_type: string
        }]
        Returns: number
      }
    }
  }
}

// 便于使用的类型定义
export type Category = Database['public']['Tables']['sound_categories']['Row']
export type AudioItem = Database['public']['Tables']['sound_audio_items']['Row']


// 自定义类型：音频项目与分类信息的组合
export type AudioItemWithCategory = AudioItem & {
  category_name: string | null
  category_description: string | null
  category_color: string | null
  tags: string[]
}

export type CategoryInsert = Database['public']['Tables']['sound_categories']['Insert']
export type AudioItemInsert = Database['public']['Tables']['sound_audio_items']['Insert']

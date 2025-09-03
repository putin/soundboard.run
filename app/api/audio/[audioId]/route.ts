import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'
import { withCors, handleOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleOptions()
}

export async function GET(
  request: NextRequest,
  { params }: { params: { audioId: string } }
) {
  try {
    const supabase = createClient()
    const audioId = parseInt(params.audioId, 10)
    
    if (isNaN(audioId)) {
      return withCors(
        { error: 'Invalid audio ID' },
        { status: 400 }
      )
    }

    const { data: rawAudioItem, error } = await supabase
      .from('sound_audio_items')
      .select('*')
      .eq('id', audioId)
      .eq('is_active', true)
      .single<Database['public']['Tables']['sound_audio_items']['Row']>()

    if (error || !rawAudioItem) {
      return withCors(
        { error: 'Audio item not found' },
        { status: 404 }
      )
    }

    // 获取分类信息
    let category = null
    if (rawAudioItem.category_id) {
      const { data: categoryData, error: categoryError } = await supabase
        .from('sound_categories')
        .select('id, name, color')
        .eq('id', rawAudioItem.category_id)
        .eq('is_active', true)
        .single<Pick<Database['public']['Tables']['sound_categories']['Row'], 'id' | 'name' | 'color'>>()
      
      category = categoryData
    }

    // 合并数据 (即使分类查询失败也返回音频数据)
    const audioItem = {
      ...rawAudioItem,
      category_name: category?.name || null,
      category_description: null, // description列不存在
      category_color: category?.color || null,
      tags: [] // 基础表结构暂时返回空数组
    }

    return withCors({ audio_item: audioItem })

  } catch (error) {
    console.error('Unexpected error:', error)
    return withCors(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 更新播放统计
export async function POST(
  request: NextRequest,
  { params }: { params: { audioId: string } }
) {
  try {
    const supabase = createClient()
    const audioId = parseInt(params.audioId, 10)
    
    if (isNaN(audioId)) {
      return withCors(
        { error: 'Invalid audio ID' },
        { status: 400 }
      )
    }
    const body = await request.json()
    const action = body.action // 'play', 'download', 'like'

    let updateField: string
    switch (action) {
      case 'play':
        updateField = 'play_count'
        break
      case 'download':
        updateField = 'download_count'
        break
      case 'like':
        updateField = 'like_count'
        break
      default:
        return withCors(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // 使用 RPC 函数增加音频统计计数器
    const { data, error } = await (supabase.rpc as any)('increment_audio_counter', {
      p_audio_id: audioId,
      counter_type: updateField
    })

    if (error) {
      console.error('Error updating counter:', error)
      return withCors(
        { error: 'Failed to update counter' },
        { status: 500 }
      )
    }

    // 播放历史功能已移除

    return withCors({ success: true })

  } catch (error) {
    console.error('Unexpected error:', error)
    return withCors(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
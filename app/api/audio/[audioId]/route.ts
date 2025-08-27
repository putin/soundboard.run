import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { audioId: string } }
) {
  try {
    const supabase = createClient()
    const audioId = params.audioId

    const { data: rawAudioItem, error } = await supabase
      .from('sound_audio_items')
      .select('*')
      .eq('id', audioId)
      .eq('is_active', true)
      .single()

    if (error || !rawAudioItem) {
      return NextResponse.json(
        { error: 'Audio item not found' },
        { status: 404 }
      )
    }

    // 获取分类信息
    const { data: category, error: categoryError } = await supabase
      .from('sound_categories')
      .select('id, name, description, color')
      .eq('id', rawAudioItem.category_id)
      .eq('is_active', true)
      .single()

    // 合并数据 (即使分类查询失败也返回音频数据)
    const audioItem = {
      ...rawAudioItem,
      category_name: category?.name || null,
      category_description: category?.description || null,
      category_color: category?.color || null,
      tags: [] // 基础表结构暂时返回空数组
    }

    return NextResponse.json({ audio_item: audioItem })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
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
    const audioId = params.audioId
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
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // 使用 RPC 函数增加计数器 (需要在数据库中创建)
    const { data, error } = await supabase.rpc('increment_counter', {
      table_name: 'sound_audio_items',
      row_id: audioId,
      column_name: updateField
    })

    if (error) {
      console.error('Error updating counter:', error)
      return NextResponse.json(
        { error: 'Failed to update counter' },
        { status: 500 }
      )
    }

    // 记录播放历史 (可选)
    if (action === 'play') {
      const userAgent = request.headers.get('user-agent') || ''
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 '127.0.0.1'

      await supabase
        .from('sound_play_history')
        .insert({
          audio_id: audioId,
          ip_address: ip,
          user_agent: userAgent
        })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
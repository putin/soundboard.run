import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // 获取基础统计
    const [
      { count: totalAudioItems },
      { count: totalCategories },
      { data: featuredAudio },
      { data: topAudio }
    ] = await Promise.all([
      // 总音频数
      supabase
        .from('sound_audio_items')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),
      
      // 总分类数
      supabase
        .from('sound_categories')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),
      
      // 精选音频
      supabase
        .from('sound_audio_items')
        .select(`
          id, 
          title, 
          sound_audio_items_stat(play_count)
        `)
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(5),
      
      // 最受欢迎音频
      supabase
        .from('sound_audio_items')
        .select(`
          id, 
          title, 
          sound_audio_items_stat(play_count)
        `)
        .eq('is_active', true)
        .limit(10)
    ])

    // 播放历史统计已移除

    // 按分类统计
    const { data: categoryStats } = await supabase
      .from('sound_categories')
      .select(`
        id,
        name,
        sound_audio_items!inner(count)
      `)
      .eq('is_active', true)
      .eq('sound_audio_items.is_active', true)
      .returns<any[]>()

    return NextResponse.json({
      overview: {
        total_audio_items: totalAudioItems || 0,
        total_categories: totalCategories || 0,
        total_tags: 0, // 标签功能已移除
        recent_plays: 0 // 播放历史功能已移除
      },
      popular_tags: [], // 标签功能已移除
      featured_audio: featuredAudio || [],
      top_audio: topAudio || [],
      category_stats: categoryStats || [],
      generated_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
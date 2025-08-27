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
      { count: totalTags },
      { data: popularTags },
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
      
      // 总标签数
      supabase
        .from('sound_tags')
        .select('*', { count: 'exact', head: true }),
      
      // 热门标签
      supabase
        .from('sound_tags')
        .select('name, usage_count')
        .order('usage_count', { ascending: false })
        .limit(10)
        .returns<Pick<Database['public']['Tables']['sound_tags']['Row'], 'name' | 'usage_count'>[]>(),
      
      // 精选音频
      supabase
        .from('sound_audio_items_with_category')
        .select('id, title, category_name, play_count')
        .eq('is_featured', true)
        .eq('is_active', true)
        .order('play_count', { ascending: false })
        .limit(5)
        .returns<any[]>(),
      
      // 最受欢迎音频
      supabase
        .from('sound_audio_items_with_category')
        .select('id, title, category_name, play_count')
        .eq('is_active', true)
        .order('play_count', { ascending: false })
        .limit(10)
        .returns<any[]>()
    ])

    // 计算过去7天的统计
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { count: recentPlays } = await supabase
      .from('sound_play_history')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString())

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
        total_tags: totalTags || 0,
        recent_plays: recentPlays || 0
      },
      popular_tags: popularTags || [],
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
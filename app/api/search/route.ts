import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'
import { withCors, handleOptions } from '@/lib/cors'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      )
    }

    // 使用全文搜索
    const { data: rawAudioItems, error } = await supabase
      .from('sound_audio_items')
      .select('*')
      .textSearch('title', query, {
        type: 'websearch',
        config: 'english'
      })
      .eq('is_active', true)
      .order('play_count', { ascending: false })
      .range(offset, offset + limit - 1)
      .returns<Database['public']['Tables']['sound_audio_items']['Row'][]>()

    if (error) {
      console.error('Error searching audio items:', error)
      
      // 降级到改进的模糊搜索
      const searchWords = query.trim().split(/\s+/).filter(word => word.length > 0)
      let fallbackQuery = supabase
        .from('sound_audio_items')
        .select('*')
        .eq('is_active', true)
      
      if (searchWords.length === 1) {
        // 单个词搜索
        fallbackQuery = fallbackQuery.or(`title.ilike.%${searchWords[0]}%,description.ilike.%${searchWords[0]}%`)
      } else if (searchWords.length > 1) {
        // 多词搜索：至少匹配一个词
        const searchConditions = searchWords.map(word => 
          `title.ilike.%${word}%,description.ilike.%${word}%`
        ).join(',')
        fallbackQuery = fallbackQuery.or(searchConditions)
      }
      
      const { data: rawFallbackResults, error: fallbackError } = await fallbackQuery
        .order('play_count', { ascending: false })
        .range(offset, offset + limit - 1)
        .returns<Database['public']['Tables']['sound_audio_items']['Row'][]>()

      if (fallbackError) {
        return NextResponse.json(
          { error: 'Search failed' },
          { status: 500 }
        )
      }

      // 获取分类信息用于降级搜索
      const { data: categories } = await supabase
        .from('sound_categories')
        .select('id, name, color')
        .eq('is_active', true)
        .returns<Pick<Database['public']['Tables']['sound_categories']['Row'], 'id' | 'name' | 'color'>[]>()

      const categoryMap = new Map()
      categories?.forEach(cat => categoryMap.set(cat.id, cat))

      // 转换降级搜索结果
      const fallbackResults = rawFallbackResults?.map(item => {
        const category = categoryMap.get(item.category_id)
        return {
          ...item,
          category_name: category?.name || null,
          category_description: null, // description列不存在
          category_color: category?.color || null,
          tags: []
        }
      }) || []

      return NextResponse.json({
        results: fallbackResults,
        query,
        page,
        limit,
        method: 'fallback'
      })
    }

    // 获取分类信息
    const { data: categories } = await supabase
      .from('sound_categories')
      .select('id, name, color')
      .eq('is_active', true)
      .returns<Pick<Database['public']['Tables']['sound_categories']['Row'], 'id' | 'name' | 'color'>[]>()

    const categoryMap = new Map()
    categories?.forEach(cat => categoryMap.set(cat.id, cat))

    // 转换主要搜索结果
    const audioItems = rawAudioItems?.map(item => {
      const category = categoryMap.get(item.category_id)
      return {
        ...item,
        category_name: category?.name || null,
        category_description: category?.description || null,
        category_color: category?.color || null,
        tags: []
      }
    }) || []

    return NextResponse.json({
      results: audioItems,
      suggestions: [], // 标签功能已移除
      query,
      page,
      limit,
      method: 'fulltext'
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
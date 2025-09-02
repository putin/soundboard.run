import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'
import { withCors, handleOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleOptions()
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    
    // 分页参数
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '24')
    const offset = (page - 1) * limit
    
    // 筛选参数
    const categoryId = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured') === 'true'
    const sortBy = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc'

    // 构建查询 - 只查询音频表，包含总计数
    let query = supabase
      .from('sound_audio_items')
      .select('*', { count: 'exact' })

    // 应用筛选条件
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (featured) {
      query = query.eq('is_featured', true)
    }

    if (search && search.trim()) {
      const searchTerm = search.trim()
      // 改进的模糊搜索：支持部分单词匹配，不区分大小写
      // 将搜索词按空格分割，每个词都进行模糊搜索
      const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0)
      
      if (searchWords.length === 1) {
        // 单个词搜索
        query = query.or(`title.ilike.%${searchWords[0]}%,description.ilike.%${searchWords[0]}%`)
      } else if (searchWords.length > 1) {
        // 多词搜索：至少匹配一个词
        const searchConditions = searchWords.map(word => 
          `title.ilike.%${word}%,description.ilike.%${word}%`
        ).join(',')
        query = query.or(searchConditions)
      }
    }

    // 只显示活跃的音频
    query = query.eq('is_active', true)

    // 排序
    const validSortFields = ['created_at', 'play_count', 'download_count', 'like_count', 'title']
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at'
    query = query.order(sortField, { ascending: order === 'asc' })

    // 分页
    query = query.range(offset, offset + limit - 1)

    const { data: rawAudioItems, error, count } = await query.returns<Database['public']['Tables']['sound_audio_items']['Row'][]>()

    if (error) {
      console.error('Error fetching audio items:', error)
      return withCors(
        { error: 'Failed to fetch audio items' },
        { status: 500 }
      )
    }

    // 获取所有分类信息
    const { data: categories, error: categoriesError } = await supabase
      .from('sound_categories')
      .select('id, name, description, color')
      .eq('is_active', true)
      .returns<Pick<Database['public']['Tables']['sound_categories']['Row'], 'id' | 'name' | 'description' | 'color'>[]>()

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError)
      return withCors(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }

    // 创建分类映射表
    const categoryMap = new Map()
    categories?.forEach(cat => {
      categoryMap.set(cat.id, cat)
    })

    // 合并数据
    const audioItems = rawAudioItems?.map(item => {
      const category = categoryMap.get(item.category_id)
      return {
        ...item,
        category_name: category?.name || null,
        category_description: category?.description || null,
        category_color: category?.color || null,
        tags: [] // 基础表结构暂时返回空数组
      }
    }) || []

    // 获取总数用于分页
    const { count: totalCount, error: countError } = await supabase
      .from('sound_audio_items')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .then(result => {
        if (categoryId) {
          return supabase
            .from('sound_audio_items')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', categoryId)
            .eq('is_active', true)
        }
        return result
      })

    const totalPages = Math.ceil((totalCount || 0) / limit)

    return withCors({
      audio_items: audioItems || [],
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1
      },
      filters: {
        category: categoryId,
        search,
        featured,
        sort: sortField,
        order
      }
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return withCors(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    
    const includeCount = searchParams.get('include_count') === 'true'

    let query = supabase
      .from('sound_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    const { data: categories, error } = await query

    if (error) {
      console.error('Error fetching categories:', error)
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }

    // 如果需要包含音频数量
    if (includeCount && categories) {
      const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
          const { count, error: countError } = await supabase
            .from('sound_audio_items')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('is_active', true)

          if (countError) {
            console.error('Error counting audio items:', countError)
            return { ...category, audio_count: 0 }
          }

          return { ...category, audio_count: count || 0 }
        })
      )

      return NextResponse.json({
        categories: categoriesWithCount,
        total: categories.length
      })
    }

    return NextResponse.json({
      categories,
      total: categories.length
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
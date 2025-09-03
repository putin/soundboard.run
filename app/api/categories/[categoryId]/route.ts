import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const supabase = createClient()
    const categoryId = parseInt(params.categoryId, 10)
    
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      )
    }

    const { data: category, error } = await supabase
      .from('sound_categories')
      .select('*')
      .eq('id', categoryId)
      .eq('is_active', true)
      .single<Database['public']['Tables']['sound_categories']['Row']>()

    if (error || !category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // 获取该分类下的音频数量
    const { count: audioCount, error: countError } = await supabase
      .from('sound_audio_items')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId)
      .eq('is_active', true)

    if (countError) {
      console.error('Error counting audio items:', countError)
    }

    return NextResponse.json({
      category: {
        ...category,
        audio_count: audioCount || 0
      }
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
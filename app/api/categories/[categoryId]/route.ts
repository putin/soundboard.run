import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const supabase = createClient()
    const categoryId = params.categoryId

    const { data: category, error } = await supabase
      .from('sound_categories')
      .select('*')
      .eq('id', categoryId)
      .eq('is_active', true)
      .single()

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
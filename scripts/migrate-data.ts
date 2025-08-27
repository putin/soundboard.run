/**
 * 数据迁移脚本 - 将现有静态数据迁移到 Supabase
 * 运行方式: npx tsx scripts/migrate-data.ts
 */

import { createClient } from '@supabase/supabase-js'
import { audioCategories } from '../app/sound-board/sound-board-data'
import { Database } from '../lib/supabase/types'

// 确保环境变量存在
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY // 需要服务密钥

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

// 生成 slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim()
    .substring(0, 200) // 限制长度
}

async function migrateCategories() {
  console.log('开始迁移分类数据...')
  
  for (const [index, category] of audioCategories.entries()) {
    try {
      const { data, error } = await supabase
        .from('sound_categories')
        .upsert({
          id: category.id,
          name: category.name,
          description: category.description,
          sort_order: index,
          is_active: true,
          meta_title: `${category.name} Sound Effects - SoundBoard.run`,
          meta_description: `${category.description} Browse ${category.items.length} high-quality ${category.name.toLowerCase()} sound effects.`
        })
        .select()

      if (error) {
        console.error(`Error migrating category ${category.name}:`, error)
      } else {
        console.log(`✓ 分类 "${category.name}" 迁移成功`)
      }
    } catch (error) {
      console.error(`Unexpected error migrating category ${category.name}:`, error)
    }
  }
}

async function migrateTags() {
  console.log('开始迁移标签数据...')
  
  // 收集所有标签
  const allTags = new Set<string>()
  audioCategories.forEach(category => {
    category.items.forEach(item => {
      item.tags.forEach(tag => allTags.add(tag.toLowerCase()))
    })
  })

  console.log(`发现 ${allTags.size} 个唯一标签`)

  for (const tagName of allTags) {
    try {
      const { data, error } = await supabase
        .from('sound_tags')
        .upsert({
          name: tagName,
          usage_count: 0 // 稍后会更新
        })
        .select()

      if (error) {
        console.error(`Error migrating tag ${tagName}:`, error)
      }
    } catch (error) {
      console.error(`Unexpected error migrating tag ${tagName}:`, error)
    }
  }

  console.log('✓ 标签迁移完成')
}

async function migrateAudioItems() {
  console.log('开始迁移音频数据...')
  
  let totalMigrated = 0
  
  for (const category of audioCategories) {
    console.log(`正在处理分类: ${category.name} (${category.items.length} 个音频)`)
    
    for (const [index, item] of category.items.entries()) {
      try {
        const slug = generateSlug(item.title)
        
        // 检查 slug 是否已存在
        const { data: existingSlug } = await supabase
          .from('sound_audio_items')
          .select('slug')
          .eq('slug', slug)
          .single()

        const finalSlug = existingSlug ? `${slug}-${item.id}` : slug

        const { data, error } = await supabase
          .from('sound_audio_items')
          .upsert({
            id: item.id,
            title: item.title,
            description: item.description,
            mp3_url: item.mp3Url,
            category_id: category.id,
            slug: finalSlug,
            format: 'mp3',
            is_active: true,
            is_featured: false, // 可以基于某些条件设置
            play_count: Math.floor(Math.random() * 1000), // 随机初始播放量
            download_count: Math.floor(Math.random() * 100),
            like_count: Math.floor(Math.random() * 50),
            meta_title: `${item.title} - Free Sound Effect`,
            meta_description: item.description
          })
          .select()

        if (error) {
          console.error(`Error migrating audio item ${item.title}:`, error)
          continue
        }

        // 添加标签关联
        if (item.tags && item.tags.length > 0) {
          // 获取标签ID
          const { data: tagData } = await supabase
            .from('sound_tags')
            .select('id, name')
            .in('name', item.tags.map(tag => tag.toLowerCase()))

          if (tagData) {
            const audioTagsToInsert = tagData.map(tag => ({
              audio_id: item.id,
              tag_id: tag.id
            }))

            const { error: tagError } = await supabase
              .from('sound_audio_tags')
              .upsert(audioTagsToInsert)

            if (tagError) {
              console.error(`Error linking tags for ${item.title}:`, tagError)
            }

            // 更新标签使用计数
            for (const tag of tagData) {
              await supabase.rpc('increment_tag_usage', { tag_id: tag.id })
            }
          }
        }

        totalMigrated++
        
        if (totalMigrated % 10 === 0) {
          console.log(`已迁移 ${totalMigrated} 个音频项目...`)
        }

      } catch (error) {
        console.error(`Unexpected error migrating audio item ${item.title}:`, error)
      }
    }
  }

  console.log(`✓ 音频数据迁移完成，共迁移 ${totalMigrated} 个项目`)
}

async function updateTagUsageCounts() {
  console.log('更新标签使用计数...')
  
  const { data: tags } = await supabase
    .from('sound_tags')
    .select('id, name')

  if (tags) {
    for (const tag of tags) {
      const { count } = await supabase
        .from('sound_audio_tags')
        .select('*', { count: 'exact', head: true })
        .eq('tag_id', tag.id)

      await supabase
        .from('sound_tags')
        .update({ usage_count: count || 0 })
        .eq('id', tag.id)
    }
  }

  console.log('✓ 标签使用计数更新完成')
}

async function main() {
  try {
    console.log('=== 开始数据迁移 ===')
    console.log(`准备迁移 ${audioCategories.length} 个分类，共 ${audioCategories.reduce((total, cat) => total + cat.items.length, 0)} 个音频项目`)
    
    await migrateCategories()
    await migrateTags()
    await migrateAudioItems()
    await updateTagUsageCounts()
    
    console.log('=== 数据迁移完成 ===')
    
    // 输出统计信息
    const { count: categoryCount } = await supabase
      .from('sound_categories')
      .select('*', { count: 'exact', head: true })
    
    const { count: audioCount } = await supabase
      .from('sound_audio_items')
      .select('*', { count: 'exact', head: true })
    
    const { count: tagCount } = await supabase
      .from('sound_tags')
      .select('*', { count: 'exact', head: true })

    console.log(`\n最终统计:`)
    console.log(`- 分类: ${categoryCount}`)
    console.log(`- 音频: ${audioCount}`)
    console.log(`- 标签: ${tagCount}`)
    
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

main()
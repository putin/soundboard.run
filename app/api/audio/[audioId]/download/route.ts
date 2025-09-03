import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'
import { corsHeaders, handleOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleOptions()
}

// Cloudflare R2 配置
const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID!,
  accessKeyId: process.env.R2_ACCESS_KEY_ID!,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  bucketName: process.env.R2_BUCKET_NAME!,
  publicUrl: process.env.R2_PUBLIC_URL!,
}

export async function GET(
  request: NextRequest,
  { params }: { params: { audioId: string } }
) {
  try {
    const supabase = createClient()
    const audioId = parseInt(params.audioId, 10)
    
    if (isNaN(audioId)) {
      return NextResponse.json(
        { error: 'Invalid audio ID' },
        { 
          status: 400,
          headers: corsHeaders()
        }
      )
    }

    // 获取音频信息
    const { data: audioItem, error } = await supabase
      .from('sound_audio_items')
      .select('*')
      .eq('id', audioId)
      .eq('is_active', true)
      .single<Database['public']['Tables']['sound_audio_items']['Row']>()

    if (error || !audioItem) {
      return NextResponse.json(
        { error: 'Audio item not found' },
        { 
          status: 404,
          headers: corsHeaders()
        }
      )
    }

    // 直接使用原始 URL 进行下载
    const downloadUrl = audioItem.mp3_url

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'stream'
    const force = searchParams.get('force') === 'true'

    // 更新下载统计
    if (action === 'download') {
      try {
        await (supabase.rpc as any)('increment_audio_counter', {
          p_audio_id: audioId,
          counter_type: 'download_count'
        })
      } catch (statsError) {
        console.error('Error updating download stats:', statsError)
        // 不阻塞下载，继续执行
      }
    }

    // 如果是流式播放，直接代理到 R2
    if (action === 'stream') {
      try {
        const r2Response = await fetch(downloadUrl, {
          headers: {
            'Range': request.headers.get('Range') || '',
            'Origin': 'https://soundboard.run',
            'User-Agent': 'Mozilla/5.0 (compatible; SoundBoard/1.0)',
          }
        })

        if (!r2Response.ok) {
          throw new Error(`R2 response error: ${r2Response.status}`)
        }

        // 复制响应头并添加 CORS
        const headers = new Headers()
        
        // 添加 CORS 头
        Object.entries(corsHeaders()).forEach(([key, value]) => {
          headers.set(key, value)
        })
        
        // 添加音频相关头
        headers.set('Content-Type', r2Response.headers.get('Content-Type') || 'audio/mpeg')
        headers.set('Content-Length', r2Response.headers.get('Content-Length') || '0')
        headers.set('Accept-Ranges', 'bytes')
        headers.set('Cache-Control', 'public, max-age=31536000')
        
        // 处理 Range 请求
        if (r2Response.headers.get('Content-Range')) {
          headers.set('Content-Range', r2Response.headers.get('Content-Range')!)
        }

        return new NextResponse(r2Response.body, {
          status: r2Response.status,
          headers
        })
      } catch (proxyError) {
        console.error('Error proxying from R2:', proxyError)
        // 降级到直接重定向
        return NextResponse.redirect(downloadUrl)
      }
    }

    // 对于下载请求，直接代理原始 URL 并设置强制下载头
    if (action === 'download') {
      try {
        const response = await fetch(downloadUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Origin': 'https://soundboard.run',
          }
        })
        
        if (!response.ok) {
          throw new Error(`Original URL response error: ${response.status}`)
        }

        // 设置强制下载的响应头并添加 CORS
        const headers = new Headers()
        
        // 添加 CORS 头
        Object.entries(corsHeaders()).forEach(([key, value]) => {
          headers.set(key, value)
        })
        
        headers.set('Content-Type', 'application/octet-stream')
        
        // 清理文件名
        const cleanTitle = audioItem.title.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim() || 'audio'
        headers.set('Content-Disposition', `attachment; filename="${cleanTitle}.mp3"`)
        
        const contentLength = response.headers.get('Content-Length')
        if (contentLength) {
          headers.set('Content-Length', contentLength)
        }
        
        headers.set('Cache-Control', 'no-cache')

        return new NextResponse(response.body, {
          status: 200,
          headers
        })
        
      } catch (proxyError) {
        console.error('Error proxying download:', proxyError)
        // 降级到重定向
        return NextResponse.redirect(downloadUrl)
      }
    }

    // 默认返回音频信息和下载 URL
    return NextResponse.json({
      audio_item: audioItem,
      download_url: downloadUrl,
      stream_url: `/api/audio/${audioId}/download?action=stream`
    }, {
      headers: corsHeaders()
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: corsHeaders()
      }
    )
  }
}

// 支持 HEAD 请求用于检查文件存在性
export async function HEAD(
  request: NextRequest,
  { params }: { params: { audioId: string } }
) {
  try {
    const supabase = createClient()
    const audioId = parseInt(params.audioId, 10)
    
    if (isNaN(audioId)) {
      return new NextResponse(null, { 
        status: 400,
        headers: corsHeaders()
      })
    }

    const { data: audioItem, error } = await supabase
      .from('sound_audio_items')
      .select('mp3_url, file_size')
      .eq('id', audioId)
      .eq('is_active', true)
      .single<Pick<Database['public']['Tables']['sound_audio_items']['Row'], 'mp3_url' | 'file_size'>>()

    if (error || !audioItem) {
      return new NextResponse(null, { 
        status: 404,
        headers: corsHeaders()
      })
    }

    const headers = new Headers()
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      headers.set(key, value)
    })
    headers.set('Content-Type', 'audio/mpeg')
    headers.set('Content-Length', String(audioItem.file_size || 0))

    return new NextResponse(null, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('Error in HEAD request:', error)
    return new NextResponse(null, { 
      status: 500,
      headers: corsHeaders()
    })
  }
}
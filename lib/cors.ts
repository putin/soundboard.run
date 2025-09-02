// lib/cors.ts
import { NextResponse } from "next/server"

export function corsHeaders() {
  // 获取当前站点 URL，如果在开发环境或部署环境都能正常工作
  const allowedOrigins = [
    "https://soundboard.run",
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean)

  return {
    "Access-Control-Allow-Origin": "*", // 允许所有来源，与 vercel.json 保持一致
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Range",
    "Access-Control-Expose-Headers": "Content-Range, Accept-Ranges, Content-Length",
  }
}

// 包装一个响应，加上 CORS
export function withCors(json: any, init?: ResponseInit) {
  return NextResponse.json(json, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...corsHeaders(),
    },
  })
}

// 专门处理 OPTIONS 请求
export function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  })
}

// lib/cors.ts
import { NextResponse } from "next/server"

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "https://soundboard.run",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

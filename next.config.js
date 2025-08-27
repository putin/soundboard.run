/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // 移除所有游戏相关的路由重写，因为现在专注于音频播放
};

module.exports = nextConfig;



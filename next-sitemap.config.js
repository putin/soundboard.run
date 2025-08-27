// @ts-check
const { siteConfig } = require('./config/site');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:  siteConfig.url,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.9,
  outDir: './public',
  generateIndexSitemap: false,  // 禁用索引 sitemap
  transform: async (config, path) => {
    let priority = 0.9;
    let changefreq = 'monthly';

    if (path === '/' || path === '') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/privacy-policy' || path === '/terms-of-service' || path === '/about' || path === '/contact') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    }
  },
  robotsTxtOptions: {
    policies: [
      // 常规搜索引擎规则
      {
        userAgent: '*',
        allow: '/',
      },

      // 专用 AI 爬虫 - 仅允许访问 llms 文件
      {
        userAgent: 'GPTBot',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'OAI-SearchBot',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'Anthropic-AI',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'DeepseekBot',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'cohere-ai',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'YouBot',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'GoogleOther',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'DuckAssistBot',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
    ],
    additionalSitemaps: [],
  },
}

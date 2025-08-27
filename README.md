# SoundBoard.run 音频播放网站

🎵 **官方网站**: [SoundBoard.run 官方网站](https://soundboard.run/)

📖 **English Version**: [README_EN.md](./README_EN.md)

这是 SoundBoard.run 的官方网站项目，基于 Next.js 构建。该网站提供免费的音效按钮、声音板以及针对搜索引擎和 AI 爬虫的优化。

## 项目概述

SoundBoard.run 是一个免费的音频播放平台，提供各种音效、梗声音频和病毒音频片段。用户可以直接在浏览器中播放音频，也可以下载 MP3 文件。本项目是网站的官方实现，现已扩展为多分类音频平台，提供4个主要音频分类。

### 支持的音频分类

1. **[Trending](https://soundboard.run/#trending)** - 热门音效，包括最新的病毒音频
2. **[Memes](https://soundboard.run/#memes)** - 经典梗声音频，如 Bruh、Vine Boom 等
3. **[Sound Effects](https://soundboard.run/#sound-board)** - 经典音效，如鼠标点击、通知声等
4. **[Reactions](https://soundboard.run/#reactions)** - 反应音效，如笑声、掌声等

### 主要功能

- **多分类音频展示** - 支持4个主要音频分类
- **统一音频页面模板** - 每个分类都有完整的介绍和音频列表
- **音频特性、使用方法和 FAQ 介绍** - 详细的平台指南和常见问题解答
- **针对搜索引擎优化 (SEO)** - 完整的meta标签和结构化数据
- **针对 AI 爬虫的特殊内容优化** - 专用的llms.txt文件
- **响应式设计** - 支持各种设备和屏幕尺寸
- **音频推荐系统** - 在每个分类中推荐相关音频

## 技术栈

- **框架**: Next.js 13.5.1 (App Router)
- **语言**: TypeScript 5.2.2
- **样式**: Tailwind CSS 3.3.3
- **UI组件**: Radix UI (完整无障碍组件库)
- **部署**: Vercel
- **SEO**: next-sitemap 4.2.3
- **表单**: React Hook Form + Zod
- **图标**: Lucide React

## 项目结构

```
/
├── app/                    # Next.js 应用目录 (App Router)
│   ├── about/              # 关于页面
│   ├── contact/            # 联系页面
│   ├── privacy-policy/     # 隐私政策页面
│   ├── terms-of-service/   # 服务条款页面
│   ├── sound-board/      # 音频数据和配置
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页 (音频分类展示)
│   ├── schema.ts           # 结构化数据配置
│   └── globals.css         # 全局样式
├── components/             # React 组件库
│   ├── sound-board/      # 音频分类展示组件
│   ├── layout/             # 布局组件 (Header, Footer)
│   ├── templates/          # 页面模板
│   ├── home/               # 首页组件
│   ├── features/           # 平台特性组件
│   ├── what-is/            # 平台介绍组件
│   ├── how-to-play/        # 使用方法组件
│   ├── faq/                # FAQ组件
│   ├── rating/             # 评分组件
│   └── ui/                 # 基础UI组件 (基于Radix UI)
├── config/                 # 配置文件
│   ├── site.ts/js          # 站点基本配置
│   ├── content.ts          # 平台内容配置
│   ├── layout.ts           # 布局配置
│   └── theme.ts            # 主题配置
├── hooks/                  # 自定义React Hooks
├── lib/                    # 工具函数库
├── public/                 # 静态资源
│   ├── assets/             # 图片和其他资源
│   │   └── img/            # 站点通用图片
│   ├── llms.txt            # AI 爬虫专用内容摘要
│   ├── llms-full.txt       # AI 爬虫专用完整内容
│   ├── robots.txt          # 搜索引擎爬虫规则
│   └── sitemap.xml         # 网站地图
├── next.config.js          # Next.js 配置
├── next-sitemap.config.js  # Sitemap 和 robots.txt 配置
├── tailwind.config.ts      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── components.json         # shadcn/ui 组件配置
```

## 开发指南

### 环境要求

- Node.js 16.x 或更高版本
- npm 或 yarn

### 环境变量配置

在项目根目录创建 `.env.local` 文件：

```bash
# Google Analytics Configuration
# 请替换为您自己的 Google Analytics ID
# 获取方式: https://analytics.google.com/ → 管理 → 数据流 → 衡量ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 其他可选配置
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**注意**: 
- `.env.local` 文件已在 `.gitignore` 中，不会被提交到代码库
- 请将 `G-XXXXXXXXXX` 替换为您自己的 Google Analytics 衡量ID

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 本地开发

```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000 查看网站。

### 构建项目

```bash
npm run build
# 或
yarn build
```

### 生成 Sitemap

```bash
npm run sitemap
# 或
yarn sitemap
```

### 清理 Sitemap

```bash
npm run clean-sitemap
```

## 音频功能指南

网站提供以下音频功能：

- **即时播放**: 点击任何音频按钮即可在浏览器中播放
- **免费下载**: 所有音频文件都可以免费下载为 MP3 格式
- **分类浏览**: 按类别组织音频，便于查找
- **搜索功能**: 支持按名称、描述和标签搜索音频
- **响应式设计**: 在桌面和移动设备上都有良好的体验

## 添加新音频指南

要添加新音频，需要以下步骤：

1. **添加音频数据**: 在 `app/sound-board/sound-board-data.ts` 中添加新的音频项目
2. **配置音频信息**: 设置标题、描述、MP3 URL 和标签
3. **分类组织**: 将音频分配到适当的分类中
4. **测试播放**: 确保音频 URL 可以正常访问和播放

## 相关链接和资源

### 官方页面
- 🏠 **主页**: [SoundBoard.run 官方网站](https://soundboard.run/)
- 📞 **联系我们**: [联系我们](https://soundboard.run/contact)
- ℹ️ **关于我们**: [关于我们](https://soundboard.run/about)
- 🔒 **隐私政策**: [隐私政策](https://soundboard.run/privacy-policy)
- 📋 **服务条款**: [服务条款](https://soundboard.run/terms-of-service)

### 外部链接 (Footer Quick Links)
- 🎵 **Trending Sounds**: [热门音效](https://soundboard.run/#trending)
- 😂 **Meme Sounds**: [梗声音频](https://soundboard.run/#memes)
- 🔊 **Sound Effects**: [音效库](https://soundboard.run/#sound-board)
- 👏 **Reaction Sounds**: [反应音效](https://soundboard.run/#reactions)

## AI 爬虫优化

本项目针对 AI 爬虫进行了特殊优化：

1. **专用内容文件**: 提供了 `llms.txt` 和 `llms-full.txt` 文件，包含结构化的平台信息
2. **robots.txt 配置**: 引导 AI 爬虫访问专用文件，限制对网站其他部分的访问
3. **支持的AI爬虫**: GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, DeepseekBot 等

详细配置可查看 `next-sitemap.config.js`。

## OG 图片生成

社交媒体预览图片生成指南可参考 `OG_IMAGE_README.md`。

## 部署

项目配置为通过 Vercel 自动部署。推送到主分支的更改将自动部署到生产环境。

### Vercel 环境变量配置

在 Vercel 控制台中配置以下环境变量：

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加以下变量：

```
Name: NEXT_PUBLIC_GA_ID
Value: G-XXXXXXXXXX
Environment: Production, Preview, Development
```

**或者使用 Vercel CLI：**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 设置环境变量
vercel env add NEXT_PUBLIC_GA_ID
# 输入值: G-XXXXXXXXXX
# 选择环境: Production, Preview, Development
```

### 自动部署

- **生产环境**: 推送到 `main` 分支自动部署
- **预览环境**: 创建 Pull Request 自动生成预览链接
- **开发环境**: 使用 `vercel dev` 本地开发

## 许可证

© 2025 SoundBoard.run. 保留所有权利。
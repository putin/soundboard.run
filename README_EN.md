# SoundBoard.run Audio Platform Website

🎵 **Official Website**: [SoundBoard.run Official Website](https://soundboard.run/)

📖 **中文版本**: [README.md](./README.md)

This is the official website project for SoundBoard.run audio platform, built with Next.js. The website provides free sound buttons, soundboards, and optimization for search engines and AI crawlers.

## Project Overview

SoundBoard.run is a free audio platform that provides various sound effects, meme audio clips, and viral audio snippets. Users can play audio directly in their browser or download MP3 files. This project is the official website implementation, now expanded into a multi-category audio platform offering 4 main audio categories.

## About the Platform

**SoundBoard.run** is an independently developed free online audio platform featuring a comprehensive collection of sound effects, meme audio, and trending clips. Unlike traditional audio sites that focus on complex licensing, SoundBoard.run emphasizes instant playback and easy downloads, creating a unique and practical audio experience.

### Platform Highlights

🎵 **Instant Audio Playback**: Experience instant audio playback with our optimized streaming technology designed for fast access and high-quality sound.

🌍 **Four Audio Categories**: Access Trending, Memes, Sound Effects, and Reactions - each offering unique audio content and easy navigation.

⚡ **Free Downloads**: No paid restrictions, just pure audio enjoyment. Download unlimited sounds completely free without any limitations.

🎯 **Easy to Use, Powerful Features**: Intuitive interface with powerful search functionality, but deep organization makes it easy to discover new audio content.

### Why Use SoundBoard.run?

- **Free & Accessible**: Play and download instantly in your browser without registration
- **Cross-Platform**: Compatible with Windows, Mac, Linux, and mobile devices
- **Unique Content**: Experience a vast collection of trending and classic audio
- **Regular Updates**: Continuously updated with new sounds and viral content

The platform delivers instant access to a comprehensive audio library, where organization and search features matter more than complex navigation. Whether you're a content creator, gamer, or just someone who loves funny sounds, SoundBoard.run offers consistently engaging audio content that keeps you coming back for more.

### Supported Audio Categories

1. **[Trending](https://soundboard.run/#trending)** - Most popular sounds right now
2. **[Memes](https://soundboard.run/#memes)** - Classic meme sounds like Bruh, Vine Boom, etc.
3. **[Sound Effects](https://soundboard.run/#sound-board)** - Classic sound effects like mouse clicks, notifications, etc.
4. **[Reactions](https://soundboard.run/#reactions)** - Reaction sounds like laughter, applause, etc.

### Main Features

- **Multi-Category Audio Display** - Supports 4 main audio categories
- **Unified Audio Page Template** - Each category has complete introduction and audio list
- **Audio Features, Usage & FAQ Introduction** - Detailed platform guides and common questions
- **Search Engine Optimization (SEO)** - Complete meta tags and structured data
- **AI Crawler Special Content Optimization** - Dedicated llms.txt files
- **Responsive Design** - Supports various devices and screen sizes
- **Audio Recommendation System** - Recommends related audio in each category

## Tech Stack

- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: Radix UI (Complete accessibility component library)
- **Deployment**: Vercel
- **SEO**: next-sitemap 4.2.3
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Project Structure

```
/
├── app/                    # Next.js App Directory (App Router)
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── privacy-policy/     # Privacy policy page
│   ├── terms-of-service/   # Terms of service page
│   ├── sound-board/      # Audio data and configuration
│   ├── layout.tsx          # Global layout
│   ├── page.tsx            # Homepage (Audio categories display)
│   ├── schema.ts           # Structured data configuration
│   └── globals.css         # Global styles
├── components/             # React component library
│   ├── sound-board/      # Audio category display components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── templates/          # Page templates
│   ├── home/               # Homepage components
│   ├── features/           # Platform features components
│   ├── what-is/            # Platform introduction components
│   ├── how-to-play/        # Usage instruction components
│   ├── faq/                # FAQ components
│   ├── rating/             # Rating components
│   └── ui/                 # Basic UI components (based on Radix UI)
├── config/                 # Configuration files
│   ├── site.ts/js          # Site basic configuration
│   ├── content.ts          # Platform content configuration
│   ├── layout.ts           # Layout configuration
│   └── theme.ts            # Theme configuration
├── hooks/                  # Custom React Hooks
├── lib/                    # Utility function library
├── public/                 # Static resources
│   ├── assets/             # Images and other resources
│   │   └── img/            # Site common images
│   ├── llms.txt            # AI crawler dedicated content summary
│   ├── llms-full.txt       # AI crawler dedicated complete content
│   ├── robots.txt          # Search engine crawler rules
│   └── sitemap.xml         # Website map
├── next.config.js          # Next.js configuration
├── next-sitemap.config.js  # Sitemap and robots.txt configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── components.json         # shadcn/ui component configuration
```

## Development Guide

### Environment Requirements

- Node.js 16.x or higher
- npm or yarn

### Environment Variable Configuration

Create a `.env.local` file in the project root directory:

```bash
# Google Analytics Configuration
# Please replace with your own Google Analytics ID
# Get it from: https://analytics.google.com/ → Admin → Data Streams → Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Other optional configurations
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Note**: 
- `.env.local` file is already in `.gitignore` and won't be committed to the codebase
- Please replace `G-XXXXXXXXXX` with your own Google Analytics Measurement ID

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Local Development

```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000 to view the website.

### Build Project

```bash
npm run build
# or
yarn build
```

### Generate Sitemap

```bash
npm run sitemap
# or
yarn sitemap
```

### Clean Sitemap

```bash
npm run clean-sitemap
```

## Audio Function Guide

The website provides the following audio features:

- **Instant Playback**: Click any audio button to play in the browser
- **Free Downloads**: All audio files can be downloaded for free in MP3 format
- **Category Browsing**: Organize audio by category for easy finding
- **Search Function**: Support searching by name, description, and tags
- **Responsive Design**: Good experience on both desktop and mobile devices

## Add New Audio Guide

To add new audio, follow these steps:

1. **Add Audio Data**: Add new audio items in `app/sound-board/sound-board-data.ts`
2. **Configure Audio Information**: Set title, description, MP3 URL, and tags
3. **Category Organization**: Assign audio to appropriate categories
4. **Test Playback**: Ensure audio URLs can be accessed and played normally

## Related Links and Resources

### Official Pages
- 🏠 **Homepage**: [SoundBoard.run Official Website](https://soundboard.run/)
- 📞 **Contact Us**: [Contact Us](https://soundboard.run/contact)
- ℹ️ **About Us**: [About Us](https://soundboard.run/about)
- 🔒 **Privacy Policy**: [Privacy Policy](https://soundboard.run/privacy-policy)
- 📋 **Terms of Service**: [Terms of Service](https://soundboard.run/terms-of-service)

### External Links (Footer Quick Links)
- 🎵 **Trending Sounds**: [Trending Audio](https://soundboard.run/#trending)
- 😂 **Meme Sounds**: [Meme Audio](https://soundboard.run/#memes)
- 🔊 **Sound Effects**: [Sound Effects Library](https://soundboard.run/#sound-board)
- 👏 **Reaction Sounds**: [Reaction Audio](https://soundboard.run/#reactions)

## AI Crawler Optimization

This project is specially optimized for AI crawlers:

1. **Dedicated Content Files**: Provides `llms.txt` and `llms-full.txt` files containing structured platform information
2. **robots.txt Configuration**: Guides AI crawlers to dedicated files, limiting access to other parts of the website
3. **Supported AI Crawlers**: GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, DeepseekBot, etc.

Detailed configuration can be viewed in `next-sitemap.config.js`.

## Deployment

The project is configured for automatic deployment through Vercel. Changes pushed to the main branch will be automatically deployed to production.

### Vercel Environment Variable Configuration

Configure the following environment variables in Vercel Console:

1. Login to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

```
Name: NEXT_PUBLIC_GA_ID
Value: G-XXXXXXXXXX
Environment: Production, Preview, Development
```

**Or use Vercel CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Set environment variables
vercel env add NEXT_PUBLIC_GA_ID
# Enter value: G-XXXXXXXXXX
# Select environment: Production, Preview, Development
```

### Automatic Deployment

- **Production Environment**: Push to `main` branch for automatic deployment
- **Preview Environment**: Create Pull Request for automatic preview link generation
- **Development Environment**: Use `vercel dev` for local development

## License

© 2025 SoundBoard.run. All rights reserved. 
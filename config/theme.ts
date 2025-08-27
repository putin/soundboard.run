export const theme = {
  header: {
    colors: {
      // 方案1：温暖柔和的玫瑰金渐变
      // background: "bg-gradient-to-b from-rose-100/90 via-rose-50/85 to-white/80 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-800/80",

      // 方案2：高级灰调渐变
      // background: "bg-gradient-to-b from-slate-200/90 via-gray-100/85 to-white/80 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-800/80",

      // 方案3：温暖米色渐变
      background: "bg-gradient-to-b from-amber-50/90 via-orange-50/85 to-white/80 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-800/80",

      border: "border-b border-white/10",
      text: "text-slate-800 dark:text-white/90",
      hover: "hover:text-slate-800 dark:hover:text-white hover:scale-105 transition-all",
    },
    layout: {
      height: "h-16",
      position: "sticky top-0",
      zIndex: "z-50",
      blur: "backdrop-blur-sm shadow-lg shadow-black/5",
      logo: {
        wrapper: "flex items-center gap-4",
        image: "object-contain",
      },
      nav: {
        wrapper: "flex items-center gap-6 mr-4",
        list: "hidden md:flex items-center space-x-8",
      }
    },
    spacing: {
      container: "container",
      nav: "space-x-4 lg:space-x-6",
      search: "space-x-2",
    },
  },
  footer: {
    colors: {
      // 方案1：温暖柔和的玫瑰金渐变
      // background: "bg-gradient-to-b from-rose-100/90 via-rose-50/85 to-white/80 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-800/80",

      // 方案2：高级灰调渐变
      // background: "bg-gradient-to-b from-slate-200/90 via-gray-100/85 to-white/80 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-800/80",

      // 方案3：温暖米色渐变
      background: "bg-gradient-to-t from-amber-50/90 via-orange-50/85 to-white/80 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-800/80",

      border: "border-t border-white/10",
      text: "text-slate-800 dark:text-white/90",
      mutedText: "text-slate-600 dark:text-slate-400",
      hover: "hover:text-slate-800 dark:hover:text-white",
    },
    layout: {
      padding: "py-8",
      container: "container mx-auto px-4",
      grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
    },
    spacing: {
      sectionTitle: "mb-4",
      linkList: "space-y-2",
    },
  },
  layout: {
    section: {
      spacing: "mb-24", // 使用更大的间距 mb-24 (6rem) 替代原来的 mb-16 (4rem)
      scrollMargin: "scroll-mt-16" // 添加统一的滚动偏移量
    }
  },
  howToPlay: {
    colors: {
      title: "text-foreground",
      description: "text-muted-foreground",
      stepNumber: "bg-primary text-primary-foreground" // 添加步骤数字的样式
    },
    layout: {
      section: "",
      container: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center",
      content: "prose prose-neutral dark:prose-invert max-w-none",
      imageContainer: "rounded-lg overflow-hidden",
      card: "overflow-hidden" // 添加卡片布局
    },
    spacing: {
      section: "py-12",
      title: "mb-8",
      content: "space-y-4" // 添加内容间距
    }
  },
  whatIs: {
    colors: {
      card: "bg-card",
      title: "text-foreground",
      description: "text-muted-foreground",
      link: "text-primary hover:underline"
    },
    layout: {
      section: "", // 需要添加
      container: "container",
      card: "rounded-lg shadow-lg",
      logo: "object-contain",
      logoWrapper: "flex justify-center"
    },
    spacing: {
      section: "mb-16",
      card: "p-8",
      title: "mb-4",
      description: "mb-6",
      links: "gap-6"
    },
    typography: {
      title: "text-3xl font-bold",
      description: "text-lg leading-relaxed whitespace-pre-line", // 添加 whitespace-pre-line
      link: "font-semibold"
    }
  },
  faq: {
    spacing: {
      section: "mb-16",
      title: "mb-8"
    },
    typography: {
      title: "text-3xl font-bold text-center"
    },
    layout: {
      section: "", // 添加这个属性
      accordion: "w-full"
    }
  },
  soundBoard: {
    layout: {
      section: "mb-16",
      grid: "grid gap-0",
      card: "overflow-hidden hover:shadow-lg transition-shadow",
      image: "w-full h-48 object-cover"
    },
    spacing: {
      title: "mb-8",
      cardTitle: "mb-2",
      cardDescription: "mb-4"
    },
    typography: {
      title: "text-3xl font-bold text-center",
      cardTitle: "text-lg text-center"
    }
  },
  features: {
    colors: {
      item1: "text-blue-600",
      item2: "text-green-600",
      item3: "text-purple-600",
      item4: "text-orange-600"
    }
  }
} as const;

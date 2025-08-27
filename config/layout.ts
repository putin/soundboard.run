export const layout = {
  header: {
    isVisible: true,
    maxWidth: "max-w-sm",
    searchEnabled: true,
    logoSize: "text-2xl",
    container: {
      padding: "px-4 md:px-8",
    },
    logo: {
      src: "/assets/img/icon1.png", // 使用新的icon1.png图标
      size: "w-12 h-12", // 增加到 48x48 显示尺寸
    }
  },
  footer: {
    isVisible: true,
    sections: {
      about: true,
      quickLinks: true,
      social: true,
      legal: true,
      categories: true,  // 改为 categories section
    }
  },
  whatIs: {
    sectionId: "what-is",
    grid: {
      columns: "grid grid-cols-1 md:grid-cols-3 gap-8 items-center",
      gap: "gap-8",
    },
    content: {
      span: "md:col-span-2"
    },
    logo: {
      size: {
        width: "w-48",
        height: "h-48"
      }
    }
  },
  faq: {
    sectionId: "faq",
    accordion: {
      type: "single",
      collapsible: true
    }
  }
} as const;







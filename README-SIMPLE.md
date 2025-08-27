# 🚀 SoundBoard.run - 简化版架构说明

## 📋 简化版特点

为了降低复杂度和更快上线，我们创建了简化版的数据库架构：

### ✅ 保留的功能
- ✅ 基础表结构（分类、音频、标签、关联表）
- ✅ RLS 安全策略
- ✅ 基础索引优化
- ✅ 统计计数功能
- ✅ 简单搜索功能
- ✅ 表关联查询

### ❌ 移除的复杂功能
- ❌ 复杂视图 (Views)
- ❌ 全文搜索索引 (GIN)
- ❌ 高级搜索算法
- ❌ 复杂的统计函数
- ❌ 推荐算法

## 🗄️ 数据库文件

### 主要文件
- `database/schema-simple.sql` - 简化版数据库架构
- `database/functions-simple.sql` - 基础函数集合
- `app/api/*/route-simple.ts` - 简化版 API 路由

### 使用方式

1. **创建数据库表**
   ```sql
   -- 在 Supabase SQL Editor 中执行
   \i database/schema-simple.sql
   \i database/functions-simple.sql
   ```

2. **替换 API 路由**
   ```bash
   # 备份原文件
   mv app/api/audio/route.ts app/api/audio/route-complex.ts
   mv app/api/audio/[audioId]/route.ts app/api/audio/[audioId]/route-complex.ts
   mv app/api/search/route.ts app/api/search/route-complex.ts
   
   # 使用简化版
   mv app/api/audio/route-simple.ts app/api/audio/route.ts
   mv app/api/audio/[audioId]/route-simple.ts app/api/audio/[audioId]/route.ts
   mv app/api/search/route-simple.ts app/api/search/route.ts
   ```

## 🔒 RLS 策略说明

### 什么是 RLS (Row Level Security)

RLS 是 PostgreSQL 的安全功能，用于控制数据访问权限：

```sql
-- 启用 RLS
ALTER TABLE sound_categories ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取活跃分类
CREATE POLICY "Public categories are viewable by everyone" 
ON sound_categories FOR SELECT USING (is_active = true);
```

### 为什么需要 RLS

1. **安全防护**: 防止恶意用户直接访问数据库
2. **数据隔离**: 只显示符合条件的数据（如 `is_active = true`）
3. **Supabase 要求**: 启用 RLS 后必须定义访问策略

### 当前策略

| 表名 | 策略 | 说明 |
|------|------|------|
| `sound_categories` | 读取活跃分类 | `is_active = true` |
| `sound_audio_items` | 读取活跃音频 | `is_active = true` |
| `sound_tags` | 读取所有标签 | 无限制 |
| `sound_audio_tags` | 读取所有关联 | 无限制 |
| `sound_play_history` | 只允许插入 | 保护隐私 |

## 🎯 查询优化策略

### 1. 表关联查询代替视图

**原来（复杂）:**
```sql
-- 使用视图
SELECT * FROM audio_items_with_category WHERE category_id = 'memes';
```

**现在（简化）:**
```sql
-- 直接表关联
SELECT 
  a.*,
  c.name as category_name,
  c.color as category_color
FROM sound_audio_items a
LEFT JOIN sound_categories c ON a.category_id = c.id
WHERE a.category_id = 'memes' AND a.is_active = true;
```

### 2. 简单搜索代替全文搜索

**原来（复杂）:**
```sql
-- 全文搜索
SELECT * FROM audio_items 
WHERE to_tsvector('english', title || description) @@ plainto_tsquery('english', 'funny');
```

**现在（简化）:**
```sql
-- ILIKE 搜索
SELECT * FROM sound_audio_items 
WHERE title ILIKE '%funny%' OR description ILIKE '%funny%';
```

### 3. 函数简化

```sql
-- 获取分类音频列表（简化版）
CREATE OR REPLACE FUNCTION get_category_audio_list(
  category_filter VARCHAR(50) DEFAULT NULL,
  limit_count INTEGER DEFAULT 24,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (/* 返回字段 */)
AS $$
  SELECT a.*, c.name as category_name
  FROM sound_audio_items a
  LEFT JOIN sound_categories c ON a.category_id = c.id
  WHERE a.is_active = true
    AND (category_filter IS NULL OR a.category_id = category_filter)
  ORDER BY a.created_at DESC
  LIMIT limit_count OFFSET offset_count;
$$;
```

## 📈 性能考虑

### 索引策略
```sql
-- 只保留必要的索引
CREATE INDEX idx_sound_audio_items_category_id ON sound_audio_items(category_id);
CREATE INDEX idx_sound_audio_items_is_active ON sound_audio_items(is_active);
CREATE INDEX idx_sound_audio_items_created_at ON sound_audio_items(created_at DESC);
```

### API 响应优化
- 使用 Supabase 的内置分页
- 限制返回字段数量
- 异步处理非关键操作（如播放历史记录）

## 🔄 升级路径

当需要更高级功能时，可以逐步升级：

1. **阶段1（当前）**: 简化版 - 基础功能
2. **阶段2**: 添加全文搜索索引
3. **阶段3**: 实现推荐算法
4. **阶段4**: 添加复杂统计和分析

## 🚦 迁移检查清单

- [ ] 执行 `schema-simple.sql`
- [ ] 执行 `functions-simple.sql`
- [ ] 替换 API 路由文件
- [ ] 运行数据迁移脚本
- [ ] 测试所有功能
- [ ] 部署到 Vercel

这个简化版本保持了核心功能的同时，大大降低了系统复杂度，更容易维护和调试。
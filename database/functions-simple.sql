-- Supabase 数据库函数 - 简化版
-- 用于支持 API 操作的基础函数

-- 增加计数器的函数（通用）
CREATE OR REPLACE FUNCTION increment_counter(
  table_name TEXT,
  row_id TEXT,
  column_name TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  -- 动态构建 SQL 查询
  EXECUTE format('UPDATE %I SET %I = %I + 1 WHERE id = $1 RETURNING %I', 
                 table_name, column_name, column_name, column_name)
  USING row_id
  INTO new_count;
  
  RETURN COALESCE(new_count, 0);
END;
$$;

-- 增加标签使用次数的函数
CREATE OR REPLACE FUNCTION increment_tag_usage(tag_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE sound_tags 
  SET usage_count = usage_count + 1 
  WHERE id = tag_id 
  RETURNING usage_count INTO new_count;
  
  RETURN COALESCE(new_count, 0);
END;
$$;

-- 获取音频详情（包含分类信息）
CREATE OR REPLACE FUNCTION get_audio_with_category(audio_id VARCHAR(100))
RETURNS TABLE (
  id VARCHAR(100),
  title VARCHAR(200),
  description TEXT,
  mp3_url VARCHAR(500),
  category_id VARCHAR(50),
  category_name VARCHAR(100),
  category_description TEXT,
  play_count BIGINT,
  download_count BIGINT,
  like_count BIGINT,
  is_featured BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    a.id,
    a.title,
    a.description,
    a.mp3_url,
    a.category_id,
    c.name as category_name,
    c.description as category_description,
    a.play_count,
    a.download_count,
    a.like_count,
    a.is_featured,
    a.created_at
  FROM sound_audio_items a
  LEFT JOIN sound_categories c ON a.category_id = c.id
  WHERE a.id = audio_id AND a.is_active = true;
$$;

-- 获取分类下的音频列表
CREATE OR REPLACE FUNCTION get_category_audio_list(
  category_filter VARCHAR(50) DEFAULT NULL,
  limit_count INTEGER DEFAULT 24,
  offset_count INTEGER DEFAULT 0,
  sort_by TEXT DEFAULT 'created_at',
  sort_order TEXT DEFAULT 'desc'
)
RETURNS TABLE (
  id VARCHAR(100),
  title VARCHAR(200),
  description TEXT,
  mp3_url VARCHAR(500),
  category_id VARCHAR(50),
  category_name VARCHAR(100),
  play_count BIGINT,
  is_featured BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  EXECUTE format('
    SELECT 
      a.id,
      a.title,
      a.description,
      a.mp3_url,
      a.category_id,
      c.name as category_name,
      a.play_count,
      a.is_featured,
      a.created_at
    FROM sound_audio_items a
    LEFT JOIN sound_categories c ON a.category_id = c.id
    WHERE a.is_active = true
      AND ($1 IS NULL OR a.category_id = $1)
    ORDER BY %I %s
    LIMIT $2 OFFSET $3
  ', sort_by, CASE WHEN sort_order = 'asc' THEN 'ASC' ELSE 'DESC' END)
  USING category_filter, limit_count, offset_count;
END;
$$;

-- 简单搜索函数
CREATE OR REPLACE FUNCTION search_audio_simple(
  search_query TEXT,
  category_filter VARCHAR(50) DEFAULT NULL,
  limit_count INTEGER DEFAULT 20,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id VARCHAR(100),
  title VARCHAR(200),
  description TEXT,
  mp3_url VARCHAR(500),
  category_id VARCHAR(50),
  category_name VARCHAR(100),
  play_count BIGINT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    a.id,
    a.title,
    a.description,
    a.mp3_url,
    a.category_id,
    c.name as category_name,
    a.play_count,
    a.created_at
  FROM sound_audio_items a
  LEFT JOIN sound_categories c ON a.category_id = c.id
  WHERE 
    a.is_active = true
    AND (category_filter IS NULL OR a.category_id = category_filter)
    AND (
      a.title ILIKE '%' || search_query || '%'
      OR a.description ILIKE '%' || search_query || '%'
    )
  ORDER BY 
    a.play_count DESC,
    a.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
$$;

-- 获取音频的标签
CREATE OR REPLACE FUNCTION get_audio_tags(audio_id VARCHAR(100))
RETURNS TABLE (
  tag_id UUID,
  tag_name VARCHAR(50),
  tag_color VARCHAR(20)
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    t.id as tag_id,
    t.name as tag_name,
    t.color as tag_color
  FROM sound_tags t
  INNER JOIN sound_audio_tags at ON t.id = at.tag_id
  WHERE at.audio_id = audio_id
  ORDER BY t.usage_count DESC;
$$;

-- 获取分类统计信息
CREATE OR REPLACE FUNCTION get_category_stats()
RETURNS TABLE (
  category_id VARCHAR(50),
  category_name VARCHAR(100),
  audio_count BIGINT,
  total_plays BIGINT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    c.id as category_id,
    c.name as category_name,
    COUNT(a.id) as audio_count,
    COALESCE(SUM(a.play_count), 0) as total_plays
  FROM sound_categories c
  LEFT JOIN sound_audio_items a ON c.id = a.category_id AND a.is_active = true
  WHERE c.is_active = true
  GROUP BY c.id, c.name, c.sort_order
  ORDER BY c.sort_order, c.name;
$$;
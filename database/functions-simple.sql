-- Supabase 数据库函数 - 简化版
-- 用于支持 API 操作的基础函数

-- 增加音频统计计数器的函数
CREATE OR REPLACE FUNCTION increment_audio_counter(
  p_audio_id INTEGER,
  counter_type TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  -- 插入或更新统计记录
  INSERT INTO sound_audio_items_stat (audio_id, play_count, download_count, like_count)
  VALUES (p_audio_id, 
    CASE WHEN counter_type = 'play_count' THEN 1 ELSE 0 END,
    CASE WHEN counter_type = 'download_count' THEN 1 ELSE 0 END,
    CASE WHEN counter_type = 'like_count' THEN 1 ELSE 0 END
  )
  ON CONFLICT (audio_id) DO UPDATE SET
    play_count = sound_audio_items_stat.play_count + CASE WHEN counter_type = 'play_count' THEN 1 ELSE 0 END,
    download_count = sound_audio_items_stat.download_count + CASE WHEN counter_type = 'download_count' THEN 1 ELSE 0 END,
    like_count = sound_audio_items_stat.like_count + CASE WHEN counter_type = 'like_count' THEN 1 ELSE 0 END;
  
  -- 返回更新后的计数
  EXECUTE format('SELECT %I FROM sound_audio_items_stat WHERE audio_id = $1', counter_type)
  USING p_audio_id
  INTO new_count;
  
  RETURN COALESCE(new_count, 0);
END;
$$;



-- 获取音频详情（包含分类信息）
CREATE OR REPLACE FUNCTION get_audio_with_category(audio_id INTEGER)
RETURNS TABLE (
  id INTEGER,
  title VARCHAR(200),
  description TEXT,
  mp3_url VARCHAR(500),
  category_id INTEGER,
  category_name VARCHAR(100),

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
    COALESCE(s.play_count, 0) as play_count,
    COALESCE(s.download_count, 0) as download_count,
    COALESCE(s.like_count, 0) as like_count,
    a.is_featured,
    a.created_at
  FROM sound_audio_items a
  LEFT JOIN sound_categories c ON a.category_id = c.id
  LEFT JOIN sound_audio_items_stat s ON a.id = s.audio_id
  WHERE a.id = audio_id AND a.is_active = true;
$$;

-- 获取分类下的音频列表
CREATE OR REPLACE FUNCTION get_category_audio_list(
  category_filter INTEGER DEFAULT NULL,
  limit_count INTEGER DEFAULT 24,
  offset_count INTEGER DEFAULT 0,
  sort_by TEXT DEFAULT 'created_at',
  sort_order TEXT DEFAULT 'desc'
)
RETURNS TABLE (
  id INTEGER,
  title VARCHAR(200),
  description TEXT,
  mp3_url VARCHAR(500),
  category_id INTEGER,
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
      COALESCE(s.play_count, 0) as play_count,
      a.is_featured,
      a.created_at
    FROM sound_audio_items a
    LEFT JOIN sound_categories c ON a.category_id = c.id
    LEFT JOIN sound_audio_items_stat s ON a.id = s.audio_id
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
  category_filter INTEGER DEFAULT NULL,
  limit_count INTEGER DEFAULT 20,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id INTEGER,
  title VARCHAR(200),
  description TEXT,
  mp3_url VARCHAR(500),
  category_id INTEGER,
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
    COALESCE(s.play_count, 0) as play_count,
    a.created_at
  FROM sound_audio_items a
  LEFT JOIN sound_categories c ON a.category_id = c.id
  LEFT JOIN sound_audio_items_stat s ON a.id = s.audio_id
  WHERE 
    a.is_active = true
    AND (category_filter IS NULL OR a.category_id = category_filter)
    AND (
      a.title ILIKE '%' || search_query || '%'
      OR a.description ILIKE '%' || search_query || '%'
    )
  ORDER BY 
    COALESCE(s.play_count, 0) DESC,
    a.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
$$;



-- 获取分类统计信息
CREATE OR REPLACE FUNCTION get_category_stats()
RETURNS TABLE (
  category_id INTEGER,
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
    COALESCE(SUM(s.play_count), 0) as total_plays
  FROM sound_categories c
  LEFT JOIN sound_audio_items a ON c.id = a.category_id AND a.is_active = true
  LEFT JOIN sound_audio_items_stat s ON a.id = s.audio_id
  WHERE c.is_active = true
  GROUP BY c.id, c.name, c.sort_order
  ORDER BY c.sort_order, c.name;
$$;
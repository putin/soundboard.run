-- Supabase 数据库架构设计 - 简化版
-- SoundBoard.run 音频分享平台

-- 音频分类表
CREATE TABLE sound_categories (
  id  SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(20),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 音频文件表
CREATE TABLE sound_audio_items (
    id  SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  mp3_url VARCHAR(500) NOT NULL,
  category_id INTEGER , -- 关联 sound_categories.id
  file_size BIGINT, -- 文件大小 (bytes)
  duration FLOAT, -- 时长 (秒)
  bitrate INTEGER, -- 比特率
  format VARCHAR(10) DEFAULT 'mp3',
  
  -- SEO 相关
  slug VARCHAR(200) UNIQUE,
  meta_title VARCHAR(200),
  meta_description TEXT,
 
  -- 状态管理
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
);

DROP TABLE IF EXISTS sound_audio_items_stat;
CREATE TABLE sound_audio_items_stat (
  audio_id INTEGER PRIMARY KEY REFERENCES sound_audio_items(id),
  play_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0
);


-- 创建基础索引以优化查询性能
CREATE INDEX idx_sound_audio_items_category_id ON sound_audio_items(category_id);
CREATE INDEX idx_sound_audio_items_is_active ON sound_audio_items(is_active);
CREATE INDEX idx_sound_audio_items_created_at ON sound_audio_items(created_at DESC);


-- 创建更新时间戳的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sound_categories_updated_at BEFORE UPDATE ON sound_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sound_audio_items_updated_at BEFORE UPDATE ON sound_audio_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 策略
ALTER TABLE sound_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sound_audio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE sound_audio_items_stat ENABLE ROW LEVEL SECURITY;

-- 公开读取策略 - 允许所有人读取活跃的数据
CREATE POLICY "Public categories are viewable by everyone" ON sound_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public audio items are viewable by everyone" ON sound_audio_items
    FOR SELECT USING (is_active = true);

-- 统计表的策略 - 允许所有人读取，但只有函数可以更新
CREATE POLICY "Public stats are viewable by everyone" ON sound_audio_items_stat
    FOR SELECT USING (true);

CREATE POLICY "Stats can be updated by functions" ON sound_audio_items_stat
    FOR ALL USING (true);








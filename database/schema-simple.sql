-- Supabase 数据库架构设计 - 简化版
-- SoundBoard.run 音频分享平台

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 音频分类表
CREATE TABLE sound_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(20),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  meta_title VARCHAR(200),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 音频文件表
CREATE TABLE sound_audio_items (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  mp3_url VARCHAR(500) NOT NULL,
  category_id VARCHAR(50) NOT NULL, -- 关联 sound_categories.id
  file_size BIGINT, -- 文件大小 (bytes)
  duration FLOAT, -- 时长 (秒)
  bitrate INTEGER, -- 比特率
  format VARCHAR(10) DEFAULT 'mp3',
  
  -- SEO 相关
  slug VARCHAR(200) UNIQUE,
  meta_title VARCHAR(200),
  meta_description TEXT,
  
  -- 统计数据
  play_count BIGINT DEFAULT 0,
  download_count BIGINT DEFAULT 0,
  like_count BIGINT DEFAULT 0,
  
  -- 状态管理
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 约束
  CONSTRAINT sound_audio_items_slug_check CHECK (slug ~ '^[a-z0-9-]+$')
);

-- 标签表
CREATE TABLE sound_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  color VARCHAR(20),
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 音频-标签关联表
CREATE TABLE sound_audio_tags (
  audio_id VARCHAR(100), -- 关联 sound_audio_items.id
  tag_id UUID, -- 关联 sound_tags.id
  PRIMARY KEY (audio_id, tag_id)
);

-- 播放历史表 (用于统计)
CREATE TABLE sound_play_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  audio_id VARCHAR(100), -- 关联 sound_audio_items.id
  user_id UUID, -- 可选，匿名用户为NULL
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建基础索引以优化查询性能
CREATE INDEX idx_sound_audio_items_category_id ON sound_audio_items(category_id);
CREATE INDEX idx_sound_audio_items_is_active ON sound_audio_items(is_active);
CREATE INDEX idx_sound_audio_items_created_at ON sound_audio_items(created_at DESC);
CREATE INDEX idx_sound_audio_tags_audio_id ON sound_audio_tags(audio_id);
CREATE INDEX idx_sound_audio_tags_tag_id ON sound_audio_tags(tag_id);
CREATE INDEX idx_sound_play_history_audio_id ON sound_play_history(audio_id);

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
ALTER TABLE sound_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE sound_audio_tags ENABLE ROW LEVEL SECURITY;

-- 公开读取策略 - 允许所有人读取活跃的数据
CREATE POLICY "Public categories are viewable by everyone" ON sound_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public audio items are viewable by everyone" ON sound_audio_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Tags are viewable by everyone" ON sound_tags
    FOR SELECT USING (true);

CREATE POLICY "Audio tags are viewable by everyone" ON sound_audio_tags
    FOR SELECT USING (true);

-- 播放历史策略 - 允许插入但不允许读取（保护隐私）
CREATE POLICY "Anyone can insert play history" ON sound_play_history
    FOR INSERT WITH CHECK (true);

-- 注释说明
COMMENT ON TABLE sound_categories IS '音频分类表';
COMMENT ON TABLE sound_audio_items IS '音频文件表';
COMMENT ON TABLE sound_tags IS '标签表';
COMMENT ON TABLE sound_audio_tags IS '音频标签关联表';
COMMENT ON TABLE sound_play_history IS '播放历史记录表';

COMMENT ON COLUMN sound_audio_items.slug IS '用于SEO友好的URL路径';
COMMENT ON COLUMN sound_audio_items.play_count IS '播放次数统计';
COMMENT ON COLUMN sound_audio_items.is_featured IS '是否为精选内容';
COMMENT ON COLUMN sound_tags.usage_count IS '标签使用次数统计';

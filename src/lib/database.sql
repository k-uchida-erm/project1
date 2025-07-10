-- sticky_notesテーブルにwidth、heightカラムを追加
ALTER TABLE sticky_notes 
ADD COLUMN IF NOT EXISTS width INTEGER DEFAULT 160,
ADD COLUMN IF NOT EXISTS height INTEGER DEFAULT 160; 
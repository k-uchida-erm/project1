-- データベースの現在の構造を確認
-- 1. sticky_notesテーブルの構造確認
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'sticky_notes' AND table_schema = 'public';

-- 2. テーブル一覧確認
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 3. sticky_notesテーブルが存在するかチェック
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'sticky_notes'
); 
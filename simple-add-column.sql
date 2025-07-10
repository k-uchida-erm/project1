-- 既存のテーブルにuser_idカラムを追加する簡単なスクリプト

-- 1. sticky_notesテーブルにuser_idカラムを追加
ALTER TABLE public.sticky_notes 
ADD COLUMN IF NOT EXISTS user_id text;

-- 2. documentsテーブルにuser_idカラムを追加
ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS user_id text;

-- 3. chat_messagesテーブルにuser_idカラムを追加
ALTER TABLE public.chat_messages 
ADD COLUMN IF NOT EXISTS user_id text;

-- 4. RLSを無効にする（テスト用）
ALTER TABLE public.sticky_notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;  
ALTER TABLE public.chat_messages DISABLE ROW LEVEL SECURITY;

-- 5. 権限を設定（テスト用）
GRANT ALL ON public.sticky_notes TO anon;
GRANT ALL ON public.documents TO anon;
GRANT ALL ON public.chat_messages TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- 6. 確認用クエリ（実行後に結果を確認）
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'sticky_notes' AND table_schema = 'public'; 
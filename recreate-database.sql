-- 完全にテーブルを再作成するスクリプト

-- 1. 既存のテーブルを削除（存在する場合）
DROP TABLE IF EXISTS public.chat_messages CASCADE;
DROP TABLE IF EXISTS public.documents CASCADE;
DROP TABLE IF EXISTS public.sticky_notes CASCADE;

-- 2. sticky_notesテーブルを作成
CREATE TABLE public.sticky_notes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL DEFAULT 'New Note',
    content text NOT NULL DEFAULT '',
    x integer NOT NULL DEFAULT 0,
    y integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id text NOT NULL
);

-- 3. documentsテーブルを作成
CREATE TABLE public.documents (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id text NOT NULL
);

-- 4. chat_messagesテーブルを作成
CREATE TABLE public.chat_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    content text NOT NULL,
    is_user boolean NOT NULL DEFAULT true,
    timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    note_id uuid REFERENCES public.sticky_notes(id) ON DELETE CASCADE,
    user_id text NOT NULL
);

-- 5. インデックスを作成
CREATE INDEX sticky_notes_user_id_idx ON public.sticky_notes(user_id);
CREATE INDEX sticky_notes_updated_at_idx ON public.sticky_notes(updated_at DESC);
CREATE INDEX documents_user_id_idx ON public.documents(user_id);
CREATE INDEX documents_updated_at_idx ON public.documents(updated_at DESC);
CREATE INDEX chat_messages_note_id_idx ON public.chat_messages(note_id);
CREATE INDEX chat_messages_user_id_idx ON public.chat_messages(user_id);

-- 6. updated_at自動更新関数を作成
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language plpgsql;

-- 7. トリガーを作成
CREATE TRIGGER update_sticky_notes_updated_at
    BEFORE UPDATE ON sticky_notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_messages_updated_at
    BEFORE UPDATE ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. 権限を設定（テスト用）
GRANT ALL ON public.sticky_notes TO anon;
GRANT ALL ON public.documents TO anon;
GRANT ALL ON public.chat_messages TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- 9. RLSを無効にする（テスト用）
ALTER TABLE public.sticky_notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages DISABLE ROW LEVEL SECURITY;

-- 10. テスト用データを挿入
INSERT INTO public.sticky_notes (title, content, x, y, user_id) 
VALUES ('Test Note', 'This is a test note', 100, 100, 'test-user-id'); 
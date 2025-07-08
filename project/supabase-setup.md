# Supabase セットアップ手順

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインイン
4. 「New project」をクリック
5. プロジェクト名、データベースパスワードを設定
6. リージョンを選択（日本の場合は「Asia Pacific (Tokyo)」推奨）

## 2. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下を追加：

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**値の取得方法:**
1. Supabaseダッシュボードの「Settings」→「API」
2. 「Project URL」をコピーして `REACT_APP_SUPABASE_URL` に設定
3. 「Project API keys」の「anon public」をコピーして `REACT_APP_SUPABASE_ANON_KEY` に設定

## 3. データベーステーブルの作成

Supabaseダッシュボードの「SQL Editor」で以下のSQLを実行：

```sql
-- スティッキーノートテーブル
CREATE TABLE sticky_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- ドキュメントテーブル
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- チャットメッセージテーブル
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  note_id UUID REFERENCES sticky_notes(id),
  user_id UUID REFERENCES auth.users(id)
);

-- RLS (Row Level Security) の有効化
ALTER TABLE sticky_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- ポリシーの作成（認証済みユーザーのみ自分のデータにアクセス可能）
CREATE POLICY "Users can view own sticky_notes" ON sticky_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sticky_notes" ON sticky_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sticky_notes" ON sticky_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sticky_notes" ON sticky_notes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own documents" ON documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON documents FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own chat_messages" ON chat_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat_messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chat_messages" ON chat_messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own chat_messages" ON chat_messages FOR DELETE USING (auth.uid() = user_id);
```

## 4. 認証の設定（オプション）

認証を使用する場合は、Supabaseダッシュボードの「Authentication」→「Settings」で：
1. 「Site URL」にアプリのURLを設定
2. 必要に応じてプロバイダー（GitHub、Google等）を有効化

## 5. 開発環境での確認

1. プロジェクトを再起動：`npm start`
2. ブラウザの開発者ツールでエラーがないことを確認
3. Supabaseダッシュボードの「Table Editor」でデータが作成されることを確認 
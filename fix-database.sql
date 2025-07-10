-- 1. First, disable RLS on existing tables
ALTER TABLE IF EXISTS public.sticky_notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.chat_messages DISABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own sticky notes" ON sticky_notes;
DROP POLICY IF EXISTS "Users can insert their own sticky notes" ON sticky_notes;
DROP POLICY IF EXISTS "Users can update their own sticky notes" ON sticky_notes;
DROP POLICY IF EXISTS "Users can delete their own sticky notes" ON sticky_notes;

-- 3. Modify user_id column type to support Clerk IDs (string format)
ALTER TABLE IF EXISTS public.sticky_notes ALTER COLUMN user_id TYPE text;
ALTER TABLE IF EXISTS public.documents ALTER COLUMN user_id TYPE text;
ALTER TABLE IF EXISTS public.chat_messages ALTER COLUMN user_id TYPE text;

-- 4. Remove foreign key constraints that reference auth.users
ALTER TABLE IF EXISTS public.sticky_notes DROP CONSTRAINT IF EXISTS sticky_notes_user_id_fkey;
ALTER TABLE IF EXISTS public.documents DROP CONSTRAINT IF EXISTS documents_user_id_fkey;
ALTER TABLE IF EXISTS public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_user_id_fkey;

-- 5. Create tables if they don't exist with correct schema
CREATE TABLE IF NOT EXISTS public.sticky_notes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    x integer NOT NULL DEFAULT 0,
    y integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id text
);

-- 6. Grant permissions for anonymous access (for testing)
GRANT ALL ON public.sticky_notes TO anon;
GRANT ALL ON public.documents TO anon;
GRANT ALL ON public.chat_messages TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- 7. Test insert to verify it works
-- This should be removed after testing
-- INSERT INTO public.sticky_notes (title, content, x, y, user_id) 
-- VALUES ('Test Note', 'Test Content', 100, 100, 'test-user-id'); 
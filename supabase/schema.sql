-- Temporarily disable RLS for testing
-- alter table if exists public.sticky_notes enable row level security;
-- alter table if exists public.documents enable row level security;
-- alter table if exists public.chat_messages enable row level security;

-- Create sticky_notes table
create table if not exists public.sticky_notes (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    content text not null,
    x integer not null default 0,
    y integer not null default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id text -- Changed from UUID to TEXT for Clerk compatibility
);

-- Create documents table
create table if not exists public.documents (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id text -- Changed from UUID to TEXT for Clerk compatibility
);

-- Create chat_messages table
create table if not exists public.chat_messages (
    id uuid default gen_random_uuid() primary key,
    content text not null,
    is_user boolean not null default true,
    timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
    note_id uuid references public.sticky_notes(id) on delete cascade,
    user_id text -- Changed from UUID to TEXT for Clerk compatibility
);

-- Create indexes for better performance
create index if not exists sticky_notes_user_id_idx on public.sticky_notes(user_id);
create index if not exists sticky_notes_updated_at_idx on public.sticky_notes(updated_at desc);
create index if not exists documents_user_id_idx on public.documents(user_id);
create index if not exists documents_updated_at_idx on public.documents(updated_at desc);
create index if not exists chat_messages_note_id_idx on public.chat_messages(note_id);
create index if not exists chat_messages_user_id_idx on public.chat_messages(user_id);

-- Temporarily commented out RLS policies for testing
-- RLS Policies
-- Allow users to see their own data

-- Sticky Notes policies
-- create policy "Users can view their own sticky notes" on sticky_notes
--     for select using (auth.uid() = user_id);

-- create policy "Users can insert their own sticky notes" on sticky_notes
--     for insert with check (auth.uid() = user_id);

-- create policy "Users can update their own sticky notes" on sticky_notes
--     for update using (auth.uid() = user_id);

-- create policy "Users can delete their own sticky notes" on sticky_notes
--     for delete using (auth.uid() = user_id);

-- Documents policies
-- create policy "Users can view their own documents" on documents
--     for select using (auth.uid() = user_id);

-- create policy "Users can insert their own documents" on documents
--     for insert with check (auth.uid() = user_id);

-- create policy "Users can update their own documents" on documents
--     for update using (auth.uid() = user_id);

-- create policy "Users can delete their own documents" on documents
--     for delete using (auth.uid() = user_id);

-- Chat Messages policies
-- create policy "Users can view their own chat messages" on chat_messages
--     for select using (auth.uid() = user_id);

-- create policy "Users can insert their own chat messages" on chat_messages
--     for insert with check (auth.uid() = user_id);

-- create policy "Users can update their own chat messages" on chat_messages
--     for update using (auth.uid() = user_id);

-- create policy "Users can delete their own chat messages" on chat_messages
--     for delete using (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_sticky_notes_updated_at
  before update on sticky_notes
  for each row
  execute function update_updated_at_column();

create trigger update_documents_updated_at
  before update on documents
  for each row
  execute function update_updated_at_column();

create trigger update_chat_messages_updated_at
  before update on chat_messages
  for each row
  execute function update_updated_at_column(); 
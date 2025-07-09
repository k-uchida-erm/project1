import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      sticky_notes: {
        Row: {
          id: string
          title: string
          content: string
          x: number
          y: number
          created_at: string
          updated_at: string
          user_id?: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          x: number
          y: number
          created_at?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          x?: number
          y?: number
          updated_at?: string
          user_id?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          content: string
          created_at: string
          updated_at: string
          user_id?: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          updated_at?: string
          user_id?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          content: string
          is_user: boolean
          timestamp: string
          note_id?: string
          user_id?: string
        }
        Insert: {
          id?: string
          content: string
          is_user: boolean
          timestamp?: string
          note_id?: string
          user_id?: string
        }
        Update: {
          id?: string
          content?: string
          is_user?: boolean
          timestamp?: string
          note_id?: string
          user_id?: string
        }
      }
    }
  }
} 
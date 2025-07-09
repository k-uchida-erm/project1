import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StickyNote, Message } from '../types'

// スティッキーノート用のhook
export const useStickyNotes = () => {
  const [notes, setNotes] = useState<StickyNote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ノートを取得
  const fetchNotes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sticky_notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedNotes: StickyNote[] = data.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        x: note.x,
        y: note.y
      }))

      setNotes(formattedNotes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching notes')
    } finally {
      setLoading(false)
    }
  }

  // ノートを作成
  const createNote = async (note: Omit<StickyNote, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('sticky_notes')
        .insert([{
          title: note.title,
          content: note.content,
          x: note.x,
          y: note.y
        }])
        .select()

      if (error) throw error

      if (data && data[0]) {
        const newNote: StickyNote = {
          id: data[0].id,
          title: data[0].title,
          content: data[0].content,
          x: data[0].x,
          y: data[0].y
        }
        setNotes(prev => [newNote, ...prev])
        return newNote
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating note')
      throw err
    }
  }

  // ノートを更新
  const updateNote = async (id: string, updates: Partial<StickyNote>) => {
    try {
      const { error } = await supabase
        .from('sticky_notes')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      setNotes(prev => prev.map(note => 
        note.id === id ? { ...note, ...updates } : note
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating note')
      throw err
    }
  }

  // ノートを削除
  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sticky_notes')
        .delete()
        .eq('id', id)

      if (error) throw error

      setNotes(prev => prev.filter(note => note.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting note')
      throw err
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes
  }
}

// ドキュメント用のhook
export const useDocuments = () => {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ドキュメントを取得
  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching documents')
    } finally {
      setLoading(false)
    }
  }

  // ドキュメントを作成
  const createDocument = async (document: { title: string; content: string }) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([document])
        .select()

      if (error) throw error

      if (data && data[0]) {
        setDocuments(prev => [data[0], ...prev])
        return data[0]
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating document')
      throw err
    }
  }

  // ドキュメントを更新
  const updateDocument = async (id: string, updates: { title?: string; content?: string }) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, ...updates } : doc
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating document')
      throw err
    }
  }

  // ドキュメントを削除
  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (error) throw error

      setDocuments(prev => prev.filter(doc => doc.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting document')
      throw err
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return {
    documents,
    loading,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch: fetchDocuments
  }
} 
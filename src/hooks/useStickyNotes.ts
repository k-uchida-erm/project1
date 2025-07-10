import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import { StickyNote } from '../types';

export const useStickyNotes = () => {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<StickyNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, isSignedIn, isLoaded } = useAuth();

  // スティッキーノートを取得
  const fetchStickyNotes = async () => {
    try {
      setLoading(true);
      
      if (!isSignedIn || !userId) {
        console.log('User not authenticated');
        setStickyNotes([]);
        return;
      }

      const { data, error } = await supabase
        .from('sticky_notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      const formattedNotes: StickyNote[] = (data || []).map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        x: note.x,
        y: note.y,
        width: note.width || 160,
        height: note.height || 160,
        createdAt: new Date(note.created_at),
        updatedAt: new Date(note.updated_at)
      }));

      setStickyNotes(formattedNotes);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'データの取得に失敗しました';
      setError(errorMessage);
      console.error('Error fetching sticky notes:', err);
    } finally {
      setLoading(false);
    }
  };

  // スティッキーノートを作成
  const createStickyNote = async (note: Omit<StickyNote, 'id'>) => {
    try {
      if (!isSignedIn || !userId) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('sticky_notes')
        .insert([{
          title: note.title,
          content: note.content,
          x: note.x,
          y: note.y,
          width: note.width || 160,
          height: note.height || 160,
          user_id: userId
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase create error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from Supabase');
      }

      const newNote: StickyNote = {
        id: data.id,
        title: data.title,
        content: data.content,
        x: data.x,
        y: data.y,
        width: data.width || 160,
        height: data.height || 160,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setStickyNotes(prev => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ノートの作成に失敗しました';
      setError(errorMessage);
      console.error('Error creating sticky note:', err);
      throw err;
    }
  };

  // スティッキーノートを更新
  const updateStickyNote = async (id: string, updates: Partial<StickyNote>) => {
    try {
      if (!isSignedIn || !userId) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('sticky_notes')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      // ローカル状態を更新
      setStickyNotes(prev => prev.map(note => 
        note.id === id ? { ...note, ...updates } : note
      ));

      // selectedNoteも更新（モーダルが開いている場合）
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ノートの更新に失敗しました';
      setError(errorMessage);
      console.error('Error updating sticky note:', err);
      throw err;
    }
  };

  // スティッキーノートを削除
  const deleteStickyNote = async (id: string) => {
    try {
      if (!isSignedIn || !userId) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('sticky_notes')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }

      setStickyNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ノートの削除に失敗しました';
      setError(errorMessage);
      console.error('Error deleting sticky note:', err);
      throw err;
    }
  };

  const openNoteModal = (note: StickyNote) => {
    setSelectedNote(note);
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  const handleNoteAction = (action: string, noteId: string, callbacks: {
    onNavigateToChat: (note: StickyNote) => void;
    onNavigateToMindMap: (note: StickyNote) => void;
  }) => {
    const note = stickyNotes.find(n => n.id === noteId);
    if (!note) return;
    
    if (action === 'chat') {
      callbacks.onNavigateToChat(note);
      setSelectedNote(null); // Close modal if open
    } else if (action === 'mindmap') {
      callbacks.onNavigateToMindMap(note);
      setSelectedNote(null); // Close modal if open
    }
  };

  // ノートのサイズを変更
  const resizeStickyNote = async (id: string, width: number, height: number, x?: number, y?: number) => {
    try {
      const updates: Partial<StickyNote> = { width, height };
      if (typeof x === 'number') updates.x = x;
      if (typeof y === 'number') updates.y = y;
      await updateStickyNote(id, updates);
    } catch (err) {
      console.error('Error resizing sticky note:', err);
    }
  };

  // 認証状態の変化を監視
  useEffect(() => {
    if (isLoaded) {
      fetchStickyNotes();
    }
  }, [isLoaded, isSignedIn, userId]);

  return {
    stickyNotes,
    selectedNote,
    loading,
    error,
    createStickyNote,
    updateStickyNote,
    deleteStickyNote,
    resizeStickyNote,
    openNoteModal,
    closeModal,
    handleNoteAction,
    refetch: fetchStickyNotes
  };
}; 
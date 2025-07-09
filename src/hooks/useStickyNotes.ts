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
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedNotes: StickyNote[] = (data || []).map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        x: note.x,
        y: note.y
      }));

      setStickyNotes(formattedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
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
          y: note.y
        }])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from Supabase');

      const newNote: StickyNote = {
        id: data.id,
        title: data.title,
        content: data.content,
        x: data.x,
        y: data.y
      };

      setStickyNotes(prev => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ノートの作成に失敗しました');
      console.error('Error creating sticky note:', err);
      throw err;
    }
  };

  // スティッキーノートを更新
  const updateStickyNote = async (id: string, updates: Partial<StickyNote>) => {
    try {
      const { error } = await supabase
        .from('sticky_notes')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setStickyNotes(prev => prev.map(note => 
        note.id === id ? { ...note, ...updates } : note
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ノートの更新に失敗しました');
      console.error('Error updating sticky note:', err);
      throw err;
    }
  };

  // スティッキーノートを削除
  const deleteStickyNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sticky_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setStickyNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ノートの削除に失敗しました');
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
    openNoteModal,
    closeModal,
    handleNoteAction,
    refetch: fetchStickyNotes
  };
}; 
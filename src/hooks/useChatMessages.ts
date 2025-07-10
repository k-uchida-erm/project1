import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import { Message } from '../types';

export const useChatMessages = (noteId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, isSignedIn } = useAuth();

  // チャットメッセージを取得
  const fetchMessages = async () => {
    if (!noteId || !isSignedIn || !userId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching chat messages for note:', noteId, 'user:', userId);

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('note_id', noteId)
        .eq('user_id', userId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched chat messages:', data);

      const formattedMessages: Message[] = (data || []).map(msg => ({
        id: msg.id,
        content: msg.content,
        isUser: msg.is_user,
        timestamp: new Date(msg.timestamp)
      }));

      setMessages(formattedMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'チャット履歴の取得に失敗しました';
      setError(errorMessage);
      console.error('Error fetching chat messages:', err);
    } finally {
      setLoading(false);
    }
  };

  // チャットメッセージを保存
  const saveMessage = async (message: Omit<Message, 'id'>) => {
    if (!noteId || !isSignedIn || !userId) {
      throw new Error('User not authenticated or note not selected');
    }

    try {
      console.log('Saving chat message:', message);

      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          content: message.content,
          is_user: message.isUser,
          timestamp: message.timestamp.toISOString(),
          note_id: noteId,
          user_id: userId
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase save error:', error);
        throw error;
      }

      console.log('Saved message data:', data);

      const savedMessage: Message = {
        id: data.id,
        content: data.content,
        isUser: data.is_user,
        timestamp: new Date(data.timestamp)
      };

      setMessages(prev => [...prev, savedMessage]);
      return savedMessage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'メッセージの保存に失敗しました';
      setError(errorMessage);
      console.error('Error saving chat message:', err);
      throw err;
    }
  };

  // メッセージをクリア（ローカルステートのみ）
  const clearMessages = () => {
    setMessages([]);
  };

  // チャット履歴を削除（データベースから）
  const deleteMessagesForNote = async () => {
    if (!noteId || !isSignedIn || !userId) {
      throw new Error('User not authenticated or note not selected');
    }

    try {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('note_id', noteId)
        .eq('user_id', userId);

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }

      setMessages([]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'チャット履歴の削除に失敗しました';
      setError(errorMessage);
      console.error('Error deleting chat messages:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [noteId, userId, isSignedIn]);

  return {
    messages,
    loading,
    error,
    saveMessage,
    clearMessages,
    deleteMessagesForNote,
    refetch: fetchMessages
  };
}; 
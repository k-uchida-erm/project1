import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Document } from '../types';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ドキュメントを取得
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formattedDocuments: Document[] = (data || []).map(doc => ({
        id: doc.id,
        title: doc.title,
        content: doc.content,
        createdAt: new Date(doc.created_at),
        updatedAt: new Date(doc.updated_at)
      }));

      setDocuments(formattedDocuments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ドキュメントの取得に失敗しました');
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  // ドキュメントを作成
  const createDocument = async (document: { title: string; content: string }) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([document])
        .select()
        .single();

      if (error) throw error;

      const newDocument: Document = {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setDocuments(prev => [newDocument, ...prev]);
      return newDocument;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ドキュメントの作成に失敗しました');
      console.error('Error creating document:', err);
      throw err;
    }
  };

  // ドキュメントを更新
  const updateDocument = async (id: string, updates: { title?: string; content?: string }) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, ...updates, updatedAt: new Date() } : doc
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ドキュメントの更新に失敗しました');
      console.error('Error updating document:', err);
      throw err;
    }
  };

  // ドキュメントを削除
  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ドキュメントの削除に失敗しました');
      console.error('Error deleting document:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch: fetchDocuments
  };
}; 
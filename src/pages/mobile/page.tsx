import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/clerk-react';
import { Plus, MessageSquare, Brain, FileText } from 'lucide-react';
import { StickyNote } from '../../types';
import LandingPage from '../../components/LandingPage';

interface MobilePageProps {
  onNavigateToChat: (note: StickyNote) => void;
  onNavigateToDocuments: () => void;
  onNavigateToMindMap: (note: StickyNote) => void;
}

const MobilePage: React.FC<MobilePageProps> = ({ onNavigateToChat, onNavigateToDocuments, onNavigateToMindMap }) => {
  const { isLoaded } = useAuth();
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const createStickyNote = () => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: 'Tap to edit...',
      x: 0,
      y: 0
    };
    setStickyNotes(prev => [...prev, newNote]);
    setEditingNote(newNote.id);
  };

  const updateStickyNote = (id: string, updates: Partial<StickyNote>) => {
    setStickyNotes(prev => 
      prev.map(note => note.id === id ? { ...note, ...updates } : note)
    );
  };

  const deleteNote = (id: string) => {
    setStickyNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleNoteAction = (action: string, note: StickyNote) => {
    if (action === 'chat') {
      onNavigateToChat(note);
    } else if (action === 'mindmap') {
      onNavigateToMindMap(note);
    }
  };

  // 認証がロードされていない場合の表示
  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-slate-100">
        <div className="text-lg text-slate-800 font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-10">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <button
                    onClick={onNavigateToDocuments}
                    className="p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 transition-all duration-200"
                    title="Documents"
                  >
                    <FileText size={20} className="text-slate-600" />
                  </button>
                  <button
                    onClick={createStickyNote}
                    className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    title="Add Note"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6">
            {stickyNotes.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare size={32} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-slate-700 mb-2">
                  Welcome to your Dashboard
                </h2>
                <p className="text-slate-500 mb-6 max-w-xs">
                  Create your first note to get started with organizing your thoughts
                </p>
                <button
                  onClick={createStickyNote}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Create Note
                </button>
              </div>
            ) : (
              /* Notes List */
              <div className="space-y-4">
                {stickyNotes.map(note => (
                  <div
                    key={note.id}
                    className="bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {editingNote === note.id ? (
                      /* Edit Mode */
                      <div className="p-4">
                        <input
                          type="text"
                          value={note.title}
                          onChange={(e) => updateStickyNote(note.id, { title: e.target.value })}
                          className="w-full text-lg font-semibold bg-transparent border-none outline-none text-slate-800 mb-3"
                          placeholder="Note title..."
                        />
                        <textarea
                          value={note.content}
                          onChange={(e) => updateStickyNote(note.id, { content: e.target.value })}
                          className="w-full bg-transparent border-none outline-none text-slate-600 resize-none"
                          placeholder="Write your note..."
                          rows={3}
                        />
                        <div className="flex justify-end mt-3">
                          <button
                            onClick={() => setEditingNote(null)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => setEditingNote(note.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-800 flex-1">
                            {note.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {note.content}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNoteAction('chat', note);
                            }}
                            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 rounded-lg transition-all duration-200"
                          >
                            <MessageSquare size={16} />
                            <span className="text-sm font-medium">Chat</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNoteAction('mindmap', note);
                            }}
                            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-600 rounded-lg transition-all duration-200"
                          >
                            <Brain size={16} />
                            <span className="text-sm font-medium">Mind Map</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Floating Action Button (Alternative) */}
          {stickyNotes.length > 0 && (
            <button
              onClick={createStickyNote}
              className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-20"
            >
              <Plus size={24} />
            </button>
          )}
        </div>
      </SignedIn>
    </>
  );
};

export default MobilePage; 
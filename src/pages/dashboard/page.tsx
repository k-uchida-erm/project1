import React, { useState, useRef, useEffect } from 'react';
import { Brain, MessageSquare, X } from 'lucide-react';
import PageLayout from '../../components/layouts/PageLayout';
import { StickyNote } from '../../types';

interface DashboardPageProps {
  onNavigateToChat: (note: StickyNote) => void;
  onNavigateToDocuments: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface ContextMenu {
  visible: boolean;
  x: number;
  y: number;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateToChat, onNavigateToDocuments }) => {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<StickyNote | null>(null);
  const [draggedNote, setDraggedNote] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenu>({ visible: false, x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const createStickyNote = (x: number, y: number) => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: 'Click to edit...',
      x,
      y
    };
    setStickyNotes(prev => [...prev, newNote]);
  };

  const updateStickyNote = (id: string, updates: Partial<StickyNote>) => {
    setStickyNotes(prev => 
      prev.map(note => note.id === id ? { ...note, ...updates } : note)
    );
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // 左クリックではメモを作成しない、コンテキストメニューを閉じるのみ
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleCanvasContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.target === canvasRef.current) {
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleCreateMemo = () => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // コンテキストメニューの位置を基準にメモを作成
    const x = contextMenu.x - rect.left - 80; // Account for sticky note width/2
    const y = contextMenu.y - rect.top - 80; // Account for sticky note height/2
    createStickyNote(Math.max(0, x), Math.max(0, y));
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent, noteId: string) => {
    if ((e.target as HTMLElement).closest('.action-bar')) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const note = stickyNotes.find(n => n.id === noteId);
    if (!note) return;
    
    setDraggedNote(noteId);
    setDragOffset({
      x: e.clientX - rect.left - note.x,
      y: e.clientY - rect.top - note.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNote || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    updateStickyNote(draggedNote, {
      x: Math.max(0, Math.min(x, rect.width - 160)),
      y: Math.max(0, Math.min(y, rect.height - 160))
    });
  };

  const handleMouseUp = () => {
    setDraggedNote(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const openNoteModal = (note: StickyNote) => {
    setSelectedNote(note);
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  const handleNoteAction = (action: string, noteId: string) => {
    const note = stickyNotes.find(n => n.id === noteId);
    if (!note) return;
    
    if (action === 'chat') {
      onNavigateToChat(note);
      setSelectedNote(null); // Close modal if open
    } else if (action === 'mindmap') {
      console.log(`Mind map clicked for note ${noteId}`);
      // Placeholder for future functionality
    }
  };

  const handleClose = () => {
    // ダッシュボードではcloseボタンは何もしない（または別のアクションを定義）
    console.log('Dashboard close clicked');
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalClick = () => setContextMenu({ visible: false, x: 0, y: 0 });
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <PageLayout
      title="Dashboard"
      onClose={handleClose}
      sidebarExpanded={sidebarExpanded}
      onSidebarMouseEnter={() => setSidebarExpanded(true)}
      onSidebarMouseLeave={() => setSidebarExpanded(false)}
      onNavigateToDashboard={() => {}} // Already on dashboard
      onNavigateToDocuments={onNavigateToDocuments}
      showCloseButton={false}
    >
      <div 
        ref={canvasRef}
        className="w-full h-full relative overflow-hidden cursor-pointer"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.04) 1.5px, transparent 1.5px)`,
          backgroundSize: '18px 18px'
        }}
        onClick={handleCanvasClick}
        onContextMenu={handleCanvasContextMenu}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Sticky Notes */}
        {stickyNotes.map(note => (
          <div
            key={note.id}
            className="absolute w-40 h-40 bg-white/90 backdrop-blur-sm cursor-move group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 hover:border-slate-300/70 transform hover:scale-105"
            style={{
              left: note.x,
              top: note.y,
              userSelect: 'none',
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
            onClick={(e) => {
              e.stopPropagation();
              if (!(e.target as HTMLElement).closest('.action-bar') && 
                  !(e.target as HTMLElement).closest('.delete-button')) {
                openNoteModal(note);
              }
            }}
          >
            {/* Delete Button - Top Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStickyNotes(prev => prev.filter(n => n.id !== note.id));
              }}
              className="delete-button absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center shadow-lg"
              title="Delete note"
            >
              <X size={12} strokeWidth={2} />
            </button>

            <div className="p-3 h-full flex flex-col">
              <h3 className="font-semibold text-slate-800 text-sm mb-2 truncate">{note.title}</h3>
              <p className="text-slate-700 text-xs flex-1 overflow-hidden">{note.content}</p>
            </div>
            
            {/* Action Bar */}
            <div className="action-bar absolute bottom-0 left-0 right-0 h-12 bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex items-center justify-center space-x-4 rounded-b-xl border-t border-slate-200/50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNoteAction('mindmap', note.id);
                }}
                className="w-8 h-8 rounded-full border border-slate-300/70 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200/50 transition-all duration-200 flex items-center justify-center"
                title="Mind Map"
              >
                <Brain size={14} strokeWidth={1.5} className="text-slate-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNoteAction('chat', note.id);
                }}
                className="w-8 h-8 rounded-full border border-slate-300/70 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200/50 transition-all duration-200 flex items-center justify-center"
                title="Open Chat"
              >
                <MessageSquare size={14} strokeWidth={1.5} className="text-slate-700" />
              </button>
            </div>
          </div>
        ))}

        {/* Context Menu */}
        {contextMenu.visible && (
          <div
            className="fixed bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-xl py-2 z-50"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
              minWidth: '140px'
            }}
          >
            <button
              onClick={handleCreateMemo}
              className="w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/60 transition-all duration-200 rounded-lg mx-1"
              style={{ width: 'calc(100% - 8px)' }}
            >
              New Memo
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl w-115 h-80 relative shadow-2xl border border-slate-200/50">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100/60 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200/50"
            >
              <X size={16} strokeWidth={1.5} className="text-slate-700" />
            </button>

            {/* Content */}
            <div className="p-6 h-full flex flex-col">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateStickyNote(selectedNote.id, { title: e.target.value })}
                className="text-lg font-bold mb-4 bg-transparent border-none outline-none text-slate-800 placeholder-slate-500"
                placeholder="Note title..."
              />
              <textarea
                value={selectedNote.content}
                onChange={(e) => updateStickyNote(selectedNote.id, { content: e.target.value })}
                className="flex-1 bg-transparent border-none outline-none resize-none text-slate-700 placeholder-slate-500"
                placeholder="Write your note here..."
              />
              
              {/* Action Bar */}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => handleNoteAction('mindmap', selectedNote.id)}
                  className="w-10 h-10 rounded-xl border border-slate-300/70 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200/50 transition-all duration-200 flex items-center justify-center"
                  title="Mind Map"
                >
                  <Brain size={18} strokeWidth={1.5} className="text-slate-700" />
                </button>
                <button
                  onClick={() => handleNoteAction('chat', selectedNote.id)}
                  className="w-10 h-10 rounded-xl border border-slate-300/70 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200/50 transition-all duration-200 flex items-center justify-center"
                  title="Open Chat"
                >
                  <MessageSquare size={18} strokeWidth={1.5} className="text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default DashboardPage; 
import React, { useEffect, useRef } from 'react';
import { Brain, MessageSquare, X } from 'lucide-react';
import { StickyNote } from '../../types';
import StickyNoteActionButton from '../atoms/StickyNoteActionButton';

interface StickyNoteModalProps {
  note: StickyNote;
  onClose: () => void;
  onUpdateNote: (updates: Partial<StickyNote>) => void;
  onMindMapClick: () => void;
  onChatClick: () => void;
}

const StickyNoteModal: React.FC<StickyNoteModalProps> = ({
  note,
  onClose,
  onUpdateNote,
  onMindMapClick,
  onChatClick
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // モーダルが開いたときにタイトル入力フィールドにフォーカス
    if (titleInputRef.current) {
      titleInputRef.current.focus();
      // タイトルが空の場合は、コンテンツが空でない場合のみタイトルにフォーカス
      // 両方空の場合は新規作成なので確実にタイトルにフォーカス
      if (!note.title || (!note.title && !note.content)) {
        titleInputRef.current.select();
      }
    }
  }, [note.title, note.content]);

  return (
    <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl w-115 h-80 relative shadow-2xl border border-slate-200/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100/60 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200/50"
        >
          <X size={16} strokeWidth={1.5} className="text-slate-700" />
        </button>

        {/* Content */}
        <div className="p-6 h-full flex flex-col">
          <input
            ref={titleInputRef}
            type="text"
            value={note.title}
            onChange={(e) => onUpdateNote({ title: e.target.value })}
            className="text-lg font-bold mb-4 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
            placeholder="Enter title..."
          />
          <textarea
            value={note.content}
            onChange={(e) => onUpdateNote({ content: e.target.value })}
            className="flex-1 bg-transparent border-none outline-none resize-none text-slate-700 placeholder-slate-400"
            placeholder="Start writing here..."
          />
          
          {/* Action Bar */}
          <div className="flex justify-end space-x-4 mt-4">
            <StickyNoteActionButton
              icon={Brain}
              onClick={onMindMapClick}
              title="Mind Map"
              className="w-10 h-10 rounded-xl border border-slate-300/70 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200/50 transition-all duration-200 flex items-center justify-center"
              size={18}
            />
            <StickyNoteActionButton
              icon={MessageSquare}
              onClick={onChatClick}
              title="Open Chat"
              className="w-10 h-10 rounded-xl border border-slate-300/70 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200/50 transition-all duration-200 flex items-center justify-center"
              size={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNoteModal; 
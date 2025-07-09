import React from 'react';
import { StickyNote } from '../../types';
import StickyNoteDeleteButton from '../atoms/StickyNoteDeleteButton';
import StickyNoteActionBar from './StickyNoteActionBar';

interface StickyNoteCardProps {
  note: StickyNote;
  isDragged: boolean;
  hasDragged: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onDelete: () => void;
  onMindMapClick: () => void;
  onChatClick: () => void;
}

const StickyNoteCard: React.FC<StickyNoteCardProps> = ({
  note,
  isDragged,
  hasDragged,
  onMouseDown,
  onClick,
  onDelete,
  onMindMapClick,
  onChatClick
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // ドラッグ操作の場合はクリックイベントを無視
    if (hasDragged) {
      return;
    }
    
    if (!(e.target as HTMLElement).closest('.action-bar') && 
        !(e.target as HTMLElement).closest('.delete-button')) {
      onClick();
    }
  };

  return (
    <div
      data-note-id={note.id}
      className={`absolute w-40 h-40 bg-white/90 backdrop-blur-sm cursor-move group rounded-xl shadow-lg border border-slate-200/50 ${
        isDragged 
          ? 'hover:shadow-2xl' 
          : 'hover:shadow-xl transition-all duration-300 hover:border-slate-300/70 transform hover:scale-105'
      }`}
      style={{
        left: note.x,
        top: note.y,
        userSelect: 'none',
      }}
      onMouseDown={onMouseDown}
      onClick={handleClick}
    >
      <StickyNoteDeleteButton onDelete={onDelete} />

      <div className="p-3 h-full flex flex-col">
        <h3 className="font-semibold text-slate-800 text-sm mb-2 truncate">{note.title}</h3>
        <p className="text-slate-700 text-xs flex-1 overflow-hidden">{note.content}</p>
      </div>
      
      <StickyNoteActionBar
        onMindMapClick={onMindMapClick}
        onChatClick={onChatClick}
      />
    </div>
  );
};

export default StickyNoteCard; 
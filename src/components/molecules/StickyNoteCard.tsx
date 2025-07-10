import React, { useState, useRef, useCallback } from 'react';
import { StickyNoteCardProps } from '../../types/components';
import StickyNoteDeleteButton from '../atoms/StickyNoteDeleteButton';
import StickyNoteActionBar from './StickyNoteActionBar';

const StickyNoteCard: React.FC<StickyNoteCardProps> = ({
  note,
  isDragged,
  hasDragged,
  onMouseDown,
  onClick,
  onDelete,
  onMindMapClick,
  onChatClick,
  onResize,
  onResizeComplete
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    edge?: 'top' | 'bottom' | 'left' | 'right'; // リサイズの方向を追加
  } | null>(null);
  const lastResize = useRef({ width: note.width || 160, height: note.height || 160, x: note.x, y: note.y });

  // デフォルトサイズを設定
  const width = note.width || 160; // デフォルト幅（40 * 4）
  const height = note.height || 160; // デフォルト高さ（40 * 4）
  const minWidth = 120;
  const minHeight = 120;
  const maxWidth = 300;
  const maxHeight = 300;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // ドラッグ操作またはリサイズ操作の場合はクリックイベントを無視
    if (hasDragged || isResizing) {
      return;
    }
    
    if (!(e.target as HTMLElement).closest('.action-bar') && 
        !(e.target as HTMLElement).closest('.delete-button') &&
        !(e.target as HTMLElement).closest('.resize-handle')) {
      onClick();
    }
  };

  // どの辺かを指定してリサイズ開始
  const handleResizeStart = useCallback((e: React.MouseEvent, edge: 'top' | 'bottom' | 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: width,
      startHeight: height,
      edge,
    } as any;

    const handleResizeMove = (e: MouseEvent) => {
      if (!resizeRef.current || !onResize) return;
      const { startX, startY, startWidth, startHeight, edge } = resizeRef.current as any;
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = note.x;
      let newY = note.y;
      if (edge === 'right') {
        const deltaX = e.clientX - startX;
        newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
      } else if (edge === 'left') {
        const deltaX = e.clientX - startX;
        newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
        newX = note.x + (startWidth - newWidth);
      } else if (edge === 'bottom') {
        const deltaY = e.clientY - startY;
        newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
      } else if (edge === 'top') {
        const deltaY = e.clientY - startY;
        newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
        newY = note.y + (startHeight - newHeight);
      }
      lastResize.current = { width: newWidth, height: newHeight, x: newX, y: newY };
      onResize(note.id, newWidth, newHeight, newX, newY);
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      resizeRef.current = null;
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      if (onResizeComplete) {
        const { width, height, x, y } = lastResize.current;
        onResizeComplete(note.id, width, height, x, y);
      }
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [note.id, width, height, onResize, onResizeComplete]);

  return (
    <div
      data-note-id={note.id}
      className={`absolute bg-white/90 backdrop-blur-sm cursor-move group rounded-xl shadow-lg border border-slate-200/50 select-none ${
        isDragged || isResizing
          ? 'hover:shadow-2xl' 
          : 'hover:shadow-xl transition-all duration-300 hover:border-slate-300/70 transform hover:scale-105'
      }`}
      style={{
        left: note.x,
        top: note.y,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseDown={onMouseDown}
      onClick={handleClick}
    >
      <StickyNoteDeleteButton onDelete={onDelete} />

      <div className="p-3 h-full flex flex-col">
        {/* AIが生成したタイトルを表示（文字サイズを調整） */}
        <h3 className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2 leading-tight">
          {note.title || <span className="text-slate-400 italic font-normal">メモ</span>}
        </h3>
        {/* 本文を小さい文字でグレーで表示 */}
        <p className="text-slate-500 text-xs flex-1 overflow-hidden leading-relaxed" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: Math.floor((height - 80) / 16), // 動的に行数を計算
          WebkitBoxOrient: 'vertical'
        }}>
          {note.content || <span className="text-slate-400 italic">内容を入力してください...</span>}
        </p>
      </div>
      
      <StickyNoteActionBar
        onMindMapClick={onMindMapClick}
        onChatClick={onChatClick}
      />

      {/* 辺ごとのリサイズハンドル */}
      {/* 上 */}
      <div
        className="absolute top-0 left-2 right-2 h-2 cursor-ns-resize z-10 opacity-0"
        onMouseDown={e => handleResizeStart(e, 'top')}
      />
      {/* 下 */}
      <div
        className="absolute bottom-0 left-2 right-2 h-2 cursor-ns-resize z-10 opacity-0"
        onMouseDown={e => handleResizeStart(e, 'bottom')}
      />
      {/* 左 */}
      <div
        className="absolute top-2 bottom-2 left-0 w-2 cursor-ew-resize z-10 opacity-0"
        onMouseDown={e => handleResizeStart(e, 'left')}
      />
      {/* 右 */}
      <div
        className="absolute top-2 bottom-2 right-0 w-2 cursor-ew-resize z-10 opacity-0"
        onMouseDown={e => handleResizeStart(e, 'right')}
      />
    </div>
  );
};

export default StickyNoteCard; 
import { useState, useRef, useEffect } from 'react';
import { Position, StickyNote } from '../types';

interface UseDragAndDropProps {
  stickyNotes: StickyNote[];
  updateStickyNote: (id: string, updates: Partial<StickyNote>) => void;
}

export const useDragAndDrop = ({ stickyNotes, updateStickyNote }: UseDragAndDropProps) => {
  const [draggedNote, setDraggedNote] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [dragStartPosition, setDragStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, noteId: string) => {
    if ((e.target as HTMLElement).closest('.action-bar')) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const note = stickyNotes.find(n => n.id === noteId);
    if (!note) return;
    
    const noteElement = e.currentTarget as HTMLElement;
    
    setDraggedNote(noteId);
    setDragStartPosition({ x: e.clientX, y: e.clientY });
    setHasDragged(false);
    setDragOffset({
      x: e.clientX - rect.left - note.x,
      y: e.clientY - rect.top - note.y
    });

    // ドラッグ中はCSSトランジションを無効化
    noteElement.style.transition = 'none';
    noteElement.style.transform = 'scale(1.05)';
    noteElement.style.zIndex = '1000';
    
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNote || !canvasRef.current) return;
    
    // ドラッグ距離を計算
    const dragDistance = Math.sqrt(
      Math.pow(e.clientX - dragStartPosition.x, 2) + 
      Math.pow(e.clientY - dragStartPosition.y, 2)
    );
    
    // 5px以上移動したらドラッグとみなす
    if (dragDistance > 5) {
      setHasDragged(true);
    }
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, rect.width - 160));
    const y = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.y, rect.height - 160));
    
    // 直接DOM操作でスムーズな移動
    const noteElement = document.querySelector(`[data-note-id="${draggedNote}"]`) as HTMLElement;
    if (noteElement) {
      noteElement.style.left = `${x}px`;
      noteElement.style.top = `${y}px`;
    }
  };

  const handleMouseUp = () => {
    if (draggedNote && canvasRef.current) {
      const noteElement = document.querySelector(`[data-note-id="${draggedNote}"]`) as HTMLElement;
      if (noteElement) {
        const rect = canvasRef.current.getBoundingClientRect();
        const finalX = parseInt(noteElement.style.left);
        const finalY = parseInt(noteElement.style.top);
        
        // React状態を最終位置で更新
        updateStickyNote(draggedNote, { x: finalX, y: finalY });
        
        // CSSトランジションを復元
        noteElement.style.transition = '';
        noteElement.style.transform = '';
        noteElement.style.zIndex = '';
      }
    }
    
    setDraggedNote(null);
    setDragOffset({ x: 0, y: 0 });
    setDragStartPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!draggedNote || !canvasRef.current) return;
      
      // ドラッグ距離を計算
      const dragDistance = Math.sqrt(
        Math.pow(e.clientX - dragStartPosition.x, 2) + 
        Math.pow(e.clientY - dragStartPosition.y, 2)
      );
      
      // 5px以上移動したらドラッグとみなす
      if (dragDistance > 5) {
        setHasDragged(true);
      }
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, rect.width - 160));
      const y = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.y, rect.height - 160));
      
      const noteElement = document.querySelector(`[data-note-id="${draggedNote}"]`) as HTMLElement;
      if (noteElement) {
        noteElement.style.left = `${x}px`;
        noteElement.style.top = `${y}px`;
      }
    };

    const handleGlobalMouseUp = () => handleMouseUp();
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedNote, dragOffset, dragStartPosition]);

  return {
    draggedNote,
    hasDragged,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setHasDragged
  };
}; 
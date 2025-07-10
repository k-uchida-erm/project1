import { useState, useEffect } from 'react';
import { ContextMenu, StickyNote } from '../types';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenu>({ visible: false, x: 0, y: 0 });

  const handleCanvasClick = (e: React.MouseEvent) => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleCanvasContextMenu = (e: React.MouseEvent, canvasRef: React.RefObject<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target === canvasRef.current) {
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleCreateMemo = async (
    canvasRef: React.RefObject<HTMLDivElement>, 
    createStickyNote: (note: Omit<StickyNote, 'id'>) => Promise<StickyNote>
  ): Promise<StickyNote | null> => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const x = contextMenu.x - rect.left - 80;
    const y = contextMenu.y - rect.top - 80;
    
    try {
      const newNote = await createStickyNote({
        title: 'New Note',
        content: '',
        x: Math.max(0, Math.round(x)),
        y: Math.max(0, Math.round(y))
      });
      setContextMenu({ visible: false, x: 0, y: 0 });
      return newNote;
    } catch (error) {
      console.error('Failed to create sticky note:', error);
      return null;
    }
  };

  useEffect(() => {
    const handleGlobalClick = () => setContextMenu({ visible: false, x: 0, y: 0 });
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return {
    contextMenu,
    handleCanvasClick,
    handleCanvasContextMenu,
    handleCreateMemo
  };
}; 
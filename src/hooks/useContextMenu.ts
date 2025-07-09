import { useState, useEffect } from 'react';
import { ContextMenu, StickyNote } from '../types';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenu>({ visible: false, x: 0, y: 0 });

  const handleCanvasClick = (e: React.MouseEvent) => {
    // 左クリックではメモを作成しない、コンテキストメニューを閉じるのみ
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

  const handleCreateMemo = async (canvasRef: React.RefObject<HTMLDivElement>, createStickyNote: (note: Omit<StickyNote, 'id'>) => Promise<StickyNote>) => {
    console.log('handleCreateMemo called');
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) {
      console.log('Canvas ref not found');
      return;
    }

    // コンテキストメニューの位置を基準にメモを作成
    const x = contextMenu.x - rect.left - 80; // Account for sticky note width/2
    const y = contextMenu.y - rect.top - 80; // Account for sticky note height/2
    
    const noteToCreate = {
      title: 'New Memo',
      content: 'Click to edit...',
      x: Math.max(0, x),
      y: Math.max(0, y)
    };
    
    console.log('Creating note with data:', noteToCreate);
    
    try {
      const createdNote = await createStickyNote(noteToCreate);
      console.log('Note creation successful:', createdNote);
      setContextMenu({ visible: false, x: 0, y: 0 });
    } catch (error) {
      console.error('Failed to create sticky note:', error);
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
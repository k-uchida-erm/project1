import React from 'react';
import StickyNoteCard from '../molecules/StickyNoteCard';
import DashboardContextMenu from '../molecules/DashboardContextMenu';
import { DashboardMainPanelProps } from '../../types/components';

const DashboardMainPanel: React.FC<DashboardMainPanelProps> = ({
  stickyNotes,
  draggedNote,
  hasDragged,
  canvasRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  setHasDragged,
  openNoteModal,
  deleteStickyNote,
  onMindMapClick,
  onChatClick,
  onResize,
  onResizeComplete,
  contextMenu,
  handleCanvasClick,
  handleCanvasContextMenu,
  handleCreateMemoWithModal,
}) => {
  return (
    <div 
      ref={canvasRef}
      className="w-full h-full relative overflow-hidden cursor-pointer"
      onClick={handleCanvasClick}
      onContextMenu={(e) => handleCanvasContextMenu(e, canvasRef)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Sticky Notes */}
      {stickyNotes.map(note => (
        <StickyNoteCard
          key={note.id}
          note={note}
          isDragged={draggedNote === note.id}
          hasDragged={hasDragged}
          onMouseDown={(e) => handleMouseDown(e, note.id)}
          onClick={() => {
            if (!hasDragged) {
              openNoteModal(note);
            }
            setHasDragged(false);
          }}
          onDelete={() => deleteStickyNote(note.id)}
          onMindMapClick={() => onMindMapClick(note.id)}
          onChatClick={() => onChatClick(note.id)}
          onResize={onResize}
          onResizeComplete={onResizeComplete}
        />
      ))}
      {/* Context Menu */}
      <DashboardContextMenu
        contextMenu={contextMenu}
        onCreateMemo={handleCreateMemoWithModal}
      />
    </div>
  );
};

export default DashboardMainPanel; 
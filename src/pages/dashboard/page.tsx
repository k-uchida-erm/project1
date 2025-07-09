import React from 'react';
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/clerk-react';
import PageLayout from '../../components/layouts/PageLayout';
import StickyNoteCard from '../../components/molecules/StickyNoteCard';
import StickyNoteModal from '../../components/molecules/StickyNoteModal';
import DashboardContextMenu from '../../components/molecules/DashboardContextMenu';
import LandingPage from '../../components/LandingPage';
import { DashboardPageProps } from '../../types/pages';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useStickyNotes } from '../../hooks/useStickyNotes';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useDashboardSidebar } from '../../hooks/useDashboardSidebar';

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateToChat, onNavigateToDocuments, onNavigateToMindMap }) => {
  const { isLoaded } = useAuth();

  const {
    stickyNotes,
    selectedNote,
    createStickyNote,
    updateStickyNote,
    deleteStickyNote,
    openNoteModal,
    closeModal,
    handleNoteAction
  } = useStickyNotes();

  const {
    draggedNote,
    hasDragged,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setHasDragged
  } = useDragAndDrop({ stickyNotes, updateStickyNote });

  const {
    contextMenu,
    handleCanvasClick,
    handleCanvasContextMenu,
    handleCreateMemo
  } = useContextMenu();

  const {
    sidebarExpanded,
    handleSidebarMouseEnter,
    handleSidebarMouseLeave,
    handleClose
  } = useDashboardSidebar();

  const handleNoteActionWithCallbacks = (action: string, noteId: string) => {
    handleNoteAction(action, noteId, {
      onNavigateToChat,
      onNavigateToMindMap
    });
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
        <PageLayout
          title="Dashboard"
          onClose={handleClose}
          sidebarExpanded={sidebarExpanded}
          onSidebarMouseEnter={handleSidebarMouseEnter}
          onSidebarMouseLeave={handleSidebarMouseLeave}
          onNavigateToDashboard={() => window.location.reload()}
          onNavigateToDocuments={onNavigateToDocuments}
          showCloseButton={false}
          isDashboard={true}
        >
          <div className="absolute top-4 right-4 z-50">
            <UserButton />
          </div>
          
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
                onMindMapClick={() => handleNoteActionWithCallbacks('mindmap', note.id)}
                onChatClick={() => handleNoteActionWithCallbacks('chat', note.id)}
              />
            ))}

            {/* Context Menu */}
            <DashboardContextMenu
              contextMenu={contextMenu}
              onCreateMemo={() => handleCreateMemo(canvasRef, createStickyNote)}
            />
          </div>

          {/* Modal */}
          {selectedNote && (
            <StickyNoteModal
              note={selectedNote}
              onClose={closeModal}
              onUpdateNote={(updates) => updateStickyNote(selectedNote.id, updates)}
              onMindMapClick={() => handleNoteActionWithCallbacks('mindmap', selectedNote.id)}
              onChatClick={() => handleNoteActionWithCallbacks('chat', selectedNote.id)}
            />
          )}
        </PageLayout>
      </SignedIn>
    </>
  );
};

export default DashboardPage; 
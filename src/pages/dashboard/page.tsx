import React from 'react';
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/clerk-react';
import PageLayout from '../../components/layouts/PageLayout';
import StickyNoteModal from '../../components/molecules/StickyNoteModal';
import LandingPage from '../../components/LandingPage';
import { DashboardPageProps } from '../../types/pages';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useStickyNotes } from '../../hooks/useStickyNotes';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useDashboardSidebar } from '../../hooks/useDashboardSidebar';
import DashboardMainPanel from '../../components/organisms/DashboardMainPanel';

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateToChat, onNavigateToDocuments, onNavigateToMindMap }) => {
  const { isLoaded } = useAuth();

  const {
    stickyNotes,
    selectedNote,
    createStickyNote,
    updateStickyNote,
    deleteStickyNote,
    resizeStickyNote,
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

  const handleCreateMemoWithModal = async () => {
    try {
      const newNote = await handleCreateMemo(canvasRef, createStickyNote);
      if (newNote) {
        openNoteModal(newNote);
      }
    } catch (error) {
      console.error('Failed to create memo:', error);
    }
  };

  // StickyNoteのローカルstateのみ更新（DB反映しない）
  const updateStickyNoteLocal = (id: string, width: number, height: number, x?: number, y?: number) => {
    updateStickyNote(id, { width, height, ...(typeof x === 'number' ? { x } : {}), ...(typeof y === 'number' ? { y } : {}) });
  };

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
          <DashboardMainPanel
            stickyNotes={stickyNotes}
            draggedNote={draggedNote}
            hasDragged={hasDragged}
            canvasRef={canvasRef}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            setHasDragged={setHasDragged}
            openNoteModal={openNoteModal}
            deleteStickyNote={deleteStickyNote}
            onMindMapClick={(id) => handleNoteActionWithCallbacks('mindmap', id)}
            onChatClick={(id) => handleNoteActionWithCallbacks('chat', id)}
            onResize={updateStickyNoteLocal}
            onResizeComplete={resizeStickyNote}
            contextMenu={contextMenu}
            handleCanvasClick={handleCanvasClick}
            handleCanvasContextMenu={handleCanvasContextMenu}
            handleCreateMemoWithModal={handleCreateMemoWithModal}
          />
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
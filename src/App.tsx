import React, { useState } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import './App.css';
import DashboardPage from './pages/dashboard';
import ChatPage from './pages/chat';
import PreviewPage from './pages/preview';
import DocumentsPage from './pages/documents';
import MindMapPage from './pages/mindmap/page';
import MobilePage from './pages/mobile';
import MobileChatPage from './pages/mobile/chat';
import MobilePreviewPage from './pages/mobile/preview';
import useDevice from './hooks/useDevice';
import { StickyNote } from './types';
import { GeneratedSpecification } from './types/pages';

type PageView = 'dashboard' | 'chat' | 'preview' | 'documents' | 'mindmap';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [previousPage, setPreviousPage] = useState<PageView>('dashboard');
  const [selectedNoteForChat, setSelectedNoteForChat] = useState<StickyNote | null>(null);
  const [selectedNoteForMindMap, setSelectedNoteForMindMap] = useState<StickyNote | null>(null);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const [generatedSpecification, setGeneratedSpecification] = useState<GeneratedSpecification | null>(null);
  const { isMobile } = useDevice();

  const navigateToPage = (page: PageView) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
  };

  const handleNavigateToChat = (note: StickyNote) => {
    setSelectedNoteForChat(note);
    navigateToPage('chat');
  };

  const handleNavigateToMindMap = (note: StickyNote) => {
    setSelectedNoteForMindMap(note);
    navigateToPage('mindmap');
  };

  const handleGoToPreview = (specification?: GeneratedSpecification) => {
    if (specification) {
      setGeneratedSpecification(specification);
    }
    navigateToPage('preview');
  };

  const handleReturnToChat = () => {
    navigateToPage('chat');
  };

  const handleBackToDashboard = () => {
    navigateToPage('dashboard');
  };

  const handleNavigateToDocuments = () => {
    navigateToPage('documents');
  };

  const handleNavigateToPreview = (docId: string) => {
    setCurrentDocumentId(docId);
    navigateToPage('preview');
  };

  const handleSaveToDocuments = () => {
    // プレビューページからドキュメント一覧に保存
    navigateToPage('documents');
  };

  const handleClose = () => {
    setPreviousPage('dashboard');
    setCurrentPage('dashboard');
    setSelectedNoteForChat(null);
    setSelectedNoteForMindMap(null);
    setCurrentDocumentId(null);
    setGeneratedSpecification(null);
  };

  const handleNavigateToMindMapFromChat = () => {
    if (selectedNoteForChat) {
      setSelectedNoteForMindMap(selectedNoteForChat);
      navigateToPage('mindmap');
    }
  };

  const handleBackFromMindMap = () => {
    if (previousPage === 'chat') {
      setCurrentPage('chat');
    } else {
      setCurrentPage('dashboard');
    }
  };

  // モバイル端末の場合は専用のモバイルページを表示
  if (isMobile) {
    return (
      <>
        {currentPage === 'dashboard' && (
          <MobilePage 
            onNavigateToChat={handleNavigateToChat}
            onNavigateToDocuments={handleNavigateToDocuments}
            onNavigateToMindMap={handleNavigateToMindMap}
          />
        )}
        {currentPage === 'chat' && (
          <MobileChatPage
            memoTitle={selectedNoteForChat?.title || 'Chat'}
            onClose={handleClose}
            onGoToPreview={handleGoToPreview}
            onBack={handleBackToDashboard}
            showBackButton={true}
            onNavigateToMindMap={handleNavigateToMindMapFromChat}
          />
        )}
        {currentPage === 'mindmap' && (
          <MindMapPage
            selectedNote={selectedNoteForMindMap}
            onBack={handleBackFromMindMap}
          />
        )}
        {currentPage === 'preview' && (
          <MobilePreviewPage
            onClose={handleClose}
            onReturnToChat={handleReturnToChat}
            onSaveToDocuments={handleSaveToDocuments}
          />
        )}
        {currentPage === 'documents' && (
          <DocumentsPage
            onBack={handleBackToDashboard}
            onNavigateToPreview={handleNavigateToPreview}
          />
        )}
      </>
    );
  }

  // デスクトップ版の表示（従来通り）
  return (
    <>
      {currentPage === 'dashboard' && (
        <DashboardPage 
          onNavigateToChat={handleNavigateToChat}
          onNavigateToDocuments={handleNavigateToDocuments}
          onNavigateToMindMap={handleNavigateToMindMap}
        />
      )}
      {currentPage === 'chat' && (
        <ChatPage
          selectedNote={selectedNoteForChat}
          onBack={handleBackToDashboard}
          onNavigateToPreview={handleGoToPreview}
          onNavigateToMindMap={handleNavigateToMindMapFromChat}
          onNavigateToDocuments={handleNavigateToDocuments}
        />
      )}
      {currentPage === 'mindmap' && (
        <MindMapPage
          selectedNote={selectedNoteForMindMap}
          onBack={handleBackFromMindMap}
        />
      )}
      {currentPage === 'preview' && (
        <PreviewPage
          selectedNote={selectedNoteForChat}
          onBack={handleReturnToChat}
          generatedSpecification={generatedSpecification}
        />
      )}
      {currentPage === 'documents' && (
        <DocumentsPage
          onBack={handleBackToDashboard}
          onNavigateToPreview={handleNavigateToPreview}
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
};

export default App;
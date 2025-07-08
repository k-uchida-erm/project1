import React, { useState } from 'react';
import './App.css';
import DashboardPage from './pages/dashboard';
import ChatPage from './pages/chat';
import PreviewPage from './pages/preview';
import DocumentsPage from './pages/documents';
import MobilePage from './pages/mobile';
import MobileChatPage from './pages/mobile/chat';
import MobilePreviewPage from './pages/mobile/preview';
import useDevice from './hooks/useDevice';
import { StickyNote } from './types';

type PageView = 'dashboard' | 'chat' | 'preview' | 'documents';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [selectedNoteForChat, setSelectedNoteForChat] = useState<StickyNote | null>(null);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const { isMobile } = useDevice();

  const handleNavigateToChat = (note: StickyNote) => {
    setSelectedNoteForChat(note);
    setCurrentPage('chat');
  };

  const handleGoToPreview = () => {
    setCurrentPage('preview');
  };

  const handleReturnToChat = () => {
    setCurrentPage('chat');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigateToDocuments = () => {
    setCurrentPage('documents');
  };

  const handleNavigateToPreview = (docId: string) => {
    setCurrentDocumentId(docId);
    setCurrentPage('preview');
  };

  const handleSaveToDocuments = () => {
    // プレビューページからドキュメント一覧に保存
    setCurrentPage('documents');
  };

  const handleClose = () => {
    setCurrentPage('dashboard');
    setSelectedNoteForChat(null);
    setCurrentDocumentId(null);
  };

  // モバイル端末の場合は専用のモバイルページを表示
  if (isMobile) {
    return (
      <>
        {currentPage === 'dashboard' && (
          <MobilePage 
            onNavigateToChat={handleNavigateToChat}
            onNavigateToDocuments={handleNavigateToDocuments}
          />
        )}
        {currentPage === 'chat' && (
          <MobileChatPage
            memoTitle={selectedNoteForChat?.title || 'Sample Memo'}
            onClose={handleClose}
            onGoToPreview={handleGoToPreview}
            onBack={handleBackToDashboard}
            showBackButton={true}
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
            onClose={handleClose}
            onNavigateToPreview={handleNavigateToPreview}
            onBackToDashboard={handleBackToDashboard}
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
        />
      )}
      {currentPage === 'chat' && (
        <ChatPage
          memoTitle={selectedNoteForChat?.title || 'Sample Memo'}
          onClose={handleClose}
          onGoToPreview={handleGoToPreview}
          onBack={handleBackToDashboard}
          showBackButton={true}
        />
      )}
      {currentPage === 'preview' && (
        <PreviewPage
          onClose={handleClose}
          onReturnToChat={handleReturnToChat}
          onSaveToDocuments={handleSaveToDocuments}
        />
      )}
      {currentPage === 'documents' && (
        <DocumentsPage
          onClose={handleClose}
          onNavigateToPreview={handleNavigateToPreview}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </>
  );
};

export default App;
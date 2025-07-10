import React from 'react';
import PageLayout from '../../components/layouts/PageLayout';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import RightPanel from '../../components/organisms/RightPanel';
import PanelToggleButton from '../../components/atoms/PanelToggleButton';
import ChatLeftPanel from '../../components/organisms/ChatLeftPanel';
import { ChatPageProps } from '../../types/pages';
import { useChatController } from '../../hooks/useChatController';
import { usePanelState } from '../../hooks/usePanelState';

const ChatPage: React.FC<ChatPageProps> = ({ selectedNote, onBack, onNavigateToPreview, onNavigateToMindMap, onNavigateToDocuments }) => {
  // チャット・AI・仕様書生成などのロジック
  const chat = useChatController({ selectedNote, onNavigateToPreview });
  // UIパネル状態
  const panel = usePanelState();

  // マインドマップ遷移
  const handleMindMap = () => {
    if (selectedNote) {
      onNavigateToMindMap(selectedNote);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <Sidebar 
        expanded={panel.sidebarExpanded}
        onMouseEnter={() => panel.setSidebarExpanded(true)}
        onMouseLeave={() => panel.setSidebarExpanded(false)}
        onNavigateToDashboard={onBack}
        onNavigateToDocuments={onNavigateToDocuments}
        mobileVisible={panel.mobileMenuVisible}
        onMobileClose={panel.handleMobileMenuClose}
      />
      <Header 
        title={selectedNote?.title || 'Chat'}
        onClose={() => console.log('Close')}
        onBack={onBack}
        showBackButton={onBack !== undefined}
        onMenuClick={panel.handleMenuClick}
      />
      <div className="page-container h-screen min-h-0">
        <main className={`main-content h-screen min-h-0 flex relative ${!panel.rightPanelVisible ? 'justify-center' : ''}`}>
          {!panel.rightPanelVisible && (
            <PanelToggleButton
              isVisible={panel.rightPanelVisible}
              onToggle={panel.toggleRightPanel}
            />
          )}
          <div className={`${!panel.rightPanelVisible ? 'mx-auto flex-none' : 'flex-1'}`}>
            <ChatLeftPanel
              selectedNote={selectedNote}
              localMessages={chat.localMessages}
              currentMessage={chat.currentMessage}
              onChangeMessage={chat.setCurrentMessage}
              onSendMessage={chat.handleSendMessage}
              onKeyPress={chat.handleKeyPress}
              isAITyping={chat.isAITyping}
              isStreamingText={chat.isStreamingText}
              typingMessage={chat.typingMessage}
              typingText={chat.typingText}
            />
          </div>
          {panel.rightPanelVisible && (
            <div className="right-panel">
              <RightPanel
                currentStep={chat.currentStep}
                selectedMode={chat.selectedMode}
                detailLevel={chat.detailLevel}
                onStepChange={chat.setCurrentStep}
                onModeChange={chat.setSelectedMode}
                onDetailLevelChange={chat.setDetailLevel}
                onMindMap={handleMindMap}
                onNext={chat.handleNextStep}
                selectedNote={selectedNote ? {
                  id: selectedNote.id,
                  title: selectedNote.title,
                  content: selectedNote.content
                } : undefined}
                onNoteUpdate={async (updates) => {
                  if (selectedNote) {
                    await chat.updateStickyNote(selectedNote.id, updates);
                  }
                }}
                onToggle={panel.toggleRightPanel}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatPage; 
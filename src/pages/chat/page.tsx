import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import MessageList from '../../components/organisms/MessageList';
import MessageInput from '../../components/molecules/MessageInput';
import RightPanel from '../../components/organisms/RightPanel';
import { Message } from '../../types';

interface ChatPageProps {
  memoTitle: string;
  onClose: () => void;
  onGoToPreview: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const ChatPage: React.FC<ChatPageProps> = ({ 
  memoTitle, 
  onClose, 
  onGoToPreview, 
  onBack, 
  showBackButton = false 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I can help you develop your ideas and create designs. What would you like to work on today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState('Creative brainstorming');
  const [detailLevel, setDetailLevel] = useState(3);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), content: currentMessage, isUser: true, timestamp: new Date() }]);
    setCurrentMessage('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're looking for ideas. Let me help you brainstorm some creative solutions based on your input.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      onGoToPreview();
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <Sidebar 
        expanded={sidebarExpanded}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        onNavigateToDashboard={onBack}
        onNavigateToDocuments={() => console.log('Navigate to documents')}
      />

      <Header 
        title={memoTitle}
        onClose={onClose}
        onBack={onBack}
        showBackButton={showBackButton}
      />
      
      <div className="page-container">
        <main className="main-content">
          <div className="left-panel">
            <MessageList messages={messages} />
            <MessageInput
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onSend={handleSendMessage}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="right-panel">
            <RightPanel
              currentStep={currentStep}
              selectedMode={selectedMode}
              detailLevel={detailLevel}
              onStepChange={setCurrentStep}
              onModeChange={setSelectedMode}
              onDetailLevelChange={setDetailLevel}
              onMindMap={() => console.log('Mind Map clicked')}
              onNext={handleNextStep}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage; 
import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, FileText, MoreVertical, Settings, Trash2, Copy } from 'lucide-react';
import PageLayout from '../../components/layouts/PageLayout';
import MessageList from '../../components/organisms/MessageList';
import MessageInput from '../../components/molecules/MessageInput';
import { Message, StickyNote } from '../../types';
import { ChatPageProps } from '../../types/pages';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import RightPanel from '../../components/organisms/RightPanel';

const ChatPage: React.FC<ChatPageProps> = ({ selectedNote, onBack, onNavigateToPreview, onNavigateToMindMap }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'こんにちは！何かお手伝いできることはありますか？',
      timestamp: new Date(),
      isUser: false,
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState('Creative brainstorming');
  const [detailLevel, setDetailLevel] = useState(3);
  const [isAITyping, setIsAITyping] = useState(false);

  const handleSendMessage = () => {
    if (currentMessage.trim() && !isAITyping) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: currentMessage,
        timestamp: new Date(),
        isUser: true,
      };
      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');
      setIsAITyping(true);
      
      // シミュレート：AI応答
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: 'ありがとうございます。それについて詳しく教えていただけますか？',
          timestamp: new Date(),
          isUser: false,
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsAITyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Create specification - 仕様書を作成
      const specification = generateSpecification();
      onNavigateToPreview(specification);
    }
  };

  const generateSpecification = () => {
    // 現在のメッセージとAI設定に基づいて仕様書を生成
    const specification = {
      title: selectedNote?.title || 'Generated Specification',
      mode: selectedMode,
      detailLevel: detailLevel,
      content: `
# ${selectedNote?.title || 'プロジェクト'} 仕様書

## 概要
${selectedMode}を使用したアプローチで、詳細レベル${detailLevel}で設計されたプロジェクト仕様書です。

## チャット履歴に基づく要件
${messages.filter(m => m.isUser).map(m => `- ${m.content}`).join('\n')}

## AI分析結果
${messages.filter(m => !m.isUser).slice(-3).map(m => `${m.content}`).join('\n\n')}

## 推奨される次のステップ
1. 詳細な要件定義の実施
2. 技術的な実装計画の策定
3. プロトタイプの作成
4. ユーザーテストの実施

## 技術仕様
- アプローチ: ${selectedMode}
- 詳細レベル: ${detailLevel}/5
- 作成日: ${new Date().toLocaleDateString('ja-JP')}
      `,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Generated specification:', specification);
    return specification;
  };

  const handleMenuClick = () => {
    setMobileMenuVisible(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuVisible(false);
  };

  const handleMindMap = () => {
    if (selectedNote) {
      onNavigateToMindMap(selectedNote);
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
        mobileVisible={mobileMenuVisible}
        onMobileClose={handleMobileMenuClose}
      />

      <Header 
        title={selectedNote?.title || ''}
        onClose={() => console.log('Close')}
        onBack={onBack}
        showBackButton={onBack !== undefined}
        onMenuClick={handleMenuClick}
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
              isLoading={isAITyping}
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
              onMindMap={handleMindMap}
              onNext={handleNextStep}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage; 
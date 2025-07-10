import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, StickyNote } from '../types';
import { useChatMessages } from './useChatMessages';
import { useAIChat } from './useAIChat';
import { useStickyNotes } from './useStickyNotes';
import { UseChatControllerProps, UseChatControllerReturn } from '../types/hooks';

export const useChatController = ({ selectedNote, onNavigateToPreview }: UseChatControllerProps): UseChatControllerReturn => {
  const { messages, saveMessage, loading: messagesLoading } = useChatMessages(selectedNote?.id);
  const { updateStickyNote } = useStickyNotes();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState('Creative brainstorming');
  const [detailLevel, setDetailLevel] = useState(3);
  const hasExecutedDeepenIdea = useRef(false);

  const {
    isAITyping,
    typingMessage,
    typingText,
    isStreamingText,
    handleDeepenIdea: aiDeepenIdea,
    handleSendAIMessage,
    typeText,
  } = useAIChat({ saveMessage });

  useEffect(() => {
    if (!messagesLoading) {
      if (messages.length === 0) {
        setLocalMessages([]);
      } else {
        setLocalMessages(messages);
      }
    }
  }, [messages, messagesLoading, selectedNote?.id]);

  useEffect(() => {
    hasExecutedDeepenIdea.current = false;
  }, [selectedNote?.id, selectedNote?.title, selectedNote?.content]);

  const handleSendMessage = useCallback(async () => {
    if (currentMessage.trim() && !isAITyping) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: currentMessage,
        timestamp: new Date(),
        isUser: true,
      };
      setLocalMessages(prev => [...prev, userMessage]);
      const userMessageContent = currentMessage;
      setCurrentMessage('');
      try {
        if (selectedNote) {
          await saveMessage(userMessage);
        }
        const noteContext = selectedNote ? `Note title: ${selectedNote.title}\nNote content: ${selectedNote.content}` : undefined;
        const aiResponseText = await handleSendAIMessage(userMessageContent, noteContext);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponseText,
          timestamp: new Date(),
          isUser: false,
        };
        await typeText(aiResponseText, aiResponse);
        setLocalMessages(prev => [...prev, aiResponse]);
        if (selectedNote) {
          await saveMessage(aiResponse);
        }
      } catch (error: any) {
        let fallbackText = 'Sorry, I\'m having trouble connecting to the AI service right now. Please try again in a moment.';
        if (error instanceof Error) {
          switch (error.message) {
            case 'AI_DISABLED':
              fallbackText = 'AI機能が利用できませんが、このアイデアについて何かご質問やご相談があればお聞かせください。';
              break;
            case 'API_OVERLOADED':
              fallbackText = '🚫 AI サービスが現在過負荷状態です。1分ほどお待ちいただいてから再度お試しください。';
              break;
            case 'RATE_LIMITED':
              fallbackText = '⚡ API の使用制限に達しました。しばらく時間をおいてから再度お試しください。';
              break;
            case 'API_KEY_INVALID':
              fallbackText = '🔑 AI サービスの認証に問題があります。設定を確認してください。';
              break;
            case 'API_ERROR':
              fallbackText = '🔧 AI サービスで一時的な問題が発生しています。少し時間をおいてから再度お試しください。';
              break;
            default:
              fallbackText = '💬 AI サービスが一時的に利用できません。手動でのやり取りは引き続き可能です。';
          }
        }
        const fallbackResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: fallbackText,
          timestamp: new Date(),
          isUser: false,
        };
        await typeText(fallbackText, fallbackResponse);
        setLocalMessages(prev => [...prev, fallbackResponse]);
        if (selectedNote) {
          try {
            await saveMessage(fallbackResponse);
          } catch {}
        }
      }
    }
  }, [currentMessage, isAITyping, selectedNote, saveMessage, handleSendAIMessage, typeText]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      const specification = generateSpecification();
      onNavigateToPreview(specification);
    }
  };

  const generateSpecification = () => {
    const specification = {
      title: selectedNote?.title || 'Generated Specification',
      mode: selectedMode,
      detailLevel: detailLevel,
      content: `\n# ${selectedNote?.title || 'プロジェクト'} 仕様書\n\n## 概要\n${selectedMode}を使用したアプローチで、詳細レベル${detailLevel}で設計されたプロジェクト仕様書です。\n\n## チャット履歴に基づく要件\n${localMessages.filter(m => m.isUser).map(m => `- ${m.content}`).join('\n')}\n\n## AI分析結果\n${localMessages.filter(m => !m.isUser).slice(-3).map(m => `${m.content}`).join('\n\n')}\n\n## 推奨される次のステップ\n1. 詳細な要件定義の実施\n2. 技術的な実装計画の策定\n3. プロトタイプの作成\n4. ユーザーテストの実施\n\n## 技術仕様\n- アプローチ: ${selectedMode}\n- 詳細レベル: ${detailLevel}/5\n- 作成日: ${new Date().toLocaleDateString('ja-JP')}\n      `,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return specification;
  };

  return {
    localMessages,
    setLocalMessages,
    currentMessage,
    setCurrentMessage,
    currentStep,
    setCurrentStep,
    selectedMode,
    setSelectedMode,
    detailLevel,
    setDetailLevel,
    isAITyping,
    typingMessage,
    typingText,
    isStreamingText,
    handleSendMessage,
    handleKeyPress,
    handleNextStep,
    generateSpecification,
    updateStickyNote,
  };
}; 
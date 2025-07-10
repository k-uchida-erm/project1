import { useState } from 'react';
import { Message } from '../types';
// GeminiとOpenAIの両方をサポート
import { aiService as geminiService, isAIEnabled as isGeminiEnabled } from '../lib/gemini';
import { openaiService, isOpenAIEnabled } from '../lib/openai';

const useOpenAI = !!import.meta.env.VITE_OPENAI_API_KEY;
const aiService = useOpenAI ? openaiService : geminiService;
const isAIEnabled = useOpenAI ? isOpenAIEnabled : isGeminiEnabled;

interface UseAIChatProps {
  saveMessage: (message: Omit<Message, 'id'>) => Promise<Message>;
}

interface UseAIChatReturn {
  isAITyping: boolean;
  typingMessage: Message | null;
  typingText: string;
  isStreamingText: boolean;
  handleDeepenIdea: (title: string, content?: string) => Promise<string>;
  handleSendAIMessage: (userMessageContent: string, noteContext?: string) => Promise<string>;
  typeText: (text: string, message: Message) => Promise<void>;
}

export const useAIChat = ({ saveMessage }: UseAIChatProps): UseAIChatReturn => {
  const [isAITyping, setIsAITyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);
  const [typingText, setTypingText] = useState('');
  const [isStreamingText, setIsStreamingText] = useState(false);

  // 自動スクロール用のヘルパー関数
  const scrollToBottom = () => {
    setTimeout(() => {
      const chatContainer = document.querySelector('.left-panel > .overflow-y-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 10);
  };

  // ChatGPT風の高速ストリーミングタイピング効果
  const typeText = async (text: string, message: Message): Promise<void> => {
    return new Promise((resolve) => {
      setIsStreamingText(true);
      setTypingMessage(message);
      setTypingText('');
      
      let index = 0;
      
      // 基本速度を大幅に高速化
      const baseSpeed = 2; // 2msの基本速度
      const words = text.split(' ');
      
      const typeChars = () => {
        if (index >= text.length) {
          // 完了処理
          setTimeout(() => {
            setIsStreamingText(false);
            setTypingMessage(null);
            setTypingText('');
            resolve();
          }, 50);
          return;
        }

        // 一度に複数文字を表示する場合もある
        let charsToAdd = 1;
        const currentChar = text[index];
        
        // 空白や句読点では少し遅くする
        let delay = baseSpeed;
        
        if (currentChar === '\n') {
          delay = 20; // 改行で少し間を空ける
        } else if (currentChar === '。' || currentChar === '！' || currentChar === '？') {
          delay = 50; // 文末で間を空ける
        } else if (currentChar === '、' || currentChar === ',') {
          delay = 15; // 読点で少し間を空ける
        } else if (currentChar === ' ') {
          delay = 5; // スペースは短く
        } else {
          // 通常の文字では高速表示
          // 時々複数文字を一度に表示（自然な効果）
          if (Math.random() < 0.3 && index < text.length - 5) {
            charsToAdd = 2;
          }
          if (Math.random() < 0.1 && index < text.length - 10) {
            charsToAdd = 3;
          }
        }
        
        // 文字を追加
        const nextIndex = Math.min(index + charsToAdd, text.length);
        setTypingText(text.substring(0, nextIndex));
        index = nextIndex;
        
        // 自動スクロール（頻繁に実行）
        scrollToBottom();
        
        // 次の文字のスケジューリング
        setTimeout(typeChars, delay);
      };
      
      // 最初の文字から開始
      typeChars();
    });
  };

  // アイデア深化機能
  const handleDeepenIdea = async (title: string, content: string = ''): Promise<string> => {
    console.log('handleDeepenIdea called:', { 
      title, 
      hasContent: !!content, 
      isAIEnabledResult: isAIEnabled(), 
      isAITyping 
    });
    
    if (!title) {
      console.log('No title provided, skipping deepen idea');
      throw new Error('NO_TITLE');
    }

    if (!isAIEnabled()) {
      console.log('AI not enabled, showing fallback message');
      throw new Error('AI_DISABLED');
    }

    if (isAITyping) {
      console.log('AI is already typing, skipping');
      throw new Error('AI_BUSY');
    }

    setIsAITyping(true);
    
    try {
      // Gemini APIを使用してアイデア深化応答を生成
      const aiResponseText = await aiService.deepenIdea(title, content);
      
      return aiResponseText;
    } catch (error) {
      console.error('Error deepening idea:', error);
      throw error;
    } finally {
      setIsAITyping(false);
    }
  };

  // AI応答を取得
  const handleSendAIMessage = async (userMessageContent: string, noteContext?: string): Promise<string> => {
    if (!isAIEnabled()) {
      throw new Error('AI_DISABLED');
    }

    if (isAITyping) {
      throw new Error('AI_BUSY');
    }

    setIsAITyping(true);
    
    try {
      // Gemini APIを使用してリアルなAI応答を生成
      const aiResponseText = await aiService.chatResponse(userMessageContent, noteContext);
      return aiResponseText;
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // 新しいエラータイプに対応
      if (error instanceof Error) {
        switch (error.message) {
          case 'API_OVERLOADED':
            throw new Error('API_OVERLOADED');
          case 'RATE_LIMITED':
            throw new Error('RATE_LIMITED');
          case 'API_KEY_INVALID':
            throw new Error('API_KEY_INVALID');
          case 'GEMINI_NOT_CONFIGURED':
            throw new Error('AI_DISABLED');
          default:
            throw new Error('API_ERROR');
        }
      }
      
      throw error;
    } finally {
      setIsAITyping(false);
    }
  };

  return {
    isAITyping,
    typingMessage,
    typingText,
    isStreamingText,
    handleDeepenIdea,
    handleSendAIMessage,
    typeText,
  };
}; 
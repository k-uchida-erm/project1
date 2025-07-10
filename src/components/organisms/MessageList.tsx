import React, { useEffect, useRef } from 'react';
import { Brain, MessageCircle, Sparkles } from 'lucide-react';
import { Message } from '../../types';
import { MessageListProps } from '../../types/components';
import MarkdownRenderer from '../molecules/MarkdownRenderer';

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="relative mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-full flex items-center justify-center border border-emerald-100">
              <Brain size={40} className="text-emerald-600" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles size={24} className="text-amber-500" />
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            AI チャットアシスタント
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            アイデアの相談、質問、ブレインストーミングなど、<br />
            何でもお気軽に話しかけてください！
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <MessageCircle size={18} />
              <span>会話形式</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain size={18} />
              <span>AI powered</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`w-full flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-2xl px-6 py-4 max-w-3xl w-fit ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-900'
              }`}
              style={{wordBreak: 'break-word'}}
            >
              {message.isUser ? (
                <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
              ) : (
                <div className="prose prose-gray max-w-none prose-p:mb-2 prose-p:leading-relaxed">
                  <MarkdownRenderer content={message.content} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList; 
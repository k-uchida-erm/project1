import React from 'react';
import { Message } from '../../types';
import { MessageBubbleProps } from '../../types/components';

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLastInGroup = false }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] ${
          message.isUser
            ? 'bg-gradient-to-br from-slate-100/80 to-blue-50/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-slate-200/50'
            : 'text-slate-800'
        }`}
        style={message.isUser ? { boxShadow: '0 4px 12px rgba(0,0,0,0.04)' } : {}}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble; 
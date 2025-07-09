import React, { useState } from 'react';
import Input from '../atoms/Input';
import SendButton from '../atoms/SendButton';
import { MessageInputProps } from '../../types/components';

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  isLoading = false
}) => {
  return (
    <div className="pt-4 px-4 pb-2 relative z-10 mt-auto">
      <div className="bg-white rounded-full border border-slate-200/50 shadow-[0_4px_16px_rgba(0,0,0,0.07)] px-4 py-5 w-full mx-auto hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300">
        <div className="flex items-center space-x-3">
          <Input
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-slate-800 placeholder-slate-500"
          />
          <SendButton
            onClick={onSend}
            disabled={!value.trim()}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageInput; 
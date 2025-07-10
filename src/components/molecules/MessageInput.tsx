import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Input from '../atoms/Input';
import SendButton from '../atoms/SendButton';
import { MessageInputProps } from '../../types/components';

interface MessageInputExProps extends MessageInputProps {
  rounded?: string;
  className?: string;
}

const MessageInput: React.FC<MessageInputExProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  isLoading = false,
  rounded = 'rounded-full',
  className = '',
}) => {
  return (
    <div>
      <div className={`shadow-xl rounded-3xl flex items-center relative px-6 py-6 min-h-[64px] bg-transparent border border-gray-200 min-w-[600px] max-w-[1200px] mx-auto`}>
          {/* ＋ボタン（ファイルアップロード） */}
          <label className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 cursor-pointer mr-3" title="ファイルをアップロード">
            <span className="text-2xl text-gray-500">＋</span>
            <input type="file" className="hidden" />
          </label>
          <Input
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="メッセージを送信する"
            className="flex-1 bg-transparent border-none text-base focus:outline-none focus:ring-0"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={onSend}
              disabled={!value.trim() || isLoading}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                value.trim() && !isLoading
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ArrowUp size={18} />
              )}
            </button>
          </div>
        </div>
    </div>
  );
};

export default MessageInput; 
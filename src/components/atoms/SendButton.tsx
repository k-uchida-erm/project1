import React from 'react';
import { SendButtonProps } from '../../types/components';
import { ArrowUp } from 'lucide-react';

const SendButton: React.FC<SendButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  className = "p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`transition-all duration-200 flex items-center justify-center relative ${
        isDisabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 active:scale-95'
      } ${className}`}
      title={isLoading ? "AI is typing..." : "Send message"}
    >
      {isLoading ? (
        <div className="relative flex items-center justify-center w-5 h-5">
          {/* 背景の円（レール） */}
          <div className="absolute w-5 h-5 border-2 border-slate-200 rounded-full"></div>
          {/* 回転するローディング部分 */}
          <div className="absolute w-5 h-5 border-2 border-transparent border-t-slate-400 rounded-full animate-spin"></div>
          {/* 中央の塗りつぶされた四角 */}
          <div className="w-2 h-2 bg-slate-700 rounded-sm"></div>
        </div>
      ) : (
        <ArrowUp 
          size={16} 
          strokeWidth={1.5} 
          className="text-slate-700" 
        />
      )}
    </button>
  );
};

export default SendButton; 
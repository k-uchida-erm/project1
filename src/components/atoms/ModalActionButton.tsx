import React from 'react';
import { ModalActionButtonProps } from '../../types/components';
import { LucideIcon } from 'lucide-react';

const ModalActionButton: React.FC<ModalActionButtonProps> = ({
  icon: Icon,
  onClick,
  text,
  disabled = false,
  variant = 'chat'
}) => {
  const getVariantStyles = () => {
    if (variant === 'mindmap') {
      return 'border-slate-300/70 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200/50 text-slate-700';
    }
    // Open Chatボタンはチャット画面のNextボタンと同じ色（primary）にする
    return 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-transparent';
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) {
          onClick();
        }
      }}
      className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 ${getVariantStyles()}`}
      disabled={disabled}
    >
      <Icon size={16} strokeWidth={1.5} className={variant === 'chat' ? 'text-white' : 'text-slate-700'} />
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default ModalActionButton; 
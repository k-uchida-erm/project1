import React from 'react';
import { StickyNoteActionButtonProps } from '../../types/components';
import { LucideIcon } from 'lucide-react';

const StickyNoteActionButton: React.FC<StickyNoteActionButtonProps> = ({
  icon: Icon,
  onClick,
  title,
  className = "w-8 h-8 rounded-full border border-slate-300/70 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200/50 transition-all duration-200 flex items-center justify-center",
  size = 14,
  disabled = false
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) {
          onClick();
        }
      }}
      className={className}
      title={title}
      disabled={disabled}
    >
      <Icon size={size} strokeWidth={1.5} className="text-slate-700" />
    </button>
  );
};

export default StickyNoteActionButton; 
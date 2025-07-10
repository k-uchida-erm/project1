import React from 'react';
import { StickyNoteDeleteButtonProps } from '../../types/components';
import { X } from 'lucide-react';

const StickyNoteDeleteButton: React.FC<StickyNoteDeleteButtonProps> = ({
  onDelete
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="delete-button absolute -top-2 -right-2 w-6 h-6 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center border border-slate-300/70"
      title="Delete note"
    >
      <X size={12} strokeWidth={2} />
    </button>
  );
};

export default StickyNoteDeleteButton; 
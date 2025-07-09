import React from 'react';
import { Brain, MessageSquare } from 'lucide-react';
import StickyNoteActionButton from '../atoms/StickyNoteActionButton';

interface StickyNoteActionBarProps {
  onMindMapClick: () => void;
  onChatClick: () => void;
}

const StickyNoteActionBar: React.FC<StickyNoteActionBarProps> = ({
  onMindMapClick,
  onChatClick
}) => {
  return (
    <div className="action-bar absolute bottom-0 left-0 right-0 h-12 bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex items-center justify-center space-x-4 rounded-b-xl">
      <StickyNoteActionButton
        icon={Brain}
        onClick={onMindMapClick}
        title="Mind Map"
        className="w-8 h-8 rounded-full border border-slate-300/70 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200/50 transition-all duration-200 flex items-center justify-center"
      />
      <StickyNoteActionButton
        icon={MessageSquare}
        onClick={onChatClick}
        title="Open Chat"
        className="w-8 h-8 rounded-full border border-slate-300/70 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200/50 transition-all duration-200 flex items-center justify-center"
      />
    </div>
  );
};

export default StickyNoteActionBar; 
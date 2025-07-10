import React from 'react';
import { PanelToggleButtonProps } from '../../types/components';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

const PanelToggleButton: React.FC<PanelToggleButtonProps> = ({ isVisible, onToggle }) => {
  return (
    <button
      className="absolute top-1/2 right-0 z-20 bg-white/80 border border-slate-200/50 rounded-l-xl shadow-md px-2 py-1 hover:bg-slate-100/80 transition-all duration-200"
      style={{ transform: 'translateY(-50%)' }}
      onClick={onToggle}
      title={isVisible ? 'パネルを閉じる' : 'パネルを開く'}
    >
      {isVisible ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
    </button>
  );
};

export default PanelToggleButton; 
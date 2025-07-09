import React from 'react';
import { MobileCloseButtonProps } from '../../types/components';

const MobileCloseButton: React.FC<MobileCloseButtonProps> = ({
  onClick,
  className = "p-2 rounded-xl hover:bg-slate-100 transition-colors"
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      ✕
    </button>
  );
};

export default MobileCloseButton; 
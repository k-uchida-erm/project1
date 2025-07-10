import React from 'react';
import { ContextMenuContainerProps } from '../../types/components';

const ContextMenuContainer: React.FC<ContextMenuContainerProps> = ({
  children,
  x,
  y,
  visible,
  minWidth = '140px',
  className = "fixed bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-xl py-2 z-50"
}) => {
  if (!visible) return null;

  return (
    <div
      className={className}
      style={{
        left: x,
        top: y,
        minWidth
      }}
    >
      {children}
    </div>
  );
};

export default ContextMenuContainer; 
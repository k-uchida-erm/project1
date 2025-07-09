import React from 'react';
import { SidebarContainerProps } from '../../types/components';

const SidebarContainer: React.FC<SidebarContainerProps> = ({
  children,
  expanded,
  mobileVisible,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-sm border-r border-slate-200/50 z-50 transition-all duration-300 shadow-sm
        ${mobileVisible ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
      `}
      style={{
        width: mobileVisible ? '256px' : (expanded ? '256px' : '80px'),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col h-full">
        {children}
      </div>
    </div>
  );
};

export default SidebarContainer; 
import React from 'react';
import { SidebarItemProps } from '../../types/components';

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  onClick,
  expanded,
  mobileVisible,
  onItemClick
}) => {
  const isExpanded = mobileVisible || expanded;
  
  return (
    <div 
      className={`flex items-center cursor-pointer p-3 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-xl transition-all duration-200 group ${
        isExpanded ? 'w-full mx-4 justify-start pl-8' : 'justify-center'
      }`}
      onClick={() => onItemClick(onClick)}
    >
      <Icon size={20} strokeWidth={1.5} className="text-slate-700 group-hover:text-white" />
      {isExpanded && (
        <span className="ml-3 text-slate-800 font-medium group-hover:text-white">{label}</span>
      )}
    </div>
  );
};

export default SidebarItem; 
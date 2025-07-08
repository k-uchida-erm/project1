import React from 'react';
import { Home, FileText, User } from 'lucide-react';

interface SidebarProps {
  expanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToDocuments?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  expanded, 
  onMouseEnter, 
  onMouseLeave, 
  onNavigateToDashboard,
  onNavigateToDocuments
}) => {
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', onClick: onNavigateToDashboard },
    { icon: FileText, label: 'Documents', onClick: onNavigateToDocuments },
  ];

  const profileItem = { icon: User, label: 'Profile', onClick: () => {} };

  return (
    <div 
      className="fixed left-0 top-0 h-full bg-white/90 backdrop-blur-sm border-r border-slate-200/50 z-30 transition-all duration-300 shadow-sm"
      style={{
        width: expanded ? '256px' : '80px',
        zIndex: 50,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center mt-6 space-y-5">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`flex items-center cursor-pointer p-3 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group ${
                  expanded ? 'w-full mx-2 justify-start' : 'justify-center'
                }`}
                onClick={item.onClick}
              >
                <Icon size={20} strokeWidth={1.5} className="text-slate-700 group-hover:text-white" />
                {expanded && (
                  <span className="ml-3 text-slate-800 font-medium group-hover:text-white">{item.label}</span>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex-1" />
        
        <div className="pb-6 flex justify-center">
          <div 
            className={`flex items-center cursor-pointer p-3 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group ${
              expanded ? 'w-full mx-2 justify-start' : 'justify-center'
            }`}
            onClick={profileItem.onClick}
          >
            <profileItem.icon size={20} strokeWidth={1.5} className="text-slate-700 group-hover:text-white" />
            {expanded && (
              <span className="ml-3 text-slate-800 font-medium group-hover:text-white">{profileItem.label}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 
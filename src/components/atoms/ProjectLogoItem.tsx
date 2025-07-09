import React from 'react';
import ProjectIcon from './ProjectIcon';

interface ProjectLogoItemProps {
  expanded: boolean;
  mobileVisible: boolean;
}

const ProjectLogoItem: React.FC<ProjectLogoItemProps> = ({
  expanded,
  mobileVisible
}) => {
  const isExpanded = mobileVisible || expanded;
  
  return (
    <div 
      className={`flex items-center transition-all duration-200 ${
        isExpanded ? 'w-full mx-2 justify-start p-4' : 'justify-center p-3'
      }`}
    >
      {isExpanded ? (
        // 展開時：背景付きアイコン + プロジェクト名
        <>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <ProjectIcon 
              size={20} 
              className="text-white" 
            />
          </div>
          <div className="ml-3">
            <span className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              ThinkPad
            </span>
          </div>
        </>
      ) : (
        // 縮小時：アイコンのみ（完全に枠線なし）
        <ProjectIcon 
          size={20} 
          className="text-slate-600" 
          strokeless={true}
        />
      )}
    </div>
  );
};

export default ProjectLogoItem; 
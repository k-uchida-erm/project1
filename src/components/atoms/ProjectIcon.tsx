import React from 'react';

interface ProjectIconProps {
  size?: number;
  className?: string;
  strokeless?: boolean;
}

const ProjectIcon: React.FC<ProjectIconProps> = ({ 
  size = 24, 
  className = "text-slate-700",
  strokeless = false
}) => {
  if (strokeless) {
    // 枠線なしバージョン（塗りつぶしのみ）
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* メインの四角形（塗りつぶし） */}
        <rect
          x="4"
          y="2"
          width="16"
          height="20"
          rx="2"
          fill="currentColor"
          opacity="0.8"
        />
        
        {/* 左側の穴（白抜き） */}
        <circle cx="7" cy="7" r="1" fill="white" />
        <circle cx="7" cy="12" r="1" fill="white" />
        <circle cx="7" cy="17" r="1" fill="white" />
        
        {/* 右側のコンテンツライン（白色） */}
        <rect x="10" y="6.5" width="7" height="1" fill="white" />
        <rect x="10" y="9.5" width="5" height="1" fill="white" />
        <rect x="10" y="12.5" width="6" height="1" fill="white" />
        
        {/* アイデア電球のアクセント（白色） */}
        <circle cx="15" cy="16" r="1.5" fill="white" />
        <rect x="14" y="14" width="2" height="1" fill="white" />
      </svg>
    );
  }

  // 元の枠線ありバージョン
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* メインの四角形（ノートパッドを表現） */}
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* 左側の穴（ノートの綴じ穴） */}
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="7" cy="12" r="1" fill="currentColor" />
      <circle cx="7" cy="17" r="1" fill="currentColor" />
      
      {/* 右側のコンテンツライン（テキストを表現） */}
      <line x1="10" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" />
      
      {/* アイデア電球のアクセント（創造性を表現） */}
      <circle
        cx="15"
        cy="16"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M14 14.5 L16 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ProjectIcon; 
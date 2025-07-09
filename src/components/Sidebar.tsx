import React from 'react';
import { Home, FileText, X } from 'lucide-react';
import { SidebarProps } from '../types/components';
import SidebarOverlay from './atoms/SidebarOverlay';
import SidebarContainer from './molecules/SidebarContainer';
import SidebarItemList from './molecules/SidebarItemList';
import SidebarItem from './atoms/SidebarItem';
import ProjectLogoItem from './atoms/ProjectLogoItem';

const Sidebar: React.FC<SidebarProps> = ({
  expanded, 
  onMouseEnter, 
  onMouseLeave, 
  onNavigateToDashboard,
  onNavigateToDocuments,
  mobileVisible = false,
  onMobileClose
}) => {
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', onClick: onNavigateToDashboard },
    { icon: FileText, label: 'Documents', onClick: onNavigateToDocuments },
  ];

  const profileItem = { icon: X, label: 'Profile', onClick: () => {} };

  const handleItemClick = (onClick?: () => void) => {
    if (onClick) onClick();
    // モバイル表示時はクリック後にサイドバーを閉じる
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      <SidebarOverlay visible={mobileVisible} onClose={onMobileClose} />
      
      <SidebarContainer
        expanded={expanded}
        mobileVisible={mobileVisible}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* プロジェクトロゴ */}
        <div className="pt-4 pb-2">
          <ProjectLogoItem 
            expanded={expanded}
            mobileVisible={mobileVisible}
          />
        </div>
        
        {/* セパレーター */}
        <div className="mx-4 mb-4 border-b border-slate-200/50"></div>
        
        {/* メインナビゲーション */}
        <SidebarItemList
          items={sidebarItems}
          expanded={expanded}
          mobileVisible={mobileVisible}
          onItemClick={handleItemClick}
        />
        
        <div className="flex-1" />
        
        <div className="pb-6 flex justify-center">
          <SidebarItem
            icon={profileItem.icon}
            label={profileItem.label}
            onClick={profileItem.onClick}
            expanded={expanded}
            mobileVisible={mobileVisible}
            onItemClick={handleItemClick}
          />
        </div>
      </SidebarContainer>
    </>
  );
};

export default Sidebar; 
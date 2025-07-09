import React, { ReactNode, useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { PageLayoutProps } from '../../types/components';

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  onClose,
  onBack,
  showBackButton = false,
  onSave,
  showSaveButton = false,
  sidebarExpanded,
  onSidebarMouseEnter,
  onSidebarMouseLeave,
  onNavigateToDashboard,
  onNavigateToDocuments,
  showCloseButton = true,
  isDashboard = false
}) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  return (
    <div className={`h-screen bg-slate-100 overflow-hidden font-['Noto_Sans',sans-serif] text-sm leading-relaxed ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* 白背景オーバーレイ */}
      <div 
        className="fixed inset-0 bg-white"
        style={isDashboard ? {
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '18px 18px'
        } : {}}
      ></div>
      
      {/* Sidebar */}
      <Sidebar 
        expanded={sidebarExpanded}
        onMouseEnter={onSidebarMouseEnter}
        onMouseLeave={onSidebarMouseLeave}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToDocuments={onNavigateToDocuments}
        mobileVisible={mobileMenuVisible}
        onMobileClose={() => setMobileMenuVisible(false)}
      />

      {/* Header */}
      <Header 
        title={title}
        onClose={onClose}
        onBack={onBack}
        showBackButton={showBackButton}
        onSave={onSave}
        showSaveButton={showSaveButton}
        showCloseButton={showCloseButton}
        onMenuClick={() => setMobileMenuVisible(true)}
      />

      {/* Main Content */}
      <div className="relative z-10 fixed inset-0" style={{ top: '64px', height: 'calc(100vh - 64px)', paddingLeft: 'var(--content-left-offset)', paddingRight: 'var(--content-left-offset)' }}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 
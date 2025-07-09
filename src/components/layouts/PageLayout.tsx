import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  onSave?: () => void;
  showSaveButton?: boolean;
  sidebarExpanded: boolean;
  onSidebarMouseEnter: () => void;
  onSidebarMouseLeave: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToDocuments?: () => void;
  showCloseButton?: boolean;
}

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
  showCloseButton = true
}) => {
  return (
    <div className={`h-screen bg-slate-100 overflow-hidden font-['Noto_Sans',sans-serif] text-sm leading-relaxed ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* Sidebar */}
      <Sidebar 
        expanded={sidebarExpanded}
        onMouseEnter={onSidebarMouseEnter}
        onMouseLeave={onSidebarMouseLeave}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToDocuments={onNavigateToDocuments}
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
      />

      {/* Main Content */}
      <div className="fixed inset-0" style={{ top: '58px', height: 'calc(100vh - 58px)', left: '80px' }}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 
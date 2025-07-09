import { useState } from 'react';

export const useDashboardSidebar = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSidebarMouseEnter = () => setSidebarExpanded(true);
  const handleSidebarMouseLeave = () => setSidebarExpanded(false);

  const handleClose = () => {
    // ダッシュボードではcloseボタンは何もしない（または別のアクションを定義）
    console.log('Dashboard close clicked');
  };

  return {
    sidebarExpanded,
    handleSidebarMouseEnter,
    handleSidebarMouseLeave,
    handleClose
  };
}; 
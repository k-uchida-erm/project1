import React from 'react';
import { SidebarOverlayProps } from '../../types/components';

const SidebarOverlay: React.FC<SidebarOverlayProps> = ({
  visible,
  onClose
}) => {
  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-40 xl:hidden"
      onClick={onClose}
    />
  );
};

export default SidebarOverlay; 
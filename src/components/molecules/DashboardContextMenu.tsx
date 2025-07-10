import React from 'react';
import { Plus } from 'lucide-react';
import { ContextMenu } from '../../types';
import ContextMenuContainer from '../atoms/ContextMenuContainer';
import ContextMenuItem from '../atoms/ContextMenuItem';

interface DashboardContextMenuProps {
  contextMenu: ContextMenu;
  onCreateMemo: () => Promise<void>;
}

const DashboardContextMenu: React.FC<DashboardContextMenuProps> = ({
  contextMenu,
  onCreateMemo
}) => {
  const handleCreateMemo = async () => {
    try {
      await onCreateMemo();
    } catch (error) {
      console.error('Failed to create memo:', error);
    }
  };

  return (
    <ContextMenuContainer
      x={contextMenu.x}
      y={contextMenu.y}
      visible={contextMenu.visible}
    >
      <ContextMenuItem
        onClick={handleCreateMemo}
        icon={Plus}
      >
        New Memo
      </ContextMenuItem>
    </ContextMenuContainer>
  );
};

export default DashboardContextMenu; 
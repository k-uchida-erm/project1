import React from 'react';
import SidebarItem from '../atoms/SidebarItem';
import { SidebarItemListProps } from '../../types/components';

const SidebarItemList: React.FC<SidebarItemListProps> = ({
  items,
  expanded,
  mobileVisible,
  onItemClick
}) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
          expanded={expanded}
          mobileVisible={mobileVisible}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default SidebarItemList; 
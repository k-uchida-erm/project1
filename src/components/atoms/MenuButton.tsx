import React from 'react';
import { Menu } from 'lucide-react';
import HeaderButton from './HeaderButton';
import { MenuButtonProps } from '../../types/components';

const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  size = 20,
  strokeWidth = 2,
  className = "p-2 mr-2 hover:bg-slate-200/50 rounded-md transition-all duration-200 xl:hidden",
  iconClassName = "text-slate-600"
}) => {
  return (
    <HeaderButton
      onClick={onClick}
      icon={Menu}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      iconClassName={iconClassName}
    />
  );
};

export default MenuButton; 
import React from 'react';
import { HeaderButtonProps } from '../../types/components';

const HeaderButton: React.FC<HeaderButtonProps> = ({
  onClick,
  icon: Icon,
  size = 20,
  strokeWidth = 1.5,
  className = '',
  iconClassName = '',
  children
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <Icon size={size} strokeWidth={strokeWidth} className={iconClassName} />
      {children}
    </button>
  );
};

export default HeaderButton; 
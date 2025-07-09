import React from 'react';
import { X } from 'lucide-react';
import HeaderButton from './HeaderButton';
import { CloseButtonProps } from '../../types/components';

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  size = 20,
  strokeWidth = 1.5,
  className = "p-2 hover:bg-slate-100/60 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200/50",
  iconClassName = "text-slate-700"
}) => {
  return (
    <HeaderButton
      onClick={onClick}
      icon={X}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      iconClassName={iconClassName}
    />
  );
};

export default CloseButton; 
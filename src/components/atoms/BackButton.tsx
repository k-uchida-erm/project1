import React from 'react';
import { ChevronLeft } from 'lucide-react';
import HeaderButton from './HeaderButton';
import { BackButtonProps } from '../../types/components';

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  size = 22,
  strokeWidth = 2,
  className = "p-1 mr-3 hover:bg-slate-200/50 rounded-md transition-all duration-200",
  iconClassName = "text-slate-600"
}) => {
  return (
    <HeaderButton
      onClick={onClick}
      icon={ChevronLeft}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      iconClassName={iconClassName}
    />
  );
};

export default BackButton; 
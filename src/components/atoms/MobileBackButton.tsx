import React from 'react';
import { ChevronLeft } from 'lucide-react';
import HeaderButton from './HeaderButton';
import { MobileBackButtonProps } from '../../types/components';

const MobileBackButton: React.FC<MobileBackButtonProps> = ({
  onClick,
  size = 20,
  strokeWidth = 1,
  className = "p-2 rounded-xl hover:bg-slate-100 transition-colors",
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

export default MobileBackButton; 
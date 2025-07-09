import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContextMenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  onClick,
  children,
  icon: Icon,
  disabled = false,
  className = "w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/60 transition-all duration-200 rounded-lg mx-1"
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ width: 'calc(100% - 8px)' }}
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon size={14} strokeWidth={1.5} />}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default ContextMenuItem; 
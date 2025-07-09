import React, { useState, useRef, useEffect } from 'react';
import ContextMenuContainer from '../atoms/ContextMenuContainer';
import ContextMenuItem from '../atoms/ContextMenuItem';
import { LucideIcon } from 'lucide-react';

export interface ContextMenuAction {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}

interface ContextMenuButtonProps {
  children: React.ReactNode;
  actions: ContextMenuAction[];
  className?: string;
  disabled?: boolean;
}

const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({
  children,
  actions,
  className = "",
  disabled = false
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    // 通常のクリックでもメニューを表示
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({ 
        x: rect.left + rect.width / 2, 
        y: rect.bottom + 5 
      });
      setMenuVisible(true);
    }
  };

  const handleMenuItemClick = (action: ContextMenuAction) => {
    action.onClick();
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleGlobalClick = () => setMenuVisible(false);
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        disabled={disabled}
        className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </button>
      
      <ContextMenuContainer
        x={menuPosition.x}
        y={menuPosition.y}
        visible={menuVisible}
      >
        {actions.map((action, index) => (
          <ContextMenuItem
            key={index}
            onClick={() => handleMenuItemClick(action)}
            icon={action.icon}
            disabled={action.disabled}
          >
            {action.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContainer>
    </>
  );
};

export default ContextMenuButton; 
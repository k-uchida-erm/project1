import React from 'react';
import { Save } from 'lucide-react';
import { HeaderProps } from '../types/components';
import Button from './atoms/Button';
import BackButton from './atoms/BackButton';
import CloseButton from './atoms/CloseButton';
import MenuButton from './atoms/MenuButton';

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onClose, 
  onBack, 
  showBackButton = false,
  onSave,
  showSaveButton = false,
  showCloseButton = true,
  onMenuClick
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 z-20">
      <div className="flex items-center justify-between h-full w-full" style={{ paddingLeft: 'var(--content-left-offset)', paddingRight: 'var(--content-left-offset)' }}>
        <div className="flex items-center">
          {/* モバイル用メニューボタン */}
          {onMenuClick && (
            <MenuButton onClick={onMenuClick} />
          )}
          {showBackButton && onBack && (
            <BackButton onClick={onBack} />
          )}
          <span className="text-xl font-semibold text-slate-800">{title}</span>
        </div>
        
        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          {showSaveButton && onSave && (
            <Button
              onClick={onSave}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <Save size={16} strokeWidth={1.5} />
              <span>Save</span>
            </Button>
          )}
          {showCloseButton && (
            <CloseButton onClick={onClose} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
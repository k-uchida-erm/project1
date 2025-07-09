import React from 'react';
import { X, ChevronLeft, Save } from 'lucide-react';
import Button from './atoms/Button';

interface HeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  onSave?: () => void;
  showSaveButton?: boolean;
  showCloseButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  onClose, 
  onBack, 
  showBackButton = false,
  onSave,
  showSaveButton = false,
  showCloseButton = true
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 z-20" style={{ paddingLeft: 'var(--sidebar-width)', transition: 'padding-left 300ms ease-in-out' }}>
      <div className="flex items-center justify-between h-full w-full" style={{ paddingLeft: 'var(--side-gap)', paddingRight: 'var(--side-gap)' }}>
        <div className="flex items-center">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="p-1 mr-3 hover:bg-slate-200/50 rounded-md transition-all duration-200"
            >
              <ChevronLeft size={22} strokeWidth={2} className="text-slate-600" />
            </button>
          )}
          {title !== 'Dashboard' && (
            <span className="text-xl font-semibold text-slate-800">{title}</span>
          )}
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
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100/60 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200/50"
            >
              <X size={20} strokeWidth={1.5} className="text-slate-700" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
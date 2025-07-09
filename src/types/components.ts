import { ReactNode } from 'react';
import { StickyNote, Message } from './index';
import { LucideIcon } from 'lucide-react';

// Layout Components
export interface PageLayoutProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  onSave?: () => void;
  showSaveButton?: boolean;
  sidebarExpanded: boolean;
  onSidebarMouseEnter: () => void;
  onSidebarMouseLeave: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToDocuments?: () => void;
  showCloseButton?: boolean;
  isDashboard?: boolean;
}

export interface SidebarProps {
  expanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToDocuments?: () => void;
  mobileVisible?: boolean;
  onMobileClose?: () => void;
}

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  expanded: boolean;
  mobileVisible: boolean;
  onItemClick: (onClick?: () => void) => void;
}

export interface SidebarOverlayProps {
  visible: boolean;
  onClose?: () => void;
}

export interface SidebarContainerProps {
  children: ReactNode;
  expanded: boolean;
  mobileVisible: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface SidebarItemData {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export interface SidebarItemListProps {
  items: SidebarItemData[];
  expanded: boolean;
  mobileVisible: boolean;
  onItemClick: (onClick?: () => void) => void;
}

export interface HeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  onSave?: () => void;
  showSaveButton?: boolean;
  showCloseButton?: boolean;
  onMenuClick?: () => void;
}

// Atomic Components
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export interface HeaderButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
  iconClassName?: string;
  children?: ReactNode;
}

export interface BackButtonProps {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
  className?: string;
  iconClassName?: string;
}

export interface CloseButtonProps {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
  className?: string;
  iconClassName?: string;
}

export interface MenuButtonProps {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
  className?: string;
  iconClassName?: string;
}

export interface MobileBackButtonProps {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
  className?: string;
  iconClassName?: string;
}

export interface MobileCloseButtonProps {
  onClick: () => void;
  className?: string;
}

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

// Molecular Components
export interface MessageBubbleProps {
  message: Message;
  isLastInGroup?: boolean;
}

export interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

// Organism Components
export interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export interface ContentViewerProps {
  content: string;
  mode: 'Document' | 'Mind map' | 'Diagram';
}

export interface RightPanelProps {
  currentStep: number;
  selectedMode: string;
  detailLevel: number;
  onStepChange: (step: number) => void;
  onModeChange: (mode: string) => void;
  onDetailLevelChange: (level: number) => void;
  onMindMap: () => void;
  onNext: () => void;
} 
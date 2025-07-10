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
  // メモ関連のプロパティを追加
  selectedNote?: {
    id: string;
    title: string;
    content: string;
  };
  onNoteUpdate?: (updates: { title?: string; content?: string }) => void;
  onToggle?: () => void;
}

export interface DashboardMainPanelProps {
  stickyNotes: StickyNote[];
  draggedNote: string | null;
  hasDragged: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (e: React.MouseEvent, noteId: string) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
  setHasDragged: (v: boolean) => void;
  openNoteModal: (note: StickyNote) => void;
  deleteStickyNote: (id: string) => void;
  onMindMapClick: (id: string) => void;
  onChatClick: (id: string) => void;
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  onResizeComplete: (id: string, width: number, height: number, x?: number, y?: number) => void;
  contextMenu: any;
  handleCanvasClick: (e: React.MouseEvent) => void;
  handleCanvasContextMenu: (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => void;
  handleCreateMemoWithModal: () => Promise<void>;
} 

export interface StickyNoteCardProps {
  note: StickyNote;
  isDragged: boolean;
  hasDragged: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onDelete: () => void;
  onMindMapClick: () => void;
  onChatClick: () => void;
  onResize?: (id: string, width: number, height: number, x?: number, y?: number) => void;
  onResizeComplete?: (id: string, width: number, height: number, x?: number, y?: number) => void;
}

export interface StickyNoteModalProps {
  note: StickyNote;
  onClose: () => void;
  onUpdateNote: (updates: Partial<StickyNote>) => void;
  onMindMapClick: () => void;
  onChatClick: () => void;
}

export interface ChatLeftPanelProps {
  selectedNote: StickyNote | null;
  localMessages: Message[];
  currentMessage: string;
  onChangeMessage: (v: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isAITyping: boolean;
  isStreamingText: boolean;
  typingMessage: Message | null;
  typingText: string;
}

export interface PreviewContentProps {
  content: string;
  onChange: (content: string) => void;
}

export interface StickyNoteActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  title: string;
  className?: string;
  size?: number;
  disabled?: boolean;
}

export interface ModalActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  text: string;
  disabled?: boolean;
  variant?: 'chat' | 'mindmap';
}

export interface ContextMenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

export interface ContextMenuContainerProps {
  children: React.ReactNode;
  x: number;
  y: number;
  visible: boolean;
  minWidth?: string;
  className?: string;
}

export interface SendButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export interface StickyNoteDeleteButtonProps {
  onDelete: () => void;
}

export interface PanelToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

export interface ProjectIconProps {
  size?: number;
  className?: string;
  strokeless?: boolean;
}

export interface ContextMenuButtonProps {
  children: React.ReactNode;
  actions: any[];
  className?: string;
  disabled?: boolean;
}

export interface MarkdownRendererProps {
  content: string;
  className?: string;
} 

export interface ProjectLogoItemProps {
  expanded: boolean;
  mobileVisible: boolean;
} 
import { Message, StickyNote } from './index';

export interface UseChatControllerProps {
  selectedNote: StickyNote | null;
  onNavigateToPreview: (specification: any) => void;
}

export interface UseChatControllerReturn {
  localMessages: Message[];
  setLocalMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedMode: string;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  detailLevel: number;
  setDetailLevel: React.Dispatch<React.SetStateAction<number>>;
  isAITyping: boolean;
  typingMessage: Message | null;
  typingText: string;
  isStreamingText: boolean;
  handleSendMessage: () => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  generateSpecification: () => any;
  updateStickyNote: (id: string, updates: Partial<StickyNote>) => Promise<void>;
}

export interface UsePanelStateReturn {
  sidebarExpanded: boolean;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuVisible: boolean;
  setMobileMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  rightPanelVisible: boolean;
  setRightPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputHeight: number;
  setInputHeight: React.Dispatch<React.SetStateAction<number>>;
  inputRef: React.RefObject<HTMLDivElement>;
  leftPanelRef: React.RefObject<HTMLDivElement>;
  leftPanelRect: { left: number; width: number };
  setLeftPanelRect: React.Dispatch<React.SetStateAction<{ left: number; width: number }>>;
  updateInputHeight: () => void;
  handleMenuClick: () => void;
  handleMobileMenuClose: () => void;
  toggleRightPanel: () => void;
} 
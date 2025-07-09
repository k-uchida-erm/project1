import { StickyNote } from './index';

// 仕様書インターフェース
export interface GeneratedSpecification {
  title: string;
  mode: string;
  detailLevel: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Page Props Interfaces
export interface DashboardPageProps {
  onNavigateToChat: (note: StickyNote) => void;
  onNavigateToDocuments: () => void;
  onNavigateToMindMap: (note: StickyNote) => void;
}

export interface ChatPageProps {
  selectedNote: StickyNote | null;
  onBack: () => void;
  onNavigateToPreview: (specification?: GeneratedSpecification) => void;
  onNavigateToMindMap: (note: StickyNote) => void;
  onNavigateToDocuments: () => void;
}

export interface MindMapPageProps {
  selectedNote: StickyNote | null;
  onBack: () => void;
}

export interface PreviewPageProps {
  selectedNote: StickyNote | null;
  onBack: () => void;
  generatedSpecification?: GeneratedSpecification | null;
}

export interface DocumentsPageProps {
  onBack: () => void;
  onNavigateToPreview?: (docId: string) => void;
}

// Mobile Page Props
export interface MobilePageProps {
  onNavigateToChat: (note: StickyNote) => void;
  onNavigateToDocuments: () => void;
  onNavigateToMindMap: (note: StickyNote) => void;
}

export interface MobileChatPageProps {
  selectedNote: StickyNote | null;
  onBack: () => void;
  onNavigateToPreview: (specification?: GeneratedSpecification) => void;
  onNavigateToMindMap: (note: StickyNote) => void;
}

export interface MobilePreviewPageProps {
  selectedNote: StickyNote | null;
  onBack: () => void;
  generatedSpecification?: GeneratedSpecification | null;
} 
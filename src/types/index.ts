export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export type ViewMode = 'Document' | 'Mind map' | 'Diagram';

export interface StickyNote {
  id: string;
  title: string;
  content: string;
  x: number;
  y: number;
}

// 共通的な位置とメニューの型
export interface Position {
  x: number;
  y: number;
}

export interface ContextMenu {
  visible: boolean;
  x: number;
  y: number;
}

// ドキュメント関連
export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// プレビュー関連
export interface Block {
  id: string;
  type: 'text' | 'image' | 'code';
  content: string;
} 
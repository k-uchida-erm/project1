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
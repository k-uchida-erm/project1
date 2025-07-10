import React, { useEffect, useRef, useState } from 'react';
import { StickyNoteModalProps } from '../../types/components';
import { Brain, MessageSquare, X } from 'lucide-react';
import ModalActionButton from '../atoms/ModalActionButton';
import { generateTitleFromContent } from '../../lib/titleGenerator';

const StickyNoteModal: React.FC<StickyNoteModalProps> = ({
  note,
  onClose,
  onUpdateNote,
  onMindMapClick,
  onChatClick
}) => {
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  // ローカル状態で編集内容を管理（タイトルは本文から自動生成）
  const [localContent, setLocalContent] = useState(note.content);
  const [hasChanges, setHasChanges] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  // プロップスのnoteが変更された時にローカル状態を更新
  useEffect(() => {
    setLocalContent(note.content);
    setHasChanges(false);
  }, [note.id, note.content]);

  // モーダルが開いたときのフォーカス処理
  useEffect(() => {
    if (contentTextareaRef.current) {
      contentTextareaRef.current.focus();
    }
  }, []);

  // 変更を保存する関数（AIタイトル生成付き）
  const saveChanges = async () => {
    console.log('💾 SaveChanges called with hasChanges:', hasChanges, 'content length:', localContent.trim().length);
    
    if (hasChanges && localContent.trim() !== '') {
      setIsGeneratingTitle(true);
      console.log('🚀 Starting AI title generation for content:', localContent.trim().substring(0, 50) + '...');
      
      try {
        // AIでタイトルを生成
        const titleResult = await generateTitleFromContent(localContent);
        console.log('📋 Title generation result:', titleResult);
        
        await onUpdateNote({ 
          title: titleResult.title, 
          content: localContent 
        });
        
        console.log('✅ Note updated with generated title:', titleResult.title);
        if (titleResult.error) {
          console.warn('⚠️ Title generation warning:', titleResult.error);
        }
      } catch (error) {
        console.error('❌ Error saving note with AI title:', error);
        try {
          // エラー時はフォールバックタイトルで保存
          const fallbackTitle = localContent.trim().substring(0, 20) || 'メモ';
          console.log('🔄 Using fallback title for save:', fallbackTitle);
          await onUpdateNote({ 
            title: fallbackTitle, 
            content: localContent 
          });
          console.log('✅ Note saved with fallback title:', fallbackTitle);
        } catch (fallbackError) {
          console.error('❌ Error saving with fallback title:', fallbackError);
          // フォールバック保存も失敗した場合、少なくともローカル状態はリセット
          setHasChanges(false);
        }
      } finally {
        setIsGeneratingTitle(false);
      }
    } else if (hasChanges && localContent.trim() === '') {
      console.log('📝 Content is empty, using default title');
      try {
        // 内容が空の場合はデフォルトタイトルで保存
        await onUpdateNote({ 
          title: 'メモ', 
          content: localContent 
        });
        console.log('✅ Empty note saved with default title');
      } catch (error) {
        console.error('❌ Error saving empty note:', error);
        setHasChanges(false);
      }
    } else {
      console.log('⏭️ No changes to save');
    }
  };

  // モーダルを閉じる処理
  const handleClose = async () => {
    await saveChanges();
    onClose();
  };

  // キーボードイベントハンドラ
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  // backdrop クリックで閉じる
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // コンテンツ変更ハンドラ
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
    setHasChanges(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl w-140 h-96 relative shadow-2xl border border-slate-200/50">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isGeneratingTitle}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100/60 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200/50 disabled:opacity-50"
        >
          <X size={16} strokeWidth={1.5} className="text-slate-700" />
        </button>

        {/* Content */}
        <div className="p-6 h-full flex flex-col">
          {/* タイトル生成中インジケーター */}
          {isGeneratingTitle && (
            <div className="mb-4 flex items-center space-x-2 text-sm text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>AIがタイトルを生成中...</span>
            </div>
          )}
          
          <textarea
            ref={contentTextareaRef}
            value={localContent}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none resize-none text-slate-700 placeholder-slate-400 mt-8"
            placeholder="メモの内容を入力してください。保存時にAIが適切なタイトルを自動生成します..."
            disabled={isGeneratingTitle}
          />
          
          {/* Action Bar */}
          <div className="flex justify-end space-x-3 mt-4">
            <ModalActionButton
              icon={Brain}
              onClick={async () => {
                try {
                  await saveChanges();
                } catch (error) {
                  console.error('Error saving changes before Mind Map:', error);
                } finally {
                  onMindMapClick();
                }
              }}
              text="Mind Map"
              variant="mindmap"
              disabled={isGeneratingTitle}
            />
            <ModalActionButton
              icon={MessageSquare}
              onClick={async () => {
                try {
                  await saveChanges();
                } catch (error) {
                  console.error('Error saving changes before Chat:', error);
                } finally {
                  onChatClick();
                }
              }}
              text="Open Chat"
              variant="chat"
              disabled={isGeneratingTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyNoteModal; 
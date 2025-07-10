import React, { useState } from 'react';
import PageLayout from '../../components/layouts/PageLayout';
import { StickyNote } from '../../types';
import { PreviewPageProps } from '../../types/pages';
import MarkdownRenderer from '../../components/molecules/MarkdownRenderer';

const PreviewPage: React.FC<PreviewPageProps> = ({ selectedNote, onBack, generatedSpecification }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  // ドキュメントの状態管理
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [documentBlocks, setDocumentBlocks] = useState([
    { id: '1', content: 'Welcome to your document. Start typing here...', type: 'paragraph' },
    { id: '2', content: 'Heading 2', type: 'heading2' },
    { id: '3', content: 'This is a paragraph. You can edit this text directly by clicking on it.', type: 'paragraph' },
    { id: '4', content: 'Heading 3', type: 'heading3' },
    { id: '5', content: '• Bullet point 1\n• Bullet point 2\n• Bullet point 3', type: 'bullet' },
    { id: '6', content: 'Add more content by clicking here...', type: 'paragraph' }
  ]);

  const handleSave = () => {
    console.log('Save to documents');
  };

  const updateBlockContent = (blockId: string, content: string) => {
    setDocumentBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, content } : block
    ));
  };

  const renderGeneratedSpecification = () => {
    if (!generatedSpecification) return null;

    return (
      <div className="w-full py-8" style={{ 
        maxWidth: 'min(90%, 800px)',
        margin: '0 auto'
      }}>
        <div className="min-h-screen">
          {/* Document Title */}
          <div className="pb-6">
            <h1 className="text-4xl font-bold mb-4 text-slate-800">
              {generatedSpecification.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
              <span>モード: {generatedSpecification.mode}</span>
              <span>詳細レベル: {generatedSpecification.detailLevel}/5</span>
              <span>作成日: {generatedSpecification.createdAt.toLocaleDateString('ja-JP')}</span>
            </div>
          </div>
          
          {/* Generated Content */}
          <div className="prose prose-slate max-w-none">
            <MarkdownRenderer 
              content={generatedSpecification.content}
              className="text-slate-700 leading-relaxed"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentView = () => {
    return (
      <div className="w-full py-8" style={{ 
        maxWidth: 'min(90%, 800px)',
        margin: '0 auto'
      }}>
        <div className="min-h-screen">
          {/* Document Title */}
          <div className="pb-4">
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="w-full text-4xl font-bold mb-8 border-none outline-none bg-transparent placeholder-slate-400 text-slate-800 focus:text-blue-900 transition-colors"
              placeholder="Untitled"
            />
          </div>
          
          {/* Document Content - Simple text blocks */}
          <div className="space-y-6 pb-8">
            {documentBlocks.map((block) => (
              <div key={block.id} className="group">
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlockContent(block.id, e.target.value)}
                  placeholder={
                    block.type === 'paragraph' ? "テキストを入力してください" :
                    block.type === 'heading2' ? 'Heading 2' :
                    block.type === 'heading3' ? 'Heading 3' :
                    'Type here...'
                  }
                  className={`
                    w-full min-h-[3rem] px-3 py-2 rounded-lg outline-none cursor-text transition-colors border border-transparent focus:border-blue-300 resize-none
                    ${block.type === 'heading2' ? 'text-2xl font-semibold text-slate-800' : ''}
                    ${block.type === 'heading3' ? 'text-xl font-medium text-slate-800' : ''}
                    ${block.type === 'paragraph' ? 'text-slate-700' : ''}
                    hover:bg-slate-50/50 focus:bg-white
                  `}
                  rows={block.content.split('\n').length || 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageLayout
      title="Preview"
      onClose={() => console.log('Close')}
      onBack={onBack}
      showBackButton={true}
      onSave={handleSave}
      showSaveButton={true}
      sidebarExpanded={sidebarExpanded}
      onSidebarMouseEnter={() => setSidebarExpanded(true)}
      onSidebarMouseLeave={() => setSidebarExpanded(false)}
    >
      {/* 白背景オーバーレイ */}
      <div className="fixed inset-0 bg-white"></div>
      <main className="h-full overflow-y-auto bg-white relative z-10">
        {generatedSpecification ? renderGeneratedSpecification() : renderDocumentView()}
      </main>
    </PageLayout>
  );
};

export default PreviewPage; 
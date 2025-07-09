import React, { useState } from 'react';
import PageLayout from '../../components/layouts/PageLayout';
import { StickyNote } from '../../types';
import { PreviewPageProps } from '../../types/pages';

const PreviewPage: React.FC<PreviewPageProps> = ({ selectedNote, onBack, generatedSpecification }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSave = () => {
    console.log('Save to documents');
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
            <div 
              className="text-slate-700 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ 
                __html: generatedSpecification.content
                  .replace(/^# /gm, '<h1 class="text-3xl font-bold mb-4 mt-8 text-slate-800">')
                  .replace(/^## /gm, '<h2 class="text-2xl font-semibold mb-3 mt-6 text-slate-800">')
                  .replace(/^### /gm, '<h3 class="text-xl font-medium mb-2 mt-4 text-slate-800">')
                  .replace(/^- /gm, '<li class="ml-4 mb-1">')
                  .replace(/^\d+\. /gm, '<li class="ml-4 mb-1 list-decimal">')
              }}
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
              defaultValue="Untitled Document"
              className="w-full text-4xl font-bold mb-8 border-none outline-none bg-transparent placeholder-slate-400 text-slate-800 focus:text-blue-900 transition-colors"
              placeholder="Untitled"
            />
          </div>
          
          {/* Document Content - Notion-style blocks */}
          <div className="space-y-6 pb-8">
            <div className="group">
              <div 
                contentEditable
                suppressContentEditableWarning={true}
                className="min-h-[1.5rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-700"
                data-placeholder="Type '/' for commands"
              >
                Welcome to your document. Start typing here...
              </div>
            </div>
            
            <div className="group">
              <h2 
                contentEditable
                suppressContentEditableWarning={true}
                className="text-2xl font-semibold min-h-[2rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-800"
              >
                Heading 2
              </h2>
            </div>
            
            <div className="group">
              <div 
                contentEditable
                suppressContentEditableWarning={true}
                className="min-h-[1.5rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-700"
              >
                This is a paragraph. You can edit this text directly by clicking on it.
              </div>
            </div>
            
            <div className="group">
              <h3 
                contentEditable
                suppressContentEditableWarning={true}
                className="text-xl font-medium min-h-[1.5rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-800"
              >
                Heading 3
              </h3>
            </div>
            
            <div className="group">
              <ul className="list-none pl-0 space-y-2">
                <li 
                  contentEditable
                  suppressContentEditableWarning={true}
                  className="min-h-[1.5rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-700 relative pl-8 before:content-['•'] before:absolute before:left-3 before:text-emerald-500 before:font-bold"
                >
                  Bullet point 1
                </li>
                <li 
                  contentEditable
                  suppressContentEditableWarning={true}
                  className="min-h-[1.5rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-700 relative pl-8 before:content-['•'] before:absolute before:left-3 before:text-emerald-500 before:font-bold"
                >
                  Bullet point 2
                </li>
                <li 
                  contentEditable
                  suppressContentEditableWarning={true}
                  className="min-h-[1.5rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-700 relative pl-8 before:content-['•'] before:absolute before:left-3 before:text-emerald-500 before:font-bold"
                >
                  Bullet point 3
                </li>
              </ul>
            </div>
            
            <div className="group">
              <div 
                contentEditable
                suppressContentEditableWarning={true}
                className="min-h-[1.5rem] px-3 py-2 rounded-lg outline-none cursor-text text-slate-500"
              >
                Add more content by clicking here...
              </div>
            </div>
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
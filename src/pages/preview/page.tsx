import React, { useState } from 'react';
import PageLayout from '../../components/layouts/PageLayout';

interface PreviewPageProps {
  onClose: () => void;
  onReturnToChat: () => void;
  onSaveToDocuments: () => void;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ onClose, onReturnToChat, onSaveToDocuments }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSave = () => {
    onSaveToDocuments();
  };

  const renderDocumentView = () => {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="min-h-screen">
          {/* Document Title */}
          <div className="p-8 pb-4">
            <input
              type="text"
              defaultValue="Untitled Document"
              className="w-full text-4xl font-bold mb-8 border-none outline-none bg-transparent placeholder-slate-400 text-slate-800 focus:text-blue-900 transition-colors"
              placeholder="Untitled"
            />
          </div>
          
          {/* Document Content - Notion-style blocks */}
          <div className="space-y-6 px-8 pb-8">
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
      onClose={onClose}
      onBack={onReturnToChat}
      showBackButton={true}
      onSave={handleSave}
      showSaveButton={true}
      sidebarExpanded={sidebarExpanded}
      onSidebarMouseEnter={() => setSidebarExpanded(true)}
      onSidebarMouseLeave={() => setSidebarExpanded(false)}
      onNavigateToDocuments={onSaveToDocuments}
    >
      <main className="h-full overflow-y-auto bg-white">
        {renderDocumentView()}
      </main>
    </PageLayout>
  );
};

export default PreviewPage; 
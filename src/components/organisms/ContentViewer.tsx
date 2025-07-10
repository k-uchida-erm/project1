import React, { useState } from 'react';
import { ContentViewerProps } from '../../types/components';

const ContentViewer: React.FC<ContentViewerProps> = ({ content, mode }) => {
  // ドキュメントブロックの状態管理
  const [documentBlocks, setDocumentBlocks] = useState([
    { id: '1', content: 'Welcome to your document. Start typing here...', type: 'paragraph' },
    { id: '2', content: 'Heading 2', type: 'heading2' },
    { id: '3', content: 'This is a paragraph. You can edit this text directly by clicking on it.', type: 'paragraph' },
    { id: '4', content: 'Heading 3', type: 'heading3' },
    { id: '5', content: '• Bullet point 1\n• Bullet point 2\n• Bullet point 3', type: 'bullet' },
    { id: '6', content: 'Add more content by clicking here...', type: 'paragraph' }
  ]);

  const updateBlockContent = (blockId: string, content: string) => {
    setDocumentBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, content } : block
    ));
  };

  const renderDocumentView = () => {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white min-h-screen">
          {/* Document Title */}
          <input
            type="text"
            defaultValue="Untitled Document"
            className="w-full text-4xl font-bold mb-8 border-none outline-none bg-transparent placeholder-gray-400"
            placeholder="Untitled"
          />
          
          {/* Document Content - Simple text blocks */}
          <div className="space-y-4">
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
                    w-full min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text border border-transparent focus:border-blue-300 resize-none
                    ${block.type === 'heading2' ? 'text-2xl font-semibold' : ''}
                    ${block.type === 'heading3' ? 'text-xl font-medium' : ''}
                    hover:bg-gray-50 focus:bg-white
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

  const renderMindMapView = () => {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="bg-white p-8" style={{ height: '70vh' }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Mind Map View</h3>
              <p className="text-gray-500">Mind map functionality coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDiagramView = () => {
    const gridItems = [
      'Key Partners', 'Key Activities', 'Value Propositions', 'Customer Relationships', 'Customer Segments',
      'Key Resources', '', 'Channels', '', '',
      'Cost Structure', '', 'Revenue Streams', '', ''
    ];

    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="bg-white p-8" style={{ height: '70vh' }}>
          <div className="grid grid-cols-5 grid-rows-3 gap-2 h-full">
            {gridItems.map((item, index) => (
              <div
                key={index}
                className={`border border-gray-300 bg-white p-4 flex items-center justify-center text-center rounded hover:bg-gray-50 focus:bg-gray-50 outline-none cursor-text ${
                  item === '' ? 'opacity-30 cursor-default' : ''
                }`}
                style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
              >
                {item !== '' ? (
                  <textarea
                    defaultValue={item}
                    onChange={() => {}} // 必要に応じて更新ロジックを追加
                    placeholder="Type here..."
                    className="w-full h-full text-sm font-medium text-center border-none outline-none bg-transparent resize-none"
                  />
                ) : (
                  <span className="text-sm font-medium">Example</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden pt-3 px-8" style={{ height: 'calc(100vh - 220px)' }}>
      {mode === 'Document' && renderDocumentView()}
      {mode === 'Mind map' && renderMindMapView()}
      {mode === 'Diagram' && renderDiagramView()}
    </div>
  );
};

export default ContentViewer; 
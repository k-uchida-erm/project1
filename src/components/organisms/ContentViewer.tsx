import React from 'react';
import { ContentViewerProps } from '../../types/components';

const ContentViewer: React.FC<ContentViewerProps> = ({ content, mode }) => {
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
          
          {/* Document Content - Notion-style blocks */}
          <div className="space-y-4">
            <div className="group">
              <div 
                contentEditable
                suppressContentEditableWarning={true}
                className="min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text"
                data-placeholder="Type '/' for commands"
              >
                Welcome to your document. Start typing here...
              </div>
            </div>
            
            <div className="group">
              <h2 
                contentEditable
                suppressContentEditableWarning={true}
                className="text-2xl font-semibold min-h-[2rem] px-1 py-1 rounded outline-none cursor-text"
              >
                Heading 2
              </h2>
            </div>
            
            <div className="group">
              <div 
                contentEditable
                suppressContentEditableWarning={true}
                className="min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text"
              >
                This is a paragraph. You can edit this text directly by clicking on it.
              </div>
            </div>
            
            <div className="group">
              <h3 
                contentEditable
                suppressContentEditableWarning={true}
                className="text-xl font-medium min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text"
              >
                Heading 3
              </h3>
            </div>
            
            <div className="group">
              <ul className="list-disc pl-6 space-y-1">
                <li 
                  contentEditable
                  suppressContentEditableWarning={true}
                  className="min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text"
                >
                  Bullet point 1
                </li>
                <li 
                  contentEditable
                  suppressContentEditableWarning={true}
                  className="min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text"
                >
                  Bullet point 2
                </li>
                <li 
                  contentEditable
                  suppressContentEditableWarning={true}
                  className="min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text"
                >
                  Bullet point 3
                </li>
              </ul>
            </div>
            
            <div className="group">
              <div 
                contentEditable
                suppressContentEditableWarning={true}
                className="min-h-[1.5rem] px-1 py-1 rounded outline-none cursor-text"
              >
                Add more content by clicking here...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMindMapView = () => {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="relative bg-white overflow-hidden" style={{ height: '70vh' }}>
          <svg className="w-full h-full">
            {/* Central node */}
            <g>
              <circle cx="50%" cy="50%" r="40" fill="white" stroke="#D1D1D1" strokeWidth="1" />
              <text x="50%" y="50%" textAnchor="middle" dy="0.3em" className="text-sm font-semibold">
                Idea
              </text>
            </g>

            {/* Child nodes */}
            {[
              { x: '30%', y: '30%', label: 'Example 1' },
              { x: '70%', y: '30%', label: 'Example 2' },
              { x: '30%', y: '70%', label: 'Example 3' },
              { x: '70%', y: '70%', label: 'Example 4' }
            ].map((node, index) => (
              <g key={index}>
                {/* Connection line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2={node.x}
                  y2={node.y}
                  stroke="#D1D1D1"
                  strokeWidth="1"
                />
                {/* Node */}
                <circle cx={node.x} cy={node.y} r="30" fill="white" stroke="#D1D1D1" strokeWidth="1" />
                <text x={node.x} y={node.y} textAnchor="middle" dy="0.3em" className="text-xs">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
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
                contentEditable={item !== ''}
                suppressContentEditableWarning={true}
                className={`border border-gray-300 bg-white p-4 flex items-center justify-center text-center rounded hover:bg-gray-50 focus:bg-gray-50 outline-none cursor-text ${
                  item === '' ? 'opacity-30 cursor-default' : ''
                }`}
                style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
              >
                <span className="text-sm font-medium">{item || 'Example'}</span>
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
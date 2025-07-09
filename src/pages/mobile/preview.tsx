import React, { useState } from 'react';
import { Save, Type, List, AlignLeft, Plus } from 'lucide-react';
import MobileBackButton from '../../components/atoms/MobileBackButton';
import MobileCloseButton from '../../components/atoms/MobileCloseButton';

interface MobilePreviewPageProps {
  onClose: () => void;
  onReturnToChat: () => void;
  onSaveToDocuments: () => void;
}

interface Block {
  id: string;
  type: 'title' | 'heading2' | 'heading3' | 'paragraph' | 'bullet';
  content: string;
}

const MobilePreviewPage: React.FC<MobilePreviewPageProps> = ({ 
  onClose, 
  onReturnToChat, 
  onSaveToDocuments 
}) => {
  const [title, setTitle] = useState('Untitled Document');
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'paragraph', content: 'Welcome to your document. Start typing here...' },
    { id: '2', type: 'heading2', content: 'Heading 2' },
    { id: '3', type: 'paragraph', content: 'This is a paragraph. You can edit this text directly by tapping on it.' },
    { id: '4', type: 'heading3', content: 'Heading 3' },
    { id: '5', type: 'bullet', content: 'Bullet point 1' },
    { id: '6', type: 'bullet', content: 'Bullet point 2' },
    { id: '7', type: 'bullet', content: 'Bullet point 3' },
    { id: '8', type: 'paragraph', content: 'Add more content by tapping here...' }
  ]);
  
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const handleSave = () => {
    onSaveToDocuments();
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const changeBlockType = (id: string, type: Block['type']) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, type } : block
    ));
    setShowTypeSelector(false);
  };

  const addNewBlock = (afterId?: string) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type: 'paragraph',
      content: ''
    };
    
    if (afterId) {
      const index = blocks.findIndex(block => block.id === afterId);
      setBlocks(prev => [
        ...prev.slice(0, index + 1),
        newBlock,
        ...prev.slice(index + 1)
      ]);
    } else {
      setBlocks(prev => [...prev, newBlock]);
    }
    
    setActiveBlock(newBlock.id);
  };

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(prev => prev.filter(block => block.id !== id));
    }
  };

  const handleBlockFocus = (id: string) => {
    setActiveBlock(id);
    setShowToolbar(true);
  };

  const handleBlockBlur = () => {
    setTimeout(() => {
      setActiveBlock(null);
      setShowToolbar(false);
      setShowTypeSelector(false);
    }, 100);
  };

  const getBlockClassName = (type: Block['type']) => {
    const baseClasses = "w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent focus:border-blue-200 transition-all duration-200";
    
    switch (type) {
      case 'title':
        return `${baseClasses} text-3xl font-bold text-slate-800`;
      case 'heading2':
        return `${baseClasses} text-2xl font-semibold text-slate-800`;
      case 'heading3':
        return `${baseClasses} text-xl font-medium text-slate-800`;
      case 'bullet':
        return `${baseClasses} text-slate-700 pl-8 relative`;
      default:
        return `${baseClasses} text-slate-700`;
    }
  };

  const blockTypes = [
    { type: 'paragraph' as const, label: 'Paragraph', icon: AlignLeft },
    { type: 'heading2' as const, label: 'Heading 2', icon: Type },
    { type: 'heading3' as const, label: 'Heading 3', icon: Type },
    { type: 'bullet' as const, label: 'Bullet List', icon: List },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MobileBackButton onClick={onReturnToChat} />
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Preview</h1>
            <p className="text-sm text-slate-500">Edit & Save</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
          <MobileCloseButton onClick={onClose} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          {/* Document Title */}
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold px-4 py-3 border-2 border-transparent focus:border-blue-200 rounded-lg outline-none bg-transparent placeholder-slate-400 text-slate-800 transition-all duration-200"
              placeholder="Untitled"
            />
          </div>
          
          {/* Document Blocks */}
          <div className="space-y-3">
            {blocks.map((block) => (
              <div key={block.id} className="relative group">
                {block.type === 'bullet' ? (
                  <div className="relative">
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      onFocus={() => handleBlockFocus(block.id)}
                      onBlur={handleBlockBlur}
                      className={getBlockClassName(block.type)}
                      placeholder="Bullet point..."
                      rows={1}
                      style={{ 
                        minHeight: '48px',
                        resize: 'none',
                        overflow: 'hidden'
                      }}
                    />
                  </div>
                ) : (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    onFocus={() => handleBlockFocus(block.id)}
                    onBlur={handleBlockBlur}
                    className={getBlockClassName(block.type)}
                    placeholder={`${block.type === 'heading2' ? 'Heading 2' : 
                                  block.type === 'heading3' ? 'Heading 3' : 
                                  'Type / for commands'}`}
                    rows={1}
                    style={{ 
                      minHeight: block.type === 'heading2' ? '56px' :
                                 block.type === 'heading3' ? '52px' : '48px',
                      resize: 'none',
                      overflow: 'hidden'
                    }}
                  />
                )}
                
                {/* Add Button */}
                <button
                  onClick={() => addNewBlock(block.id)}
                  className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                >
                  <Plus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Toolbar */}
      {showToolbar && activeBlock && (
        <div className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/50 shadow-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowTypeSelector(!showTypeSelector)}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Type size={16} className="text-slate-600" />
                <span className="text-sm text-slate-600">Type</span>
              </button>
              <button
                onClick={() => deleteBlock(activeBlock)}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          
          {/* Type Selector */}
          {showTypeSelector && (
            <div className="mt-3 pt-3 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-2">
                {blockTypes.map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => changeBlockType(activeBlock, type)}
                    className="flex items-center space-x-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Icon size={14} className="text-slate-600" />
                    <span className="text-sm text-slate-600">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Add Button */}
      {!showToolbar && (
        <button
          onClick={() => addNewBlock()}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  );
};

export default MobilePreviewPage; 
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Brain, ChevronRight, Edit3, PanelRightClose } from 'lucide-react';
import Button from '../atoms/Button';
import { RightPanelProps } from '../../types/components';

const RightPanel: React.FC<RightPanelProps> = ({
  currentStep,
  selectedMode,
  detailLevel,
  onStepChange,
  onModeChange,
  onDetailLevelChange,
  onMindMap,
  onNext,
  selectedNote,
  onNoteUpdate,
  onToggle
}) => {
  const [localContent, setLocalContent] = useState(selectedNote?.content || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<'memo' | 'phase1' | 'phase2'>('memo');

  // selectedNoteが変更された時にローカル状態を更新（content変更も検知）
  useEffect(() => {
    if (selectedNote) {
      setLocalContent(selectedNote.content || '');
      setHasChanges(false);
    }
  }, [selectedNote?.id, selectedNote?.content]); // content変更も依存配列に追加

  // 内容変更ハンドラー
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    setHasChanges(true);
    
    // リアルタイム更新
    if (onNoteUpdate) {
      onNoteUpdate({ content: newContent });
    }
  };

  const aiModes = [
    'Creative brainstorming',
    'Technical analysis',
    'User experience focus',
    'Business strategy'
  ];

  const requiredInfo = [
    'Target audience definition',
    'Core functionality requirements',
    'Visual style preferences',
    'Technical constraints',
    'Budget considerations',
    'Timeline expectations',
    'Success metrics',
    'Competitive analysis',
    'User journey mapping',
    'Content strategy'
  ];

  return (
    <div className="bg-white rounded-2xl h-full flex flex-col overflow-hidden">
      {/* タブナビゲーション */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          {/* サイドパネル切り替えボタン */}
          <button
            onClick={() => onToggle && onToggle()}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            title="サイドパネルを非表示"
          >
            <PanelRightClose size={16} />
          </button>
          
          <div className="flex space-x-1 bg-slate-100/50 rounded-lg p-1 flex-1">
            <button
              onClick={() => setActiveTab('memo')}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                activeTab === 'memo'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              Memo
              {hasChanges && activeTab !== 'memo' && (
                <span className="ml-1 w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('phase1')}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                activeTab === 'phase1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              Phase1
            </button>
            <button
              onClick={() => setActiveTab('phase2')}
              className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                activeTab === 'phase2'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              Phase2
            </button>
          </div>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 relative overflow-hidden">
        {/* メモセクション */}
        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          activeTab === 'memo' ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full p-6 flex flex-col">
            {/* メモヘッダー - タイトルを表示 */}
            <div className="flex items-center mb-4">
              <Edit3 size={16} className="text-slate-600 mr-2" />
              <h3 className="text-sm font-medium text-slate-800 truncate">
                {selectedNote?.title || 'メモが選択されていません'}
              </h3>
              {hasChanges && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {selectedNote ? (
              <div className="flex-1 min-h-0 flex flex-col">
                {/* 内容入力エリア（スクロール可能） */}
                <div className="flex-1 min-h-0">
                  <textarea
                    value={localContent}
                    onChange={handleContentChange}
                    placeholder="メモの内容を入力してください..."
                    className="w-full h-full px-3 py-3 text-sm text-slate-700 bg-white border-none focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <Edit3 size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">メモが選択されていません</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Phase1セクション */}
        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          activeTab === 'phase1' ? 'translate-x-0' : 
          activeTab === 'memo' ? 'translate-x-full' : '-translate-x-full'
        }`}>
          <div className="h-full overflow-y-auto p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4">Develop an idea</h2>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Select AI mode</h3>
              <div className="space-y-1">
                {aiModes.map((mode, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50/80 transition-all duration-200 border border-transparent hover:border-slate-200/50">
                    <input
                      type="radio"
                      name="aiMode"
                      value={mode}
                      checked={selectedMode === mode}
                      onChange={(e) => onModeChange(e.target.value)}
                      className="w-3 h-3 text-blue-600"
                    />
                    <span className="text-xs text-slate-700">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Detail level</h3>
              <div className="px-1">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={detailLevel}
                  onChange={(e) => onDetailLevelChange(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Basic</span>
                  <span>Detailed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase2セクション */}
        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          activeTab === 'phase2' ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full overflow-y-auto p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4">Create a design</h2>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Required information</h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {requiredInfo.slice(0, 6).map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 opacity-50 p-1 rounded-lg">
                    <input
                      type="checkbox"
                      disabled
                      className="w-3 h-3"
                    />
                    <span className="text-xs text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions - Phase1またはPhase2の時のみ表示 */}
      {(activeTab === 'phase1' || activeTab === 'phase2') && (
        <div className="border-t border-slate-200/50 p-4">
          <div className="flex justify-center items-center space-x-2">
            <Button
              onClick={onMindMap}
              variant="secondary"
              className="flex items-center space-x-1 text-xs px-3 py-2"
            >
              <Brain size={14} strokeWidth={1.5} />
              <span>Mind Map</span>
            </Button>
            <Button
              onClick={() => {
                if (activeTab === 'phase1') {
                  setActiveTab('phase2');
                } else {
                  onNext();
                }
              }}
              variant="primary"
              className="flex items-center space-x-1 text-xs px-3 py-2"
            >
              <span>{activeTab === 'phase1' ? 'Next' : 'Create specification'}</span>
              <ChevronRight size={14} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPanel; 
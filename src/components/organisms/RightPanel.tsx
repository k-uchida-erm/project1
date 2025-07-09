import React from 'react';
import { ChevronLeft, Brain, ChevronRight } from 'lucide-react';
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
  onNext
}) => {
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
    <div 
      className="bg-white rounded-2xl h-full relative overflow-hidden" 
    >
      {/* Step 1 - Develop an idea */}
      <div
        className={`absolute inset-0 transition-transform duration-300 ${
          currentStep === 1 ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-8 pb-20">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Develop an idea</h2>
          
          <div className="mb-6">
            <h3 className="text-base font-semibold text-slate-800 mb-3">Select AI mode</h3>
            <div className="space-y-2">
              {aiModes.map((mode, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50/80 transition-all duration-200 border border-transparent hover:border-slate-200/50">
                  <input
                    type="radio"
                    name="aiMode"
                    value={mode}
                    checked={selectedMode === mode}
                    onChange={(e) => onModeChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-slate-700">{mode}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">Detail level</h3>
            <div className="px-2">
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

      {/* Step 2 - Create a design */}
      <div
        className={`absolute inset-0 transition-transform duration-300 ${
          currentStep === 2 ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-8 pb-20">
          <div className="flex items-center mb-6">
            <Button
              onClick={() => onStepChange(1)}
              variant="ghost"
              className="p-2 mr-3 rounded-xl hover:bg-slate-100/60"
            >
              <ChevronLeft size={20} strokeWidth={1.5} className="text-slate-700" />
            </Button>
            <h2 className="text-lg font-bold text-slate-800">Create a design</h2>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">Required information</h3>
            <div className="space-y-2">
              {requiredInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 opacity-50 p-2 rounded-lg">
                  <input
                    type="checkbox"
                    disabled
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200/50 p-6">
        <div className="flex justify-center items-center space-x-3">
          <Button
            onClick={onMindMap}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <Brain size={16} strokeWidth={1.5} />
            <span>Mind Map</span>
          </Button>
          <Button
            onClick={onNext}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <span>{currentStep === 1 ? 'Next' : 'Create specification'}</span>
            <ChevronRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RightPanel; 
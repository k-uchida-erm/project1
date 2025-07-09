import React, { useState } from 'react';
import { Send, Cpu, FileText, Plus } from 'lucide-react';
import { Message } from '../../types';
import MobileBackButton from '../../components/atoms/MobileBackButton';
import MobileCloseButton from '../../components/atoms/MobileCloseButton';

interface MobileChatPageProps {
  memoTitle: string;
  onClose: () => void;
  onGoToPreview: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  onNavigateToMindMap?: () => void;
}

const MobileChatPage: React.FC<MobileChatPageProps> = ({ 
  memoTitle, 
  onClose, 
  onGoToPreview, 
  onBack, 
  showBackButton = false,
  onNavigateToMindMap
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I can help you develop your ideas and create designs. What would you like to work on today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState('Creative brainstorming');
  const [showSettings, setShowSettings] = useState(false);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      content: currentMessage, 
      isUser: true, 
      timestamp: new Date() 
    }]);
    setCurrentMessage('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're looking for ideas. Let me help you brainstorm some creative solutions based on your input.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      onGoToPreview();
    }
  };

  const modes = [
    'Creative brainstorming',
    'Problem solving',
    'Design thinking',
    'Strategy planning'
  ];

  const handleMindMapClick = () => {
    if (onNavigateToMindMap) {
      onNavigateToMindMap();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton && onBack && (
            <MobileBackButton onClick={onBack} />
          )}
          <div>
            <h1 className="text-lg font-semibold text-slate-800">{memoTitle}</h1>
            <p className="text-sm text-slate-500">Step {currentStep} of 2</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Cpu size={20} className="text-slate-600" />
          </button>
          <MobileCloseButton onClick={onClose} />
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/50 p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mode
            </label>
            <div className="space-y-2">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedMode === mode
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Current mode: {selectedMode}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-xl shadow-sm ${
                message.isUser
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white ml-4'
                  : 'bg-white/90 backdrop-blur-sm text-slate-700 mr-4 border border-slate-200/50'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.isUser ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 bg-white/90 backdrop-blur-sm border-t border-slate-200/50">
        <div className="flex space-x-2 mb-3">
          <button
            onClick={handleMindMapClick}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-600 rounded-xl transition-all duration-200"
          >
            <Plus size={16} />
            <span className="text-sm font-medium">Mind Map</span>
          </button>
          <button
            onClick={handleNextStep}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-600 rounded-xl transition-all duration-200"
          >
            <FileText size={16} />
            <span className="text-sm font-medium">
              {currentStep === 1 ? 'Next Step' : 'Preview'}
            </span>
          </button>
        </div>

        {/* Message Input */}
        <div className="flex items-end space-x-3">
          <div className="flex-1 bg-white rounded-xl border border-slate-200/50 shadow-sm">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-transparent text-slate-800 placeholder-slate-500 resize-none rounded-xl border-none outline-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim()}
            className={`p-3 rounded-xl transition-all duration-200 ${
              currentMessage.trim()
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileChatPage; 
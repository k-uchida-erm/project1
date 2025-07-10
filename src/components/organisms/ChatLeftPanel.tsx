import React, { useRef, useEffect, useState } from 'react';
import { ChatLeftPanelProps } from '../../types/components';
import MessageList from './MessageList';
import MessageInput from '../molecules/MessageInput';
import MarkdownRenderer from '../molecules/MarkdownRenderer';

const ChatLeftPanel: React.FC<ChatLeftPanelProps> = ({
  selectedNote,
  localMessages,
  currentMessage,
  onChangeMessage,
  onSendMessage,
  onKeyPress,
  isAITyping,
  isStreamingText,
  typingMessage,
  typingText,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputHeight, setInputHeight] = useState(80);
  useEffect(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current.offsetHeight);
    }
  }, [currentMessage, isAITyping, isStreamingText]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: `${inputHeight}px` }}
      >
        <MessageList messages={localMessages} />
        {isStreamingText && typingMessage && (
          <div className="max-w-3xl mx-auto px-4 py-2">
            <div className="w-full flex justify-start">
              <div className="max-w-[80%] bg-transparent text-gray-800">
                <div className="prose prose-gray max-w-none prose-p:mb-2 prose-p:leading-relaxed">
                  <MarkdownRenderer content={typingText} />
                  <span className="inline-block w-0.5 h-5 bg-gray-400 ml-1 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        {isAITyping && !isStreamingText && (
          <div className="max-w-3xl mx-auto px-4 py-2">
            <div className="w-full flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={inputRef}>
        <MessageInput
          value={currentMessage}
          onChange={e => onChangeMessage(e.target.value)}
          onSend={onSendMessage}
          onKeyPress={onKeyPress}
          isLoading={isAITyping || isStreamingText}
          rounded="rounded-3xl"
          className="shadow-xl"
        />
      </div>
    </div>
  );
};

export default ChatLeftPanel; 
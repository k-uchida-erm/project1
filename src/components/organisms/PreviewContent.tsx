import React, { useState } from 'react';
import { PreviewContentProps } from '../../types/components';

const PreviewContent: React.FC<PreviewContentProps> = ({ content, onChange }) => {
  const [localContent, setLocalContent] = useState(content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    onChange(newContent);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="prose max-w-none">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            プレビューコンテンツ
          </h1>
        </div>
        
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <textarea
            className="w-full h-96 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="ここにコンテンツを入力してください..."
            value={localContent}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewContent; 
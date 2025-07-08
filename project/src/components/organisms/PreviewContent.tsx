import React from 'react';

const PreviewContent: React.FC = () => {
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

export default PreviewContent; 
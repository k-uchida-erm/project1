import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const components: Components = {
    // ヘッダー要素 - より大きく、読みやすく
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-4 mt-6 text-gray-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mb-3 mt-5 text-gray-900 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-900 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold mb-2 mt-3 text-gray-900 leading-tight">
        {children}
      </h4>
    ),
    
    // パラグラフ - 行間・段落間の余白をしっかり（小さめ）
    p: ({ children }) => (
      <p className="mb-5 leading-relaxed text-gray-800 text-base">
        {children}
      </p>
    ),
    
    // リスト - 余白を広めに（小さめ）
    ul: ({ children }) => (
      <ul className="list-disc list-outside mb-5 ml-8 space-y-2 text-base">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside mb-5 ml-8 space-y-2 text-base">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base text-gray-800 leading-relaxed">
        {children}
      </li>
    ),
    
    // 引用 - 余白を広めに（小さめ）
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 py-3 my-6 text-gray-700 italic bg-gray-50 rounded-r-md text-base">
        {children}
      </blockquote>
    ),
    
    // コードブロック - 余白を広めに（小さめ）
    code: ({ children, className, ...props }) => {
      const isInline = !className?.includes('language-');
      return isInline ? (
        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm font-mono border" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-gray-900 text-gray-100 p-5 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto my-6 leading-relaxed" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-gray-900 p-5 rounded-lg my-6 overflow-x-auto border text-sm">
        {children}
      </pre>
    ),
    
    // テキスト装飾
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-800">
        {children}
      </em>
    ),
    
    // リンク
    a: ({ href, children }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
      >
        {children}
      </a>
    ),
    
    // テーブル - 余白を広めに（小さめ）
    table: ({ children }) => (
      <div className="overflow-x-auto my-8">
        <table className="min-w-full border border-gray-200 rounded-lg text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-left text-gray-900 bg-gray-50">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-800">
        {children}
      </td>
    ),
    
    // 水平線
    hr: () => (
      <hr className="my-6 border-gray-200" />
    ),
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 
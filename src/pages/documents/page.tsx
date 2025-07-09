import React, { useState } from 'react';
import { FileText, Plus, Eye, Edit3, Trash2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Button from '../../components/atoms/Button';

interface DocumentsPageProps {
  onClose: () => void;
  onNavigateToPreview: (docId: string) => void;
  onBackToDashboard: () => void;
}

interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ onClose, onNavigateToPreview, onBackToDashboard }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Sample Document',
      content: 'This is a sample document content...',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      title: 'Project Proposal',
      content: 'Project proposal document with detailed specifications...',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      title: 'Meeting Notes',
      content: 'Notes from the team meeting on project progress...',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-16')
    }
  ]);

  const handleCreateNew = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title: 'Untitled Document',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`h-screen bg-gradient-to-br from-slate-100 via-blue-50/40 to-indigo-100/60 overflow-hidden font-['Noto_Sans',sans-serif] text-sm leading-relaxed ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* Sidebar */}
      <Sidebar 
        expanded={sidebarExpanded}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        onNavigateToDashboard={onBackToDashboard}
        onNavigateToDocuments={() => {}}
      />

      {/* Header */}
      <Header 
        title="Documents"
        onClose={onClose}
        onBack={onBackToDashboard}
        showBackButton={true}
      />

      {/* Main Content */}
      <div className="fixed inset-0" style={{ top: '56px', height: 'calc(100vh - 56px)', left: '80px' }}>
        <div className="w-full h-full overflow-y-auto p-8">
          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">All Documents</h2>
              <p className="text-slate-600">{documents.length} document{documents.length !== 1 ? 's' : ''}</p>
            </div>
            <Button
              onClick={handleCreateNew}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <Plus size={16} strokeWidth={1.5} />
              <span>New Document</span>
            </Button>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 hover:shadow-xl hover:bg-white/90 transition-all duration-300 group cursor-pointer transform hover:scale-105"
              >
                {/* Document Icon */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <FileText size={20} className="text-blue-600" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 truncate">{doc.title}</h3>
                    <p className="text-xs text-slate-500">Updated {formatDate(doc.updatedAt)}</p>
                  </div>
                </div>

                {/* Document Preview */}
                <p className="text-sm text-slate-600 line-clamp-3 mb-4 h-16 overflow-hidden">
                  {doc.content || 'No content yet...'}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToPreview(doc.id);
                      }}
                      className="p-2 hover:bg-blue-100/60 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200/50"
                      title="View"
                    >
                      <Eye size={16} strokeWidth={1.5} className="text-slate-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit functionality
                        console.log('Edit document:', doc.id);
                      }}
                      className="p-2 hover:bg-emerald-100/60 rounded-lg transition-all duration-200 border border-transparent hover:border-emerald-200/50"
                      title="Edit"
                    >
                      <Edit3 size={16} strokeWidth={1.5} className="text-slate-700" />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDocument(doc.id);
                    }}
                    className="p-2 hover:bg-red-100/60 text-red-600 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200/50"
                    title="Delete"
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {documents.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={24} className="text-slate-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No documents yet</h3>
                <p className="text-slate-500 mb-6">Create your first document to get started</p>
                <Button
                  onClick={handleCreateNew}
                  variant="primary"
                  className="flex items-center space-x-2"
                >
                  <Plus size={16} strokeWidth={1.5} />
                  <span>Create Document</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage; 
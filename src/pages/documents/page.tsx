import React, { useState } from 'react';
import { Search, FileText, MoreVertical, Trash2, Download, Share2, Edit3, Filter, Plus, Eye } from 'lucide-react';
import PageLayout from '../../components/layouts/PageLayout';
import { DocumentsPageProps } from '../../types/pages';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Button from '../../components/atoms/Button';
import { useDocuments } from '../../hooks/useDocuments';

const DocumentsPage: React.FC<DocumentsPageProps> = ({ onBack, onNavigateToPreview }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { documents, loading, error, createDocument, deleteDocument } = useDocuments();

  const handleCreateNew = async () => {
    try {
      await createDocument({
        title: 'Untitled Document',
        content: ''
      });
    } catch (err) {
      console.error('Failed to create document:', err);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    try {
      await deleteDocument(docId);
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600">データを読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">エラー: {error}</div>
      </div>
    );
  }

  return (
    <div className={`h-screen bg-gradient-to-br from-slate-100 via-blue-50/40 to-indigo-100/60 overflow-hidden font-['Noto_Sans',sans-serif] text-sm leading-relaxed ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* 白背景オーバーレイ */}
      <div className="fixed inset-0 bg-white"></div>
      
      {/* Sidebar */}
      <Sidebar 
        expanded={sidebarExpanded}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        onNavigateToDashboard={onBack}
        onNavigateToDocuments={() => {}}
        mobileVisible={mobileMenuVisible}
        onMobileClose={() => setMobileMenuVisible(false)}
      />

      {/* Header */}
      <Header 
        title="Documents"
        onClose={() => {}}
        onBack={onBack}
        showBackButton={true}
        onMenuClick={() => setMobileMenuVisible(true)}
      />

      {/* Main Content */}
      <div className="relative z-10 fixed inset-0" style={{ top: '64px', height: 'calc(100vh - 64px)', paddingLeft: 'var(--content-left-offset)', paddingRight: 'var(--content-left-offset)' }}>
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
                        if (onNavigateToPreview) {
                          onNavigateToPreview(doc.id);
                        }
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
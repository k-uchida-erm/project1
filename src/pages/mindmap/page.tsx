import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Plus, Minus, RotateCcw, Download, Share2, Settings, ZoomIn, ZoomOut } from 'lucide-react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import PageLayout from '../../components/layouts/PageLayout';
import { StickyNote } from '../../types';
import { MindMapPageProps } from '../../types/pages';

// カスタムノードコンポーネント
const MindMapNode = ({ data }: { data: any }) => {
  const isMainNode = data.type === 'main';
  
  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl border-2 bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
      isMainNode 
        ? 'border-blue-500/50 min-w-[200px]' 
        : 'border-slate-300/50 min-w-[150px]'
    }`}>
      <div className={`font-semibold text-center ${
        isMainNode ? 'text-lg text-blue-700' : 'text-sm text-slate-700'
      }`}>
        {data.label}
      </div>
      {data.description && (
        <div className="text-xs text-slate-500 mt-1 text-center">
          {data.description}
        </div>
      )}
    </div>
  );
};

// ノードタイプを定義
const nodeTypes: NodeTypes = {
  mindMapNode: MindMapNode,
};

const MindMapPage: React.FC<MindMapPageProps> = ({ selectedNote, onBack }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // サンプルデータ（実際はnoteの内容から生成）
  const initialNodes: Node[] = [
    // メインノード（中央）
    {
      id: '1',
      type: 'mindMapNode',
      position: { x: 400, y: 300 },
      data: { 
        label: selectedNote?.title || 'メインアイデア',
        description: '中心となる概念',
        type: 'main'
      },
      draggable: true,
    },
    // サブノード
    {
      id: '2',
      type: 'mindMapNode',
      position: { x: 100, y: 100 },
      data: { 
        label: '関連アイデア 1',
        description: '詳細な説明',
        type: 'sub'
      },
      draggable: true,
    },
    {
      id: '3',
      type: 'mindMapNode',
      position: { x: 700, y: 150 },
      data: { 
        label: '関連アイデア 2',
        description: '別の観点',
        type: 'sub'
      },
      draggable: true,
    },
    {
      id: '4',
      type: 'mindMapNode',
      position: { x: 200, y: 500 },
      data: { 
        label: '実装方法',
        description: '具体的な手段',
        type: 'sub'
      },
      draggable: true,
    },
    {
      id: '5',
      type: 'mindMapNode',
      position: { x: 600, y: 450 },
      data: { 
        label: '期待される効果',
        description: '目標・成果',
        type: 'sub'
      },
      draggable: true,
    },
    {
      id: '6',
      type: 'mindMapNode',
      position: { x: 50, y: 300 },
      data: { 
        label: '課題・問題',
        description: '解決すべき点',
        type: 'sub'
      },
      draggable: true,
    },
    {
      id: '7',
      type: 'mindMapNode',
      position: { x: 750, y: 350 },
      data: { 
        label: '次のステップ',
        description: 'アクションアイテム',
        type: 'sub'
      },
      draggable: true,
    },
  ];

  const initialEdges: Edge[] = [
    // メインノードから各サブノードへの接続
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      style: { stroke: '#64748b', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'smoothstep',
      style: { stroke: '#64748b', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e1-4',
      source: '1',
      target: '4',
      type: 'smoothstep',
      style: { stroke: '#64748b', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e1-5',
      source: '1',
      target: '5',
      type: 'smoothstep',
      style: { stroke: '#64748b', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e1-6',
      source: '1',
      target: '6',
      type: 'smoothstep',
      style: { stroke: '#64748b', strokeWidth: 2 },
      animated: false,
    },
    {
      id: 'e1-7',
      source: '1',
      target: '7',
      type: 'smoothstep',
      style: { stroke: '#64748b', strokeWidth: 2 },
      animated: false,
    },
    // サブノード間の関係
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      type: 'smoothstep',
      style: { stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '5,5' },
      animated: false,
    },
    {
      id: 'e3-5',
      source: '3',
      target: '5',
      type: 'smoothstep',
      style: { stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '5,5' },
      animated: false,
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <PageLayout
      title="Mind Map"
      onClose={() => console.log('Close')}
      onBack={onBack}
      showBackButton={true}
      sidebarExpanded={sidebarExpanded}
      onSidebarMouseEnter={() => setSidebarExpanded(true)}
      onSidebarMouseLeave={() => setSidebarExpanded(false)}
    >
      <div className="h-full w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
          minZoom={0.3}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Controls 
            className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg"
            showInteractive={false}
          />
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            className="opacity-30"
          />
        </ReactFlow>
      </div>
    </PageLayout>
  );
};

export default MindMapPage; 
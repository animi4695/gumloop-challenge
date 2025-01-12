import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { RunButton } from "./components/RunButton";
import { RunReportPanel } from "./components/RunReportPanel";
import { Logo } from "./components/Logo";

import { buildTreeLayout } from "./layouts/tree";
import { buildDiagonalLayout, buildHorizontalLayout, buildVerticalLayout } from "./layouts/horizontal";
import { ThemesPanel } from "./components/ThemesPanel";
import { ThemesPanelOpenButton } from "./components/ThemesPanelOpenButton";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isThemesPanelOpen, setIsThemesPanelOpen] = useState(true);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const updateNodesLayout = (id: number) => {
    console.log('Initial Nodes:', nodes);
    var updatedNodes = nodes;

    if(id === 1) {
      updatedNodes = buildTreeLayout(nodes, 200, 100);
    } else if(id === 2) {
      updatedNodes = buildHorizontalLayout(nodes, 200);
    } else if(id === 3) {
      updatedNodes = buildVerticalLayout(nodes, 200, 100);
    }
    else if(id === 4) {
      updatedNodes = buildDiagonalLayout(nodes, 100, 80);
    }

    setNodes(updatedNodes);
    
    return updatedNodes;
  };
  

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Logo />
      
      <RunButton onRun={() => setIsPanelOpen(true)} />
      <RunReportPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />

      <ThemesPanelOpenButton isOpen = {isThemesPanelOpen} onOpen={() => setIsThemesPanelOpen(!isThemesPanelOpen)} />
      <ThemesPanel isOpen={isThemesPanelOpen} onClose={() => setIsThemesPanelOpen(false)} onThemeClick={updateNodesLayout} />
    </ReactFlow>
  );
}

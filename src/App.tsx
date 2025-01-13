import { useCallback, useEffect, useState } from "react";
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
import { useStore, usePlaylistStore } from "./store";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isThemesPanelOpen, setIsThemesPanelOpen] = useState(false);
  // const [playlistid, setPlaylistId] = useState(null);

  const playlistId = usePlaylistStore((state) => state.playlistId);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  // PLgBV6dl98LOFDeCAT_guiQAzVRhPJfLMi
  

  const updateNodesLayout = (id: number) => {
    console.log('Initial Nodes:', nodes);
    var updatedNodes = nodes;

    if(id === 1) {
      updatedNodes = buildTreeLayout(nodes, 300, 100);
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

  const fetchAndProcessHtml = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/fetch-html?playlistid=' + playlistId
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const html = await response.text(); // Retrieve HTML content as text
      getTrackDetails(html); // Process the HTML content
    } catch (error) {
      console.error('Failed to fetch HTML:', error);
    }
  }
  
  const getTrackDetails = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const items = doc.querySelectorAll("ytmusic-responsive-list-item-renderer");
    const details = Array.from(items).map((item) => {
      const formattedStrings = item.querySelectorAll(
        "yt-formatted-string[title]"
      );
      return {
        title: formattedStrings[0]?.getAttribute("title") || null, // Main title
        artist: formattedStrings[1]?.getAttribute("title") || null, // Artist
        album: formattedStrings[2]?.getAttribute("title") || null, // Album
        time: formattedStrings[3]?.getAttribute("title") || null, // Time
      };
    });

    console.log("Extracted Details:", details);
    return details;
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
      
      <RunButton onRun={() => {
        setIsPanelOpen(true);
        fetchAndProcessHtml();
      }} />
      <RunReportPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />

      <ThemesPanelOpenButton isOpen = {isThemesPanelOpen} onOpen={() => setIsThemesPanelOpen(!isThemesPanelOpen)} />
      <ThemesPanel isOpen={isThemesPanelOpen} onClose={() => setIsThemesPanelOpen(false)} onThemeClick={updateNodesLayout} />
    </ReactFlow>
  );
}

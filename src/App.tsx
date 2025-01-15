import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  useHandleConnections,
  getIncomers,
  useNodesData,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// import { nodeTypes } from "./nodes";
import { AppState, AppNode, nodeTypes } from './nodes/types';
import { edgeTypes } from "./edges";
import { RunButton } from "./components/RunButton";
import { RunReportPanel } from "./components/RunReportPanel";
import { Logo } from "./components/Logo";

import { buildTreeLayout } from "./layouts/tree";
import { buildDiagonalLayout, buildHorizontalLayout, buildVerticalLayout } from "./layouts/horizontal";
import { ThemesPanel } from "./components/ThemesPanel";
import { ThemesPanelOpenButton } from "./components/ThemesPanelOpenButton";
import useGumloopStore, { useHtmlStore, usePlaylistStore } from "./store";
import { useShallow } from "zustand/shallow";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import SpotifySdkSingleton from "./spotify";

 
const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});


export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useGumloopStore(useShallow(selector));

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isThemesPanelOpen, setIsThemesPanelOpen] = useState(false);

  const setSpotifyToken = usePlaylistStore((state) => state.updateSpotifyToken);

  const playlistId = usePlaylistStore((state) => state.playlistId);
  const outputFileName = usePlaylistStore((state) => state.outputFileName);
  const htmlContent = useHtmlStore((state) => state.htmlContent);

  // TODO change this to a env variable
  const fetchPlayListURL = 'http://localhost:3000/api/fetch-html?playlistid=';

  const spotifyTokenType = useGumloopStore((state) => state.tokenType);
  const spotifyTokenExpiresIn = useGumloopStore((state) => state.expiresIn);
  const spotifyClientId = useGumloopStore((state) => state.clientId);

  const updateSpotifyToken = useGumloopStore((state) => state.updateSpotifyToken);
  const updateSpotifyTokenMetadata = useGumloopStore((state) => state.updateSpotifyTokenMetadata);


  // const nodeData = useNodesData('custom-1');
  // // PLgBV6dl98LOFDeCAT_guiQAzVRhPJfLMi
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Remove the "#" and parse
      const params = new URLSearchParams(hash.substring(1)); 
      const token = params.get("access_token");
      const tokenType = params.get("token_type") || "Bearer";
      const expiresIn = params.get("expires_in") || "3600";
      
      if (token) {
        updateSpotifyToken('custom-3', token);
        updateSpotifyTokenMetadata(token, tokenType, parseInt(expiresIn));

        if (token && tokenType && expiresIn) {
          const sdk = SpotifySdkSingleton.getInstance('', {
            access_token: token, token_type: tokenType, expires_in: parseInt(expiresIn),
            refresh_token: ""
          });

          sdk.currentUser.profile().then((profile) => {
            console.log("Profile:", profile);
          });
        }
        console.log("Spotify Access Token:", token);
        // window.location.hash = "";
      }
    }
  }, []);

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

    // setNodes(updatedNodes);
    
    return updatedNodes;
  };

  // const updateNode = (nodeId: string, updater: (node: AppNode) => AppNode): void => {
  //   setNodes((nds) =>
  //     nds.map((node) =>
  //       node.id === nodeId ? updater(node) : node
  //     ) as AppNode[]
  //   );
  // };

  
  // const updateNodeData = (nodeId: string, key: string, value: any) => {
  //   setNodes((nds) =>
  //     nds.map((node) =>
  //       node.id === nodeId
  //         ? {
  //           ...node,
  //           data: {
  //             ...node.data,
  //             [key]: value,
  //           },
  //         }
  //         : node
  //     ) as AppNode[]
  //   );
  // };

  // const updateNodeOutput = (nodeId: string, outputName: string, newValue: any) => {
  //   setNodes((nds) =>
  //     nds.map((node) =>
  //       node.id === nodeId && 'output' in node.data
  //         ? {
  //             ...node,
  //             data: {
  //               ...node.data,
  //               output: (node.data.output as { name: string; value: any }[]).map((output) =>
  //                 output.name === outputName
  //                   ? { ...output, value: newValue } // Return updated output object
  //                   : output // Return the original output object if no match
  //               ),
  //             },
  //           }
  //         : node
  //     ) as AppNode[]
  //   );
  // };
  
  // useEffect(() => {
  //   console.log('Nodes:', nodes);
  // });

  const runFlow = async () => {
    console.log('Running flow...');
    console.log('nodes:', nodes);

    const nodeMap = new Map(nodes.map((node: AppNode) => [node.id, node]));

    const executeNode = async (nodeId: string) => {

      const state = useGumloopStore.getState();

      const node = nodeMap.get(nodeId);
      if (!node) {
        throw new Error(`Node with ID ${nodeId} not found`);
      }
  
      console.log(`Executing Node ${nodeId}`);

      switch (node.type) {
        case 'youtube-node':
          if('execute' in node.data) {
            const incomers = getIncomers(node, state.nodes, state.edges);
            console.log('Incomers:', incomers);
            let data = 'output' in incomers[0].data ? incomers[0].data.output[0].value : null;

            const tracks = await node.data.execute(node.id, data);
            console.log('Tracks:', tracks);
            state.updateCustomNode(node.id, 'tracks', tracks);
            
            const updatedNode = useGumloopStore.getState().nodes.find((n) => n.id === node.id);
            console.log('youtube-node Updated Node:', updatedNode);

            return tracks;
          }
          break;
        case 'output-node':
          if('execute' in node.data) {
            // get incomers data and pass to execute function
            const incomers = getIncomers(node, state.nodes, state.edges);
            console.log('Incomers:', incomers);
            const data = 'output' in incomers[0].data ? incomers[0].data.output[0].value : null;
            return await node.data.execute(nodeId, node.data.outputFileName, data);
          }
          break;
        case 'spotify-search-track-node':
          if('execute' in node.data) {
            const incomers = getIncomers(node, state.nodes, state.edges);
            console.log('Incomers:', incomers);
            // get bearerToken from spotify-input-node
            // get incommer of type spotify-input-node
            const spotifyIncommer = incomers.find((incomer) => incomer.type === 'spotify-input-node');

            if (!spotifyIncommer) {
              throw new Error('No spotify-input-node found');
            }
            const bearerToken = 'bearerToken' in spotifyIncommer.data ? spotifyIncommer.data.bearerToken : "";

            // get incommer of type youtube-node
            const youtubeIncommer = incomers.find((incomer) => incomer.type === 'youtube-node');
            if (!youtubeIncommer) {
              throw new Error('No youtube-node found');
            }

            let youtubeTracks = 'output' in youtubeIncommer.data ? youtubeIncommer.data.output[0].value : null;

            const sdk = SpotifySdkSingleton.getInstance('', {
              access_token: bearerToken, token_type: spotifyTokenType, expires_in: spotifyTokenExpiresIn,refresh_token: ""
            });

            if(!sdk) {
              throw new Error('Spotify SDK not initialized');
            }
            
            const tracks = await node.data.execute(node.id, sdk, youtubeTracks);
            console.log('Tracks:', tracks);
            state.updateCustomNode(node.id, 'tracks', tracks);
            
            const updatedNode = useGumloopStore.getState().nodes.find((n) => n.id === node.id);
            console.log('spotify-search-track-node Updated Node:', updatedNode);

            return tracks;
          }
          break;
        default:
          break;
      }
      return null;
    };

    // In our flow, we have only 2 types of root nodes: custom-input-node and spotify-input-node
    const inputNodes = nodes.filter((node: any) => node.type === 'custom-input-node' || node.type === 'spotify-input-node');
    console.log('root nodes:', inputNodes);

    const visited = new Set();
    let currentLevelNodes = inputNodes; 

    while (currentLevelNodes.length > 0) {
      const nextLevelNodes = [];
  
      for (const node of currentLevelNodes) {
        if (visited.has(node.id)) continue;
  
        visited.add(node.id);
  
        // Execute the current node
        const result = await executeNode(node.id);
        console.log('execute result:', result);
  
        // Find downstream nodes (nodes connected via outgoing edges)
        const downstreamEdges = edges.filter((edge) => edge.source === node.id);
  
        for (const edge of downstreamEdges) {
          const downstreamNode = nodeMap.get(edge.target);
          if (downstreamNode && !visited.has(downstreamNode.id)) {
            // Pass the result of this node to the downstream node
            // downstreamNode.data.input = result;
            nextLevelNodes.push(downstreamNode);
          }
        }
      }
  
      // Move to the next level
      currentLevelNodes = nextLevelNodes;
    }

    console.log('Flow completed.');
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
        runFlow();
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

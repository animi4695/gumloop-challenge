import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  getIncomers,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// import { nodeTypes } from "./nodes";
import { AppState, AppNode, nodeTypes } from './nodes/types';
import { edgeTypes } from "./edges";
import { RunButton } from "./components/RunButton";
import { RunReportPanel } from "./components/RunReportPanel";
import { Logo } from "./components/Logo";
import { SettingsPanel } from "./components/SettingsPanel";
import { SettingsPanelOpenButton } from "./components/SettingsPanelOpenButton";
import useGumloopStore from "./store";
import { useShallow } from "zustand/shallow";
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

  const spotifyTokenType = useGumloopStore((state) => state.tokenType);
  const spotifyTokenExpiresIn = useGumloopStore((state) => state.expiresIn);
  const spotifyClientId = useGumloopStore((state) => state.clientId);

  const resetNodeOutputs = useGumloopStore((state) => state.resetNodeOutputs);
  const setNodeOutput = useGumloopStore((state) => state.setNodeOutput);
  const setNodeOutputStatus = useGumloopStore((state) => state.setNodeOutputStatus);
  const setNodeOutputTime = useGumloopStore((state) => state.setNodeOutputTime);
  const setFinalOutput = useGumloopStore((state) => state.setOutputDownloadLink); 

  const updateSpotifyToken = useGumloopStore((state) => state.updateSpotifyToken);
  const updateSpotifyTokenMetadata = useGumloopStore((state) => state.updateSpotifyTokenMetadata);

  // // sample playlistid PLgBV6dl98LOFDeCAT_guiQAzVRhPJfLMi

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
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
        window.location.hash = "";
      }
    }
  }, []);

  const runFlow = async () => {
    console.log('Running flow...');
    console.log('nodes:', nodes);
    console.log('edges:', edges);
    resetNodeOutputs();

    const nodeMap = new Map(nodes.map((node: AppNode) => [node.id, node]));

    const executeNode = async (nodeId: string) => {

      const state = useGumloopStore.getState();

      const node = nodeMap.get(nodeId);
      if (!node) {
        throw new Error(`Node with ID ${nodeId} not found`);
      }

      console.log(`Executing Node ${nodeId}`);

      // TODO - maybe make the inputs to a node more generic. come back later...
      switch (node.type) {
        case 'youtube-node':
          if ('execute' in node.data) {
            const incomers = getIncomers(node, state.nodes, state.edges);
            console.log('Incomers:', incomers);
            // we need playlistId or htmlContent. if playlistId is set, use that. if not, use the htmlContent
            // playlistId and htmlContent are in incommers data.output array with name playlistId and htmlContent and values in value property
            let tracks: any;

            if ('output' in incomers[0].data && incomers[0].data.output[0].name === 'playlistId' && incomers[0].data.output[0].value != "") {
              const playlistId = incomers[0].data.output[0].value;
              tracks = await node.data.execute(node.id, 'playlistId', playlistId);
              console.log('Tracks from playlistid:', tracks);
              state.updateCustomNode(node.id, 'tracks', tracks);
            }
            else if (incomers[0] && 'output' in incomers[0].data && incomers[0].data.output[1] && incomers[0].data.output[1].name === 'htmlContent' && incomers[0].data.output[1].value) {
              const htmlContent = incomers[0].data.output[1].value;
              tracks = await node.data.execute(node.id, 'htmlContent',htmlContent);
              console.log('Tracks from htmlContent:', tracks);
              state.updateCustomNode(node.id, 'tracks', tracks);
            }
            else {
              throw new Error('No playlistId or htmlContent found in incomers');
            }

            const updatedNode = useGumloopStore.getState().nodes.find((n) => n.id === node.id);
            console.log('youtube-node Updated Node:', updatedNode);

            return tracks;
          }
          break;
        case 'output-node':
          if ('execute' in node.data) {
            // get incomers data and pass to execute function
            const incomers = getIncomers(node, state.nodes, state.edges);
            console.log('Incomers:', incomers);
            const data = 'output' in incomers[0].data ? incomers[0].data.output[0].value : null;
            setFinalOutput(await node.data.execute(nodeId, node.data.outputFileName, data));
          }
          break;
        case 'spotify-search-track-node':
          if ('execute' in node.data) {
            const incomers = getIncomers(node, state.nodes, state.edges);
            console.log('Incomers:', incomers);
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

            const sdk = SpotifySdkSingleton.getInstance(spotifyClientId, {
              access_token: bearerToken, token_type: spotifyTokenType, expires_in: spotifyTokenExpiresIn, refresh_token: ""
            });

            if (!sdk) {
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
        case 'spotify-create-track-node':
          if ('execute' in node.data) {
            const incomers = getIncomers(node, state.nodes, state.edges);
            console.log('Incomers:', incomers);

            // get incommer of type spotify-input-node
            const spotifyIncommer = incomers.find((incomer) => incomer.type === 'spotify-input-node');

            if (!spotifyIncommer) {
              throw new Error('No spotify-input-node found');
            }
            const bearerToken = 'bearerToken' in spotifyIncommer.data ? spotifyIncommer.data.bearerToken : "";

            if (!bearerToken) {
              throw new Error('No bearer token found');
            }
            // get incommer of type spotify-search-track-node
            const spotifySearchTrackIncommer = incomers.find((incomer) => incomer.type === 'spotify-search-track-node');
            if (!spotifySearchTrackIncommer) {
              throw new Error('No spotify-search-track-node found');
            }

            let searchedSpotifyTracks = 'output' in spotifySearchTrackIncommer.data ? spotifySearchTrackIncommer.data.output[0].value : null;

            const sdk = SpotifySdkSingleton.getInstance(spotifyClientId, {
              access_token: bearerToken, token_type: spotifyTokenType, expires_in: spotifyTokenExpiresIn, refresh_token: ""
            });

            if (!sdk) {
              throw new Error('Spotify SDK not initialized');
            }

            const tracks = await node.data.execute(node.id, sdk, node.data.playlistName, searchedSpotifyTracks);
            console.log('Tracks:', tracks);
            state.updateCustomNode(node.id, 'tracks', tracks);

            const updatedNode = useGumloopStore.getState().nodes.find((n) => n.id === node.id);
            console.log('spotify-create-track-node Updated Node:', updatedNode);

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

        setNodeOutput(node.id, { id: node.id, label: node.data.label, output: '', status: 'RUNNING', logs: ["Started Running Node"], time: 0 });

        const startTime = Date.now();

        try {
          const result = await executeNode(node.id);
          console.log('execute result:', result);
          setNodeOutputStatus(node.id, 'SUCCESS');
        }
        catch (error) {
          console.log(error);
          setNodeOutputStatus(node.id, 'FAILED');
          throw error;
        }
        finally {
          const endTime = Date.now();
          const executionTime = Math.round((endTime - startTime) / 1000 * 100) / 100;
          setNodeOutputTime(node.id, executionTime);
        }

        const downstreamEdges = edges.filter((edge) => edge.source === node.id);

        for (const edge of downstreamEdges) {
          const downstreamNode = nodeMap.get(edge.target);
          if (downstreamNode && !visited.has(downstreamNode.id)) {
            nextLevelNodes.push(downstreamNode);
          }
        }
      }

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
      nodesConnectable={false}
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
      <SettingsPanelOpenButton isOpen={isThemesPanelOpen} onOpen={() => setIsThemesPanelOpen(!isThemesPanelOpen)} />
      <SettingsPanel isOpen={isThemesPanelOpen} onClose={() => setIsThemesPanelOpen(false)} />
    </ReactFlow>
  );
}

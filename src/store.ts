import { create } from 'zustand'

import { addEdge, applyNodeChanges, applyEdgeChanges, Edge } from '@xyflow/react';
 
import { initialNodes } from './nodes';
import { initialEdges } from './edges';
import { AppNode, AppState } from './nodes/types';


const useGumloopStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  clientId: "d0429ee040f54ec7b068dcf55211712c",
  redirectUri:"http://localhost:5173/callback",
  tokenType: "Bearer",
  expiresIn: 3600,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  updateSpotifyTokenMetadata: (spotifyToken: string, tokenType: string, expiresIn: number) => {
    set((state) => ({
      ...state,
      spotifyToken: spotifyToken,
      tokenType: tokenType,
      expiresIn: expiresIn
    }));
  },
  updateNodeData: (nodeId: string, dataUpdater: (data: any) => any) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          // Update only the specific node's data
          return { ...node, data: dataUpdater(node.data) };
        }
        return node;
      }),
    }));
  },
  updateCustomNode : (nodeId: string, newOutputName: string, newOutputValue: any) => {
    useGumloopStore.getState().updateNodeData(nodeId, (data) => ({
        ...data,
        output: data.output.map((output: any) =>
            output.name === newOutputName ? { ...output, value: newOutputValue } : output
        ),
    }));
  },
  updateOutputNodeFileName: (nodeId: string, outputFileName: string) => {
    useGumloopStore.getState().updateNodeData(nodeId, (data) => ({
        ...data,
        outputFileName: outputFileName
    }));
  },
  updateSpotifyToken: (nodeId: string, spotifyToken: string) => {
    useGumloopStore.getState().updateNodeData(nodeId, (data) => ({
        ...data,
        bearerToken: spotifyToken
    }));
  },
  updateSpotifyPlaylistName: (nodeId: string, spotifyPlaylistName: string) => {
    useGumloopStore.getState().updateNodeData(nodeId, (data) => ({
        ...data,
        playlistName: spotifyPlaylistName
    }));
  },
  getSpotifyToken: (nodeId: string) => {
    const node = useGumloopStore.getState().nodes.find(node => node.id === nodeId);
    if (node && 'bearerToken' in node.data) {
        return node.data.bearerToken;
    }
    return undefined;
  },
}));
 
export default useGumloopStore;

// export const updateCustomNode = (nodeId: string, newOutputValue: any) => {
//     useGumloopStore.getState().updateNodeData(nodeId, (data) => ({
//         ...data,
//         output: data.output.map((output: any) =>
//             output.name === "playlistId" ? { ...output, value: newOutputValue } : output
//         ),
//     }));
// };

type State = {
    playlistId: string
    outputFileName: string
    spotifyToken: string
    spotifyPlaylistName: string
}

type Action = {
    updatePlaylistId: (playlistId: State['playlistId']) => void
    updateOutputFileName: (outputFileName: State['outputFileName']) => void
    updateSpotifyToken: (spotifyToken: State['spotifyToken']) => void
    updateSpotifyPlaylistName: (spotifyPlaylistName: State['spotifyPlaylistName']) => void
}

// "PLgBV6dl98LOFDeCAT_guiQAzVRhPJfLMi",
export const usePlaylistStore = create<State & Action>((set) => ({
    playlistId: "",
    outputFileName: "",
    spotifyToken: "",
    spotifyPlaylistName: "",
    updatePlaylistId: (playlistId) => set(() => ({ playlistId: playlistId })),
    updateOutputFileName: (outputFileName) => set(() => ({ outputFileName: outputFileName })),
    updateSpotifyToken: (spotifyToken) => set(() => ({ spotifyToken: spotifyToken })),
    updateSpotifyPlaylistName: (spotifyPlaylistName) => set(() => ({ spotifyPlaylistName: spotifyPlaylistName })),
}))


type HtmlStore = {
    htmlContent: string;
    setHtmlContent: (html: string) => void;
}

export const useHtmlStore = create<HtmlStore>((set) => ({
    htmlContent: "",
    setHtmlContent: (html) => set({ htmlContent: html }),
}));
  
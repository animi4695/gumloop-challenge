import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, BuiltInNode } from "@xyflow/react";
import PlayListInputNode from "../components/PlayListInputNode";
import OutputNode from "../components/OutputNode";
import SpotifySearchTrackNode from "../components/SpotifySearchNode";
import SpotifyCreateTrackNode from "../components/SpotifyCreateTrackNode";
import type { NodeTypes } from "@xyflow/react";
import YoutubeNodeComponent from "../components/YoutubeNode";
import SpotifyInputNode from "../components/SpotifyInputNode";
import SpotifyInputNodeComponent from "../components/SpotifyInputNode";
import SpotifySearchTrackNodeComponent from "../components/SpotifySearchNode";
export type FunctionNode = Node<
  {
    label: string;
    func?: (input: any) => any;
    functionName: string;
  },
  "function-node"
>;

export type CustomNode = Node<
  {
    label: string;
    description: string;
    output: [
      {
        name: string;
        value: any;
      }
    ]
  },
  "custom-input-node"
>;

export type YoutubeNode = Node<
  {
    label: string;
    description: string;
    output: [
      {
        name: string;
        value: any;
      }
    ],
    execute: (id : string, playlistId : string) => void;
  },
  "youtube-node"
>;

export type SpotifyInputNode = Node<
  {
    label: string;
    description: string;
    bearerToken: string;
    playlistName: string;
  },
  "spotify-input-node"
>;

export type OutputNode = Node<
  {
    label: string;
    outputFileName: string;
    execute: (id: string, outputFileName: string, value: any) => void;
  },
  "output-node"
>;

export type SpotifySearchTrackNode = Node<
  {
    label: string;
    description: string;
    output: [
      {
        name: string;
        value: any;
      }
    ],
    execute: (id: string, outputFileName: string, value: any) => void;
  },
  "spotify-search-track-node"
>;

export type SpotifyCreateTrackNode = Node<
  {
    label: string;
    onInputChange?: (id: string, value: string) => void;
  },
  "spotify-create-track-node"
>;

export type CustomNodeProps = {
  id: string;
  data: {
    label: string;
  };
};

export type AppNode =  BuiltInNode | FunctionNode | CustomNode | YoutubeNode | SpotifyInputNode | SpotifySearchTrackNode | SpotifyCreateTrackNode | OutputNode;

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (nodeId: string, dataUpdater: (data: any) => any) => void;
  updateCustomNode: (nodeId: string, newOutputName: string, newOutputValue: any) => void;
  updateOutputNodeFileName: (nodeId: string, outputFileName: string) => void;
  updateSpotifyToken: (nodeId: string, spotifyToken: string) => void;
  updateSpotifyPlaylistName: (nodeId: string, spotifyPlaylistName: string) => void;
};

export const nodeTypes = {
  // Add any of your custom nodes here!,
  "custom-input-node": PlayListInputNode,
  "youtube-node": YoutubeNodeComponent,
  "spotify-input-node": SpotifyInputNodeComponent,
  "output-node": OutputNode,
  "spotify-search-track-node": SpotifySearchTrackNodeComponent,
  "spotify-create-track-node": SpotifyCreateTrackNode,
} satisfies NodeTypes;

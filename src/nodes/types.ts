import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, BuiltInNode } from "@xyflow/react";
import PlayListInputNode from "../components/PlayListInputNode";
import SpotifyNode from "../components/SpotifyNode";
import OutputNode from "../components/OutputNode";
import SpotifySearchTrackNode from "../components/SpotifySearchNode";
import SpotifyCreateTrackNode from "../components/SpotifyCreateTrackNode";
import type { NodeTypes } from "@xyflow/react";
import YoutubeNodeComponent from "../components/YoutubeNode";
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

export type SpotifyNode = Node<
  {
    label: string;
    onInputChange?: (id: string, value: string) => void;
  },
  "spotify-input-node"
>;

export type OutputNode = Node<
  {
    label: string;
    execute: (id: string, outputFileName: string, value: any) => void;
  },
  "output-node"
>;

export type SpotifySearchTrackNode = Node<
  {
    label: string;
    onInputChange?: (id: string, value: string) => void;
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

export type AppNode =  BuiltInNode | FunctionNode | CustomNode | YoutubeNode | SpotifyNode | SpotifySearchTrackNode | SpotifyCreateTrackNode | OutputNode;

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
};

export const nodeTypes = {
  // Add any of your custom nodes here!,
  "custom-input-node": PlayListInputNode,
  "youtube-node": YoutubeNodeComponent,
  "spotify-input-node": SpotifyNode,
  "output-node": OutputNode,
  "spotify-search-track-node": SpotifySearchTrackNode,
  "spotify-create-track-node": SpotifyCreateTrackNode,
} satisfies NodeTypes;

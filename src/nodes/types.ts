import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, BuiltInNode } from "@xyflow/react";
import PlayListInputNode from "../components/PlayListInputNode";
import OutputNode from "../components/OutputNodeComponent";
import SpotifySearchTrackNode from "../components/SpotifySearchNode";
import SpotifyCreateTrackNode from "../components/SpotifyCreateTrackNode";
import type { NodeTypes } from "@xyflow/react";
import YoutubeNodeComponent from "../components/YoutubeNode";
import SpotifyInputNode from "../components/SpotifyInputNode";
import SpotifyInputNodeComponent from "../components/SpotifyInputNode";
import SpotifySearchTrackNodeComponent from "../components/SpotifySearchNode";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import SpotifyCreatePlaylistNodeComponent from "../components/SpotifyCreateTrackNode";

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
      },
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
    execute: (id : string, inputType : string, playlistId : string) => void;
  },
  "youtube-node"
>;

export type SpotifyInputNode = Node<
  {
    label: string;
    description: string;
    bearerToken: string;
  },
  "spotify-input-node"
>;

export type OutputNode = Node<
  {
    label: string;
    outputFileName: string;
    execute: (id: string, outputFileName: string, value: any) => string;
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
    execute: (id: string, sdk: SpotifyApi, tracks: any) => void;
  },
  "spotify-search-track-node"
>;

export type SpotifyCreateTrackNode = Node<
  {
    label: string;
    description: string;
    playlistName: string;
    output: [
      {
        name: string;
        value: any;
      }
    ],
    execute: (id: string, sdk: SpotifyApi, playlistName: string, tracks: any) => void;
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

export type Status = "RUNNING" | "SUCCESS" | "FAILED";

export type NodeOutput = {
  id: string;
  label: string;
  output: string;
  status: Status;
  logs: string[];
  time: number;
};

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  nodeOutputs: NodeOutput[];
  resetNodeOutputs: () => void;
  outputDownloadLink: string;
  setOutputDownloadLink: (outputDownloadLink: string) => void;
  getNodeOutput: (nodeId: string) => NodeOutput | undefined;
  setNodeOutput: (nodeId: string, nodeOutput: NodeOutput) => void;
  setNodeOutputStatus: (nodeId: string, status: Status) => void;
  insertNodeOutputLog: (nodeId: string, log: string) => void;
  setNodeOutputTime: (nodeId: string, time: number) => void;
  clientId: string,
  redirectUri: string,
  tokenType: string,
  expiresIn: number,
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
  updateSpotifyTokenMetadata: (spotifyToken: string, tokenType: string, expiresIn: number) => void;
};

export const nodeTypes = {
  // Add any of your custom nodes here!,
  "custom-input-node": PlayListInputNode,
  "youtube-node": YoutubeNodeComponent,
  "spotify-input-node": SpotifyInputNodeComponent,
  "output-node": OutputNode,
  "spotify-search-track-node": SpotifySearchTrackNodeComponent,
  "spotify-create-track-node": SpotifyCreatePlaylistNodeComponent,
} satisfies NodeTypes;

import type { Node, BuiltInNode } from "@xyflow/react";

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
    onInputChange?: (id: string, value: string) => void;
    onFileUpload?: (id: string, file: File | null) => void;
  },
  "custom-node"
>;

export type SpotifyNode = Node<
  {
    label: string;
    onInputChange?: (id: string, value: string) => void;
  },
  "spotify-node"
>;

export type OutputNode = Node<
  {
    label: string;
    onInputChange?: (id: string, value: string) => void;
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

export type AppNode =  BuiltInNode | FunctionNode | CustomNode | SpotifyNode | SpotifySearchTrackNode | SpotifyCreateTrackNode | OutputNode;

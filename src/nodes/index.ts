import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";
import PlayListInputNode from "../components/PlayListInputNode";
import SpotifyNode from "../components/SpotifyNode";
import OutputNode from "../components/OutputNode";
import SpotifySearchTrackNode from "../components/SpotifySearchNode";
import SpotifyCreateTrackNode from "../components/SpotifyCreateTrackNode";

export const initialNodes: AppNode[] = [
  {
    id: "custom-1",
    type: "custom-node",
    position: { x: 400, y: 100 },
    data: {
      label: "Get Tracks from Youtube playlist",
      onInputChange: (id, value) => {
        console.log(`Node ${id} input changed to:`, value);
      },
      onFileUpload: (id, file) => {
        console.log(`Node ${id} file uploaded:`, file);
      },
    }
  },
  {
    id: "custom-2",
    type: "spotify-node",
    position: { x: 600, y: 100 },
    data: {
      label: "Spotify Access Node",
      onInputChange: (id, value) => {
        console.log(`Node ${id} input changed to:`, value);
      },
    }
  },
  {
    id: "custom-3",
    type: "output-node",
    position: { x: 800, y: 200 },
    data: {
      label: "Output Node",
      onInputChange: (id, value) => {
        console.log(`Node ${id} input changed to:`, value);
      },
    }
  },
  {
    id: "custom-4",
    type: "spotify-search-track-node",
    position: { x: 1000, y: 200 },
    data: {
      label: "Spotify Search Track Node",
      onInputChange: (id, value) => {
        console.log(`Node ${id} input changed to:`, value);
      },
    }
  },
  {
    id: "custom-5",
    type: "spotify-create-track-node",
    position: { x: 1100, y: 200 },
    data: {
      label: "Spotify Create Track Node",
      onInputChange: (id, value) => {
        console.log(`Node ${id} input changed to:`, value);
      },
    }
  }
];

export const nodeTypes = {
  // Add any of your custom nodes here!
  "custom-node": PlayListInputNode,
  "spotify-node": SpotifyNode,
  "output-node": OutputNode,
  "spotify-search-track-node": SpotifySearchTrackNode,
  "spotify-create-track-node": SpotifyCreateTrackNode,
} satisfies NodeTypes;

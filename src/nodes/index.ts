import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 200, y: 0 },
    data: { label: "step 1" },
  },
  { id: "c", position: { x: 300, y: 100 }, data: { label: "step 2" } },
  {
    id: "d",
    type: "output",
    position: { x: 100, y: 100 },
    data: { label: "step 6" },
  },
  {
    id: "e",
    type: "output",
    position: { x: 200, y: 100 },
    data: { label: "step 5" },
  },
  {
    id: "f",
    type: "output",
    position: { x: 100, y: 200 },
    data: { label: "step 4" },
  },
  

];

export const nodeTypes = {
  // Add any of your custom nodes here!
} satisfies NodeTypes;

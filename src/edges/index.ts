import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { id: 'step1-step3', source: 'custom-1', target: 'custom-2', animated: true },
  { id: 'step2-step3', source: 'custom-2', target: 'custom-5', animated: true },
  { id: 'step1-step4', source: 'custom-5', target: 'custom-4', animated: true },
  { id: 'step1-step5', source: 'custom-3', target: 'custom-5', animated: true },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;

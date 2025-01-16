import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { id: 'step1-step2', source: 'custom-1', target: 'custom-2', animated: false },
  { id: 'step3-step5', source: 'custom-3', target: 'custom-5', animated: false },
  { id: 'step2-step5', source: 'custom-2', target: 'custom-5', targetHandle:'tracksInput', animated: false },
  { id: 'step3-step6', source: 'custom-3', target: 'custom-6', targetHandle:'a', animated: false },
  { id: 'step5-step6', source: 'custom-5', target: 'custom-6', targetHandle:'b', animated: false },
  { id: 'step6-step4', source: 'custom-6', target: 'custom-4', animated: false },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;

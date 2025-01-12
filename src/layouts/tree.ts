import { AppNode } from "../nodes/types";



export const buildTreeLayout = (nodes: AppNode[], spacingX = 200, spacingY = 100) => {
    // Sort nodes by ID (assuming IDs represent hierarchy levels or order)
    const sortedNodes = [...nodes];

    // Tree building logic
    let level = 0; // Tracks the current level in the tree
    let levelCount = 1; // Number of nodes in the current level
    let currentIndex = 0; // Index tracker for nodes

    const updatedNodes = sortedNodes.map((node, index) => {
        // If currentIndex exceeds levelCount, move to the next level
        if (index >= currentIndex + levelCount) {
            level++;
            currentIndex += levelCount;
            levelCount *= 2; // Double the nodes in the next level (binary tree)
        }

        // Calculate position based on level and index within level
        const x = (index - currentIndex) * spacingX - ((levelCount - 1) * spacingX) / 2;
        const y = level * spacingY;

        return {
            ...node,
            position: { x, y },
        };
    });

    return updatedNodes;
};
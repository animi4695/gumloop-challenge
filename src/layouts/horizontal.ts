import { AppNode } from "../nodes/types";


let prevXPos = 0;
let prevYPos = 0;

export const buildVerticalLayout = (nodes: AppNode[], spacingX = 200, spacingY = 100) => {
    prevXPos = 0;
    prevYPos = 0;
    const updatedNodes = nodes.map((node) => {
        // Calculate position based on level and index within level
        const x = prevXPos + spacingX;
        const y = prevYPos + spacingY;
        // prevXPos = x;
        prevYPos = y;
        return {
            ...node,
            position: { x, y },
        };
    });

    return updatedNodes;
};

export const buildHorizontalLayout = (nodes: AppNode[], spacingX = 200, spacingY = 100) => {
    prevXPos = 0;
    prevYPos = 0;
    const updatedNodes = nodes.map((node) => {
        // Calculate position based on level and index within level
        const x = prevXPos + spacingX;
        const y = prevYPos + spacingY;
        prevXPos = x;
        // prevYPos = y;
        return {
            ...node,
            position: { x, y },
        };
    });

    return updatedNodes;
};

export const buildDiagonalLayout = (nodes: AppNode[],  spacingX = 100, spacingY = 100, direction = 'R') => {
    prevXPos = 0;
    prevYPos = 0;
    if (direction === 'L') {
        spacingX = -spacingX;
    }
    const updatedNodes = nodes.map((node) => {
        // Calculate position based on level and index within level
        const x = prevXPos + spacingX;
        const y = prevYPos + spacingY;
        prevXPos = x;
        prevYPos = y;
        return {
            ...node,
            position: { x, y },
        };
    });

    return updatedNodes;
};
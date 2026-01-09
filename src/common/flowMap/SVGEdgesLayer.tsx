import React, { useMemo } from "react";
import { Node } from "./Node";
import type { Edge } from "./FlowMap";

type SVGEdgesLayerProps = {
  nodes: Node[];
  edges: Edge[];
};

/**
 * Computes Bezier curve path for an edge connecting two nodes.
 * Curve connects from bottom of source to top of target.
 */
function computeBezierPath(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number
): string {
  const dy = targetY - sourceY;
  
  // Control points for smooth curve
  // Vertical offset based on distance
  const controlOffsetY = Math.abs(dy) * 0.3;
  
  const cp1x = sourceX;
  const cp1y = sourceY + controlOffsetY;
  const cp2x = targetX;
  const cp2y = targetY - controlOffsetY;
  
  return `M ${sourceX} ${sourceY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;
}

export default function SVGEdgesLayer({ nodes, edges }: SVGEdgesLayerProps) {
  // Precompute node lookup map for O(1) access
  const nodeMap = useMemo(() => {
    const map = new Map<string, Node>();
    nodes.forEach((node) => {
      map.set(node.id, node);
    });
    return map;
  }, [nodes]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {edges.map((edge) => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        
        if (!source || !target) return null;

        // Calculate connection points
        const sourceX = source.position.x + source.size.width / 2;
        const sourceY = source.position.y + source.size.height;
        const targetX = target.position.x + target.size.width / 2;
        const targetY = target.position.y;

        const pathData = computeBezierPath(sourceX, sourceY, targetX, targetY);

        return (
          <path
            key={edge.id}
            d={pathData}
            fill="none"
            stroke="#6b7280"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}


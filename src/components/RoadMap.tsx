import React from "react";
import FlowMap, { Edge } from "../common/flowMap/FlowMap";
import { Node } from "../common/flowMap/Node";

export type RoadMapProps = {
  nodes: Node[];
  edges: Edge[];
  onNodeClick?: (node: Node) => void;
  height?: number;
};

export default function RoadMap({
  nodes,
  edges,
  onNodeClick,
  height = 800,
}: RoadMapProps) {
  return (
    <FlowMap
      nodes={nodes}
      edges={edges}
      onNodeClick={onNodeClick}
      height={height}
    />
  );
}


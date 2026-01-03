import React from "react";
import SVGEdgesLayer from "./SVGEdgesLayer";
import NodesLayer from "./NodesLayer";
import { Node } from "./Node";

export type Edge = {
  id: string;
  source: string;
  target: string;
};

type FlowMapProps = {
  nodes: Node[];
  edges: Edge[];
  onNodeClick?: (node: Node) => void;
  height?: number;
};

export default function FlowMap({
  nodes,
  edges,
  onNodeClick,
  height = 800,
}: FlowMapProps) {
  return (
    <div
      className="relative w-full"
      style={{ height: `${height}px` }}
    >
      <SVGEdgesLayer nodes={nodes} edges={edges} />
      <NodesLayer nodes={nodes} onNodeClick={onNodeClick} />
    </div>
  );
}


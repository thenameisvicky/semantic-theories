import React from "react";
import NodeComponent, { Node } from "./Node";

type NodesLayerProps = {
  nodes: Node[];
  onNodeClick?: (node: Node) => void;
};

export default function NodesLayer({ nodes, onNodeClick }: NodesLayerProps) {
  return (
    <div className="absolute inset-0" style={{ zIndex: 1 }}>
      {nodes.map((node) => (
        <NodeComponent
          key={node.id}
          node={node}
          onClick={onNodeClick}
        />
      ))}
    </div>
  );
}


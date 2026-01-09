import React from "react";

export type Node = {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  data: { label: string };
};

type NodeComponentProps = {
  node: Node;
  onClick?: (node: Node) => void;
};

export default function NodeComponent({ node, onClick }: NodeComponentProps) {
  const { x, y } = node.position;
  const { height, width } = node.size;

  const handleClick = () => {
    onClick?.(node);
  };

  return (
    <div
      className="absolute rounded-lg bg-blue-500 shadow-md transition-all duration-200 hover:shadow-lg hover:bg-blue-600 cursor-pointer border border-blue-600"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={handleClick}
    >
      {/* Top connection point */}
      <div className="absolute w-3 h-3 bg-white rounded-full -top-1.5 left-1/2 -translate-x-1/2 border border-gray-300" />
      
      {/* Node content */}
      <div className="flex items-center justify-center h-full px-2">
        <div className="text-white text-center text-sm font-medium truncate w-full">
          {node.data.label}
        </div>
      </div>
      
      {/* Bottom connection point */}
      <div className="absolute w-3 h-3 bg-white rounded-full -bottom-1.5 left-1/2 -translate-x-1/2 border border-gray-300" />
    </div>
  );
}

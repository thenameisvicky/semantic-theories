import { useState } from "react";
import NoteModal from "./NoteModal";
import { Note } from "../types";
import RoadMap from "./RoadMap";
import { Node } from "../common/flowMap/Node";
import { Edge } from "../common/flowMap/FlowMap";

type NotesGridProps = {
  notes?: Note[];
};

export default function NotesGrid({ notes }: NotesGridProps) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialNodes: Node[] = [
    {
      id: "1",
      position: { x: 360, y: 40 },
      size: { width: 120, height: 60 },
      data: { label: "Start" },
    },
    {
      id: "2",
      position: { x: 200, y: 200 },
      size: { width: 120, height: 60 },
      data: { label: "Process A" },
    },
    {
      id: "3",
      position: { x: 520, y: 200 },
      size: { width: 120, height: 60 },
      data: { label: "Process B" },
    },
    {
      id: "4",
      position: { x: 120, y: 360 },
      size: { width: 120, height: 60 },
      data: { label: "End A1" },
    },
    {
      id: "5",
      position: { x: 280, y: 360 },
      size: { width: 120, height: 60 },
      data: { label: "End A2" },
    },
    {
      id: "6",
      position: { x: 440, y: 360 },
      size: { width: 120, height: 60 },
      data: { label: "End B1" },
    },
    {
      id: "7",
      position: { x: 600, y: 360 },
      size: { width: 120, height: 60 },
      data: { label: "End B2" },
    },
  ];

  const initialEdges: Edge[] = [
    { id: "1-2", source: "1", target: "2" },
    { id: "1-3", source: "1", target: "3" },
    { id: "2-4", source: "2", target: "4" },
    { id: "2-5", source: "2", target: "5" },
    { id: "3-6", source: "3", target: "6" },
    { id: "3-7", source: "3", target: "7" },
  ];

  const handleNodeClick = (node: Node) => {
    console.log("Node clicked:", node);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--bg)] p-6">
        <div className="relative w-full border border-[var(--border)] rounded-lg">
          <RoadMap
            nodes={initialNodes}
            edges={initialEdges}
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>
      <NoteModal
        note={selectedNote}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

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

  // Initial nodes with corrected position property
  const initialNodes: Node[] = [
    {
      id: "1",
      position: { x: 50, y: 50 },
      size: { width: 120, height: 60 },
      data: { label: "Start" },
    },
    {
      id: "2",
      position: { x: 300, y: 50 },
      size: { width: 120, height: 60 },
      data: { label: "Process" },
    },
    {
      id: "3",
      position: { x: 550, y: 50 },
      size: { width: 120, height: 60 },
      data: { label: "End" },
    },
  ];

  const initialEdges: Edge[] = [
    { id: "1-2", source: "1", target: "2" },
    { id: "2-3", source: "2", target: "3" },
  ];

  const handleNodeClick = (node: Node) => {
    // Future: Map node to note if notes are provided
    // For now, this is a placeholder
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

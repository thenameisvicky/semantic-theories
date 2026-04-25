import { useState, useEffect, useMemo } from "react";
import { marked } from "marked";
import GraphView from "./GraphView";
import ToastContainer, { ToastItem } from "../common/ToastContainer";
import type { Note } from "../types";
// import type { Node } from "../common/flowMap/Node";
// import type { Edge } from "../common/flowMap/FlowMap";

// const nodeToMarkdown: Record<string, string> = {
//   foundational: "Foundational SDE Fluency.md",
//   "ai-engineering": "AI Engineering.md",
//   "system-design": "System Design + Architecture.md",
//   "react-internals": "React Internals.md",
//   "v8-internals": "v8 Internals.md",
//   "browser-engine": "Browser Engine.md",
//   "cloud-engineering": "Cloud Engineering.md",
//   "machine-learning": "MachineLearning.md",
//   networking: "Networking.md",
//   infrastructure: "Infrastructure.md",
// };

// const nodes: Node[] = [
//   {
//     id: "foundational",
//     position: { x: 400, y: 50 },
//     size: { width: 200, height: 60 },
//     data: { label: "Foundational SDE" },
//   },
//   {
//     id: "ai-engineering",
//     position: { x: 50, y: 200 },
//     size: { width: 180, height: 60 },
//     data: { label: "AI Engineering" },
//   },
//   {
//     id: "system-design",
//     position: { x: 410, y: 200 },
//     size: { width: 200, height: 60 },
//     data: { label: "System Design" },
//   },
//   {
//     id: "react-internals",
//     position: { x: 770, y: 200 },
//     size: { width: 180, height: 60 },
//     data: { label: "React Internals" },
//   },
//   {
//     id: "machine-learning",
//     position: { x: -50, y: 350 },
//     size: { width: 180, height: 60 },
//     data: { label: "Machine Learning" },
//   },
//   {
//     id: "cloud-engineering",
//     position: { x: 170, y: 350 },
//     size: { width: 180, height: 60 },
//     data: { label: "Cloud Engineering" },
//   },
//   {
//     id: "networking",
//     position: { x: 370, y: 350 },
//     size: { width: 150, height: 60 },
//     data: { label: "Networking" },
//   },
//   {
//     id: "infrastructure",
//     position: { x: 540, y: 350 },
//     size: { width: 150, height: 60 },
//     data: { label: "Infrastructure" },
//   },
//   {
//     id: "v8-internals",
//     position: { x: 710, y: 350 },
//     size: { width: 150, height: 60 },
//     data: { label: "v8 Internals" },
//   },
//   {
//     id: "browser-engine",
//     position: { x: 890, y: 350 },
//     size: { width: 150, height: 60 },
//     data: { label: "Browser Engine" },
//   },
// ];

// const edges: Edge[] = [
//   { id: "e1", source: "foundational", target: "ai-engineering" },
//   { id: "e2", source: "foundational", target: "system-design" },
//   { id: "e3", source: "foundational", target: "react-internals" },
//   { id: "e4", source: "ai-engineering", target: "machine-learning" },
//   { id: "e5", source: "ai-engineering", target: "cloud-engineering" },
//   { id: "e6", source: "system-design", target: "networking" },
//   { id: "e7", source: "system-design", target: "infrastructure" },
//   { id: "e8", source: "react-internals", target: "v8-internals" },
//   { id: "e9", source: "react-internals", target: "browser-engine" },
// ];

marked.setOptions({
  gfm: true,
  breaks: true,
});

export default function RoadmapView() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [selectedNoteSlug, setSelectedNoteSlug] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || "/";
        const response = await fetch(`${baseUrl}vaultBundle.json`);
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        showToast("error", "Failed to load blogs.");
      }
    };
    fetchNotes();
  }, []);

  const orderedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      const dateA = new Date(a.frontmatter.date || 0);
      const dateB = new Date(b.frontmatter.date || 0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [notes]);

  const showToast = (
    type: "success" | "warning" | "error" | "info",
    message: string
  ) => {
    setToasts((prev) => {
      const isDuplicate = prev.some(
        (toast) => toast.message === message && toast.type === type
      );
      if (isDuplicate) {
        return prev;
      }
      const id = `${Date.now()}-${Math.random()}`;
      return [...prev, { id, type, message }];
    });
  };

  const handleNoteClick = async (note: Note) => {
    setIsLoading(true);
    setSelectedNoteSlug(note.slug);
    try {
      const html = await marked.parse(note.content);
      setMarkdownContent(html);
      // Scroll to content
      setTimeout(() => {
        document.querySelector(".markdown-view-container")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      showToast("error", `Failed to load markdown for: ${note.slug}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[95vh] bg-[var(--bg)] flex flex-col overflow-hidden m-auto border border-[var(--border)] rounded-xl shadow-2xl max-w-[1600px] my-[2.5vh]">
      <ToastContainer toasts={toasts} />
      <div className="border-b p-4 bg-secondary border">
        <h1 className="text-xl font-bold text-primary">broke'NHungry</h1>
      </div>

      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Sidebar for Blog List */}
        <div className="w-72 border-r border-[var(--border)] bg-secondary flex flex-col shrink-0">
          <div className="p-3 border-b border-[var(--border)] font-bold text-secondary uppercase text-[10px] tracking-widest">
            Blog Posts
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {orderedNotes.map((note) => (
              <button
                key={note.slug}
                onClick={() => handleNoteClick(note)}
                className={`w-full text-left p-3 hover:bg-[var(--surface-hover)] transition-colors border-b border-[var(--border)] ${
                  selectedNoteSlug === note.slug ? "bg-[var(--surface)] border-l-4 border-l-[var(--accent)]" : ""
                }`}
              >
                <div className="text-primary font-medium text-sm truncate">
                  {note.frontmatter.title || note.slug}
                </div>
                <div className="text-[10px] text-secondary mt-1">
                  {note.frontmatter.date}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Graph View Area */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-[var(--bg)]">
          <div className="p-4 flex-1 flex flex-col min-h-full">
            <div className="p-2 mb-2 text-secondary text-xs italic opacity-70">
              Interactive Graph View • Click nodes to read
            </div>
            <div className="w-full flex-1 min-h-[400px]">
              <GraphView
                notes={notes}
                onNodeClick={handleNoteClick}
                height={400}
              />
            </div>

            {/* Markdown Content Area */}
            {markdownContent && (
              <div className="mt-6 border border-[var(--border)] rounded-lg p-6 bg-secondary markdown-view-container shadow-inner">
                <div className="max-w-4xl mx-auto">
                  {isLoading ? (
                    <div className="text-secondary flex items-center gap-2 text-sm">
                      <div className="animate-spin h-3 w-3 border-2 border-[var(--accent)] border-t-transparent rounded-full"></div>
                      Loading content...
                    </div>
                  ) : (
                    <div
                      className="markdown-content-block notion-content"
                      dangerouslySetInnerHTML={{ __html: markdownContent }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

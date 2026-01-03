import { useState } from "react";
import { marked } from "marked";
import RoadMap from "./RoadMap";
import ToastContainer, { ToastItem } from "../common/ToastContainer";
import type { Node } from "../common/flowMap/Node";
import type { Edge } from "../common/flowMap/FlowMap";

const nodeToMarkdown: Record<string, string> = {
  "foundational": "Foundational SDE Fluency.md",
  "ai-engineering": "AI Engineering.md",
  "system-design": "System Design + Architecture.md",
  "react-internals": "React Internals.md",
  "v8-internals": "v8 Internals.md",
  "browser-engine": "Browser Engine.md",
  "cloud-engineering": "Cloud Engineering.md",
  "machine-learning": "MachineLearning.md",
  "networking": "Networking.md",
  "infrastructure": "Infrastructure.md",
};

const markdownModules = import.meta.glob<string>("../vault/*.md?raw", { 
  import: "default",
  eager: false 
});

const nodes: Node[] = [
  {
    id: "foundational",
    position: { x: 400, y: 50 },
    size: { width: 200, height: 60 },
    data: { label: "Foundational SDE" },
  },
  {
    id: "ai-engineering",
    position: { x: 50, y: 200 },
    size: { width: 180, height: 60 },
    data: { label: "AI Engineering" },
  },
  {
    id: "system-design",
    position: { x: 410, y: 200 },
    size: { width: 200, height: 60 },
    data: { label: "System Design" },
  },
  {
    id: "react-internals",
    position: { x: 770, y: 200 },
    size: { width: 180, height: 60 },
    data: { label: "React Internals" },
  },
  {
    id: "machine-learning",
    position: { x: -50, y: 350 },
    size: { width: 180, height: 60 },
    data: { label: "Machine Learning" },
  },
  {
    id: "cloud-engineering",
    position: { x: 170, y: 350 },
    size: { width: 180, height: 60 },
    data: { label: "Cloud Engineering" },
  },
  {
    id: "networking",
    position: { x: 370, y: 350 },
    size: { width: 150, height: 60 },
    data: { label: "Networking" },
  },
  {
    id: "infrastructure",
    position: { x: 540, y: 350 },
    size: { width: 150, height: 60 },
    data: { label: "Infrastructure" },
  },
  {
    id: "v8-internals",
    position: { x: 710, y: 350 },
    size: { width: 150, height: 60 },
    data: { label: "v8 Internals" },
  },
  {
    id: "browser-engine",
    position: { x: 890, y: 350 },
    size: { width: 150, height: 60 },
    data: { label: "Browser Engine" },
  },
];

const edges: Edge[] = [
  { id: "e1", source: "foundational", target: "ai-engineering" },
  { id: "e2", source: "foundational", target: "system-design" },
  { id: "e3", source: "foundational", target: "react-internals" },
  { id: "e4", source: "ai-engineering", target: "machine-learning" },
  { id: "e5", source: "ai-engineering", target: "cloud-engineering" },
  { id: "e6", source: "system-design", target: "networking" },
  { id: "e7", source: "system-design", target: "infrastructure" },
  { id: "e8", source: "react-internals", target: "v8-internals" },
  { id: "e9", source: "react-internals", target: "browser-engine" },
];

marked.setOptions({
  gfm: true,
  breaks: true,
});

export default function RoadmapView() {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (type: "success" | "warning" | "error" | "info", message: string) => {
    // Prevent duplicate toasts with the same message
    setToasts((prev) => {
      const isDuplicate = prev.some((toast) => toast.message === message && toast.type === type);
      if (isDuplicate) {
        return prev;
      }
      const id = `${Date.now()}-${Math.random()}`;
      return [...prev, { id, type, message }];
    });
  };

  const handleNodeClick = async (node: Node) => {
    const markdownFile = nodeToMarkdown[node.id];
    if (!markdownFile) {
      showToast("error", "No markdown file found for this node.");
      return;
    }

    setIsLoading(true);
    try {
      const filePath = `../vault/${markdownFile}?raw`;
      const loadMarkdown = markdownModules[filePath];
      
      if (!loadMarkdown) {
        showToast("error", `Markdown file not found: ${markdownFile}`);
        setIsLoading(false);
        return;
      }
      const rawMarkdown = await loadMarkdown();
      const html = typeof rawMarkdown === 'string' 
        ? marked.parse(rawMarkdown) as string
        : String(rawMarkdown);
      setMarkdownContent(html);
    } catch (error) {
      console.error("Error loading markdown:", error);
      showToast("error", `Failed to load markdown file: ${markdownFile}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <ToastContainer toasts={toasts} />
      <div className="border-b p-6 bg-secondary border">
        <h1 className="text-2xl font-bold text-primary">MD Runner</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-6xl flex justify-center">
          <RoadMap
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            height={500}
          />
        </div>
      </div>
      {markdownContent && (
        <div className="border-t border p-6 bg-secondary">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="text-secondary">Loading...</div>
            ) : (
              <div
                className="markdown-content-block"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}


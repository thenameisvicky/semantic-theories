import React, { useMemo, useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import type { Note } from "../types";

type GraphNode = {
  id: string;
  name: string;
  val: number;
  x?: number;
  y?: number;
};

type GraphLink = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

type GraphViewProps = {
  notes: Note[];
  onNodeClick: (note: Note) => void;
  height?: number;
};

export default function GraphView({ notes, onNodeClick, height: initialHeight = 400 }: GraphViewProps) {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: initialHeight });
  const [colors, setColors] = useState({ accent: "#58a6ff", text: "#8b949e", bg: "#0d1117" });

  useEffect(() => {
    const style = getComputedStyle(document.body);
    setColors({
      accent: style.getPropertyValue("--accent").trim() || "#58a6ff",
      text: style.getPropertyValue("--text-secondary").trim() || "#8b949e",
      bg: style.getPropertyValue("--bg").trim() || "#0d1117",
    });

    if (containerRef.current) {
      const observeTarget = containerRef.current;
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            setDimensions({
              width: entry.contentRect.width,
              height: entry.contentRect.height || initialHeight,
            });
          }
        }
      });

      resizeObserver.observe(observeTarget);
      return () => resizeObserver.unobserve(observeTarget);
    }
  }, [initialHeight]);

  const data: GraphData = useMemo(() => {
    if (!notes.length) return { nodes: [], links: [] };

    const nodes: GraphNode[] = notes.map((note) => ({
      id: note.slug,
      name: note.frontmatter.title || note.slug,
      val: 2,
    }));

    const links: GraphLink[] = [];
    const noteSlugs = new Set(notes.map((n) => n.slug));

    notes.forEach((note) => {
      const linkRegex = /\[\[(.*?)\]\]/g;
      let match;
      while ((match = linkRegex.exec(note.content)) !== null) {
        const targetSlug = match[1].split("|")[0].trim();
        if (noteSlugs.has(targetSlug)) {
          links.push({
            source: note.slug,
            target: targetSlug,
          });
        }
      }
    });

    return { nodes, links };
  }, [notes]);

  useEffect(() => {
    if (fgRef.current && data.nodes.length > 0) {
      fgRef.current.d3Force("charge").strength(-300);
      fgRef.current.d3Force("link").distance(100);
      fgRef.current.d3Force("center").x(dimensions.width / 2).y(dimensions.height / 2);
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 100);
      }, 500);
    }
  }, [data, dimensions.width, dimensions.height]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-[var(--bg)] border border-[var(--border)] rounded-lg overflow-hidden" 
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor={colors.bg}
        nodeColor={() => colors.accent}
        linkColor={() => "rgba(139, 148, 158, 0.3)"}
        nodeRelSize={6}
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={0.005}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = colors.accent;
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = colors.text;
          ctx.fillText(label, node.x, node.y + (10 / globalScale) + 5);
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        onNodeClick={(node: any) => {
          const note = notes.find((n) => n.slug === node.id);
          if (note) onNodeClick(note);
        }}
      />
    </div>
  );
}

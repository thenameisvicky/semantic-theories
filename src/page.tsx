import { useState } from "react";
import RoadmapView from "./components/RoadmapView";
import { THIRUKKURAL_TAMIL } from "./constants";

export default function Home() {
  const [showRoadmap, setShowRoadmap] = useState(false);

  if (showRoadmap) {
    return <RoadmapView />;
  }

  const lines = [];
  for (let i = 0; i < THIRUKKURAL_TAMIL.length; i += 3) {
    lines.push(THIRUKKURAL_TAMIL.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      {lines.map((lineKurals, lineIndex) => {
        const rowHeight = 30;
        const rowGap = 70;
        const topPosition = lineIndex * (rowHeight + rowGap);
        const duplicatedLine = [...lineKurals, ...lineKurals];

        return (
          <div
            key={lineIndex}
            className="absolute left-0 w-full pointer-events-none"
            style={{ top: topPosition }}
          >

            <div
              className="flex animate-scroll-right-left"
              style={{ animationDuration: `${80 + lineIndex * 3}s` }}
            >
              {duplicatedLine.map((kural, kuralIndex) => {
                const parts = kural.split(";");
                return (
                  <div
                    key={kuralIndex}
                    className={`text-[var(--text-secondary)] text-2xl mx-10 opacity-50 transition-all duration-300`}
                  >
                    <div className="whitespace-nowrap">{parts[0]}</div>
                    {parts[1] && (
                      <div className="whitespace-nowrap">{parts[1]}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-7xl font-bold text-[var(--text)] mb-8 tracking-wide">
          MD Runner
        </h1>
        <button
          onClick={() => setShowRoadmap(true)}
          className="px-8 py-4 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors duration-200 shadow-lg"
        >
          Software Development Engineer
        </button>
      </div>
    </div>
  );
}


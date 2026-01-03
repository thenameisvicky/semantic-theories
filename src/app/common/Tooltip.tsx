
import React, { useState, ReactNode } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

type TooltipProps = {
  children: ReactNode;
  content: string;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  offSet?: string;
  hasArrow?: boolean;
};

export default function Tooltip({
  children,
  content,
  position = "top",
  delay = 200,
  className = "",
  style,
  disabled = false,
  offSet = "5px",
  hasArrow = true,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
    }
  };

  const getOffsetStyle = (): React.CSSProperties => {
    switch (position) {
      case "top":
        return { marginBottom: offSet };
      case "bottom":
        return { marginTop: offSet };
      case "left":
        return { marginRight: offSet };
      case "right":
        return { marginLeft: offSet };
    }
  };

  const arrowSize = 6;
  const arrowColor = 'var(--surface)';
  
  const arrowStyles: Record<TooltipPosition, React.CSSProperties> = {
    top: {
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 0,
      height: 0,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderTop: `${arrowSize}px solid ${arrowColor}`,
    },
    bottom: {
      position: "absolute",
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 0,
      height: 0,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid ${arrowColor}`,
    },
    left: {
      position: "absolute",
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      width: 0,
      height: 0,
      borderTop: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid transparent`,
      borderLeft: `${arrowSize}px solid ${arrowColor}`,
    },
    right: {
      position: "absolute",
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      width: 0,
      height: 0,
      borderTop: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid ${arrowColor}`,
    },
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {!disabled && (
        <div
          className={`absolute px-2.5 py-1.5 rounded text-xs whitespace-nowrap pointer-events-none z-[9999] transition-opacity duration-200 ease-in-out bg-surface text-primary border border-[var(--border)] shadow-tooltip ${getPositionClasses()} ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={getOffsetStyle()}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {content}
          {hasArrow && <span style={arrowStyles[position]} />}
        </div>
      )}
    </div>
  );
}

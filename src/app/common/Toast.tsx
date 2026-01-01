"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "warning" | "error" | "info";

type ToastProps = {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
};

export default function Toast({
  type,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Delay visibility for smoother animation
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    const hideTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose();
      }, 500);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const typeStyles: Record<ToastType, React.CSSProperties> = {
    success: {
      backgroundColor: 'rgba(126, 231, 135, 0.15)',
      borderColor: 'var(--syntax-green)',
      color: 'var(--syntax-green)',
      border: '1px solid var(--syntax-green)'
    },
    warning: {
      backgroundColor: 'rgba(255, 166, 87, 0.15)',
      borderColor: 'var(--warning)',
      color: 'var(--warning)',
      border: '1px solid var(--warning)'
    },
    error: {
      backgroundColor: 'rgba(255, 123, 114, 0.15)',
      borderColor: 'var(--error)',
      color: 'var(--error)',
      border: '1px solid var(--error)'
    },
    info: {
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      color: 'var(--text)',
      border: '1px solid var(--border)'
    },
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return 'var(--syntax-green)';
      case "warning":
        return 'var(--warning)';
      case "error":
        return 'var(--error)';
      default:
        return 'var(--text)';
    }
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg min-w-[250px] max-w-[400px] transition-all duration-500 ease-out ${
        isVisible && !isExiting
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
      style={{
        ...typeStyles[type],
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: getTextColor() }}>{message}</p>
        </div>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onClose(), 300);
          }}
          className="transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          aria-label="Close toast"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


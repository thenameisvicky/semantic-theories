
import { useState, useCallback, useEffect } from "react";

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};

type ToastType = "success" | "warning" | "error" | "info";

type ToastProps = {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, message, duration }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { showToast, removeToast, toasts };
}

function Toast({ type, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
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

  const getTypeClasses = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-[rgba(126,231,135,0.15)] border-[var(--syntax-green)]",
          text: "text-[var(--syntax-green)]"
        };
      case "warning":
        return {
          container: "bg-[rgba(255,166,87,0.15)] border-[var(--warning)]",
          text: "text-[var(--warning)]"
        };
      case "error":
        return {
          container: "bg-[rgba(255,123,114,0.15)] border-[var(--error)]",
          text: "text-[var(--error)]"
        };
      default:
        return {
          container: "bg-surface border-[var(--border)]",
          text: "text-primary"
        };
    }
  };

  const typeClasses = getTypeClasses();

  return (
    <div
      className={`px-4 py-3 rounded-lg min-w-[250px] max-w-[400px] transition-all duration-500 ease-out border shadow-toast ${
        isVisible && !isExiting
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      } ${typeClasses.container}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className={`text-sm font-medium ${typeClasses.text}`}>
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onClose(), 300);
          }}
          className="transition-colors text-secondary hover:text-primary"
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

export default function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10000] pointer-events-none">
      <div className="flex flex-col gap-2 items-center">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              onClose={() => onRemove(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

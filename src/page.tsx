import { useState } from "react";
import NotesGrid from "./components/NotesGrid";
import ToastContainer, { ToastItem } from "./common/ToastContainer";

export default function Home() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <ToastContainer toasts={toasts} />
      <div className="border-b p-6 bg-secondary border">
        <h1 className="text-2xl font-bold text-primary">MD Runner</h1>
      </div>
      <NotesGrid />
    </div>
  );
}

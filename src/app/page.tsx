import NotesGrid from "./components/NotesGrid";
import ToastContainer, { useToast } from "./common/ToastContainer";

export default function Home() {
  const { removeToast, toasts } = useToast();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="border-b p-6 bg-secondary border">
        <h1 className="text-2xl font-bold text-primary">MD Runner</h1>
      </div>
      <NotesGrid />
    </div>
  );
}

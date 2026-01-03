"use client";

import { useEffect, useState } from "react";
import Button from "../common/Button";
import CollapsibleMarkdown from "./CollapsibleMarkdown";
import BookmarkIcon from "../common/BookmarkIcon";
import dayjs from "dayjs";
import { Note, CreateNoteResponse } from "../types";
import { readPreferencesFromClient, writePreferencesToClient } from "../helpers/userPreference.client";

type NoteModalProps = {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  mode?: "view" | "create";
  onCreateNote?: (title: string) => Promise<CreateNoteResponse>;
};

export default function NoteModal({ note, isOpen, onClose, mode = "view", onCreateNote }: NoteModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const isCreateMode = mode === "create";

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyboard);
      document.body.style.overflow = "hidden";
      
      if (!isCreateMode && note) {
        const loadBookmarkStatus = async () => {
          if (typeof window === "undefined") return;
          
          try {
            if (typeof window === "undefined") return;
            const prefs = await readPreferencesFromClient();
            if (prefs.bookMarkedCards && Array.isArray(prefs.bookMarkedCards)) {
              setIsBookmarked(prefs.bookMarkedCards.includes(note?.slug || ""));
            }
          } catch (err) {
            console.error("Error loading bookmark status:", err);
          }
        };
        loadBookmarkStatus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, note, onClose, isCreateMode]);

  useEffect(() => {
    if (isCreateMode && isOpen) {
      setTitle("");
    }
  }, [isCreateMode, isOpen]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!note || isCreateMode) return;

    const newBookmarked = !isBookmarked;
    setIsBookmarked(newBookmarked);
    
    try {
      if (typeof window === "undefined") return;
      const prefs = await readPreferencesFromClient();
      
      if (newBookmarked) {
        if (!prefs.bookMarkedCards.includes(note.slug)) {
          prefs.bookMarkedCards.push(note.slug);
        }
      } else {
        prefs.bookMarkedCards = prefs.bookMarkedCards.filter((slug: string) => slug !== note.slug);
      }
      
      await writePreferencesToClient(prefs);
    } catch (error) {
      setIsBookmarked(isBookmarked);
      console.error("Error updating bookmark:", error);
    }
  };

  // const handleCreateNote = async () => {
  //   if (!title.trim() || !onCreateNote) return;
    
  //   setIsCreating(true);
  //   const result = await onCreateNote(title.trim());
  //   setIsCreating(false);
    
  //   if (result.success) {
  //     onClose();
  //     setTitle("");
  //   } else {
  //     // Error will be handled by parent component via toast
  //   }
  // };

  if (!isOpen) return null;
  if (!isCreateMode && !note) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-[9998]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden rounded-lg z-[9999]"
        style={{
          backgroundColor: 'var(--surface)',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-6" style={{ borderColor: 'var(--border)' }}>
          <div className="flex-1">
            {isCreateMode ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="text-2xl font-bold bg-transparent border-none outline-none w-full"
                style={{ color: 'var(--text)' }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // handleCreateNote();
                  }
                }}
              />
            ) : (
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {note?.frontmatter.title || note?.slug}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isCreateMode && note && (
              <BookmarkIcon
                isBookmarked={isBookmarked}
                size={24}
                onClick={handleBookmarkClick}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              />
            )}
            <Button
              variant="icon"
              onClick={onClose}
              className="p-1.5 rounded transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="Close modal"
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
            </Button>
          </div>
        </div>
        <div
          className="overflow-y-auto p-6"
          style={{ maxHeight: "calc(90vh - 140px)" }}
        >
          {isCreateMode ? (
            <div className="text-base leading-[1.5] font-sans" style={{ color: 'var(--text)' }}>
              <div className="mb-4 p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Note Template Preview</h3>
                <div className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                  <p><strong>Title:</strong> {title || "Your note title"}</p>
                  <p><strong>Created Date:</strong> {dayjs().format("MMMM D, YYYY")}</p>
                  <p className="mt-2" style={{ color: 'var(--text)' }}>Content editing will be available in a future update.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="notion-content text-base leading-[1.5] font-sans min-h-[200px] text-left" style={{ color: 'var(--text)' }}>
              <CollapsibleMarkdown content={note?.content || ""} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-t px-6 py-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {isCreateMode ? (
              <span>Press Enter to create, Escape to cancel</span>
            ) : (
              <>
                {note?.frontmatter.date && (
                  <span>Created: {note.frontmatter.date}</span>
                )}
                <span className="ml-4">Press Escape to close</span>
              </>
            )}
          </div>
          {/* {isCreateMode ? (
            <div className="flex gap-2">
              <Button
                variant="text"
                onClick={onClose}
                className="px-3 py-1.5 text-sm font-medium rounded"
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleCreateNote}
                className="px-3 py-1.5 text-sm font-medium rounded"
                disabled={!title.trim() || isCreating}
              >
                {isCreating ? "Creating..." : "Create Note"}
              </Button>
            </div>
          ) : (
            <Button
              variant="text"
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium rounded"
            >
              Close
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
}

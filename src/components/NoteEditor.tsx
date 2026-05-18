import { useState, useEffect, useRef, useCallback } from 'react';
import type { Note } from '../types/note';
import { copy } from '../lib/i18n';

interface NoteEditorProps {
  note: Note;
  onUpdate: (note: Note) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function NoteEditor({ note, onUpdate, onDelete, onBack }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  // Keep a ref to the note so triggerSave doesn't need note in its dep array.
  // Without this, every save would update the note prop → new triggerSave ref →
  // useEffect re-runs → infinite save loop.
  const noteRef = useRef(note);
  useEffect(() => {
    noteRef.current = note;
  });

  const triggerSave = useCallback(
    (newTitle: string, newBody: string, newFavorite: boolean) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        const updated: Note = {
          ...noteRef.current,
          title: newTitle,
          body: newBody,
          isFavorite: newFavorite,
          updatedAt: new Date().toISOString(),
        };
        onUpdate(updated);
        setSaveStatus('saved');
        if (statusTimer.current) clearTimeout(statusTimer.current);
        statusTimer.current = setTimeout(() => setSaveStatus('idle'), 2200);
      }, 600);
    },
    [onUpdate]
  );

  useEffect(() => {
    triggerSave(title, body, isFavorite);
  }, [title, body, isFavorite, triggerSave]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (statusTimer.current) clearTimeout(statusTimer.current);
    };
  }, []);

  const handleDelete = () => {
    const confirmed = window.confirm(`${copy.deleteConfirm}\n${copy.deleteConfirmEn}`);
    if (confirmed) {
      onDelete(note.id);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="flex-1 flex flex-col animate-fade-slide-up">
      {/* Header */}
      <div
        className="flex items-center justify-between px-[21px] py-[13px]"
        style={{ borderBottom: '1px solid var(--color-line)' }}
      >
        {/* Back */}
        <button
          onClick={onBack}
          aria-label={copy.backButton}
          className="
            flex items-center gap-[6px]
            text-[13px] text-ink-muted
            hover:text-sumi
            active:opacity-70
            transition-colors duration-200
            py-[8px] pr-[13px]
          "
          style={{ letterSpacing: '0.02em' }}
        >
          <span style={{ fontSize: '16px', lineHeight: 1 }}>←</span>
          <span>{copy.backButton}</span>
        </button>

        <div className="flex items-center gap-[8px]">
          {/* Save status */}
          <span
            className="text-[11px] transition-opacity duration-500"
            style={{
              color: 'var(--color-ink-muted)',
              opacity: saveStatus === 'saved' ? 0.7 : 0,
              letterSpacing: '0.04em',
            }}
          >
            {copy.saved}
          </span>
          <button
            onClick={handleFavoriteToggle}
            aria-label={copy.favoriteToggle}
            aria-pressed={isFavorite}
            className="py-[8px] px-[6px] transition-all duration-350"
            style={{
              color: isFavorite ? 'var(--color-gold)' : 'var(--color-line)',
              fontSize: '18px',
              transform: isFavorite ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            ◆
          </button>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            aria-label={copy.deleteButton}
            className="text-[12px] py-[8px] px-[6px] transition-colors duration-200 hover:opacity-100"
            style={{ color: 'var(--color-vermilion)', opacity: 0.65 }}
          >
            {copy.deleteButton}
          </button>
        </div>
      </div>

      {/* Editor body */}
      <div className="flex-1 flex flex-col overflow-y-auto px-[26px] pt-[42px] pb-[55px]">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={copy.titlePlaceholder}
          aria-label="メモのタイトル"
          className="
            w-full
            bg-transparent
            border-none outline-none
            font-mincho text-[24px] text-sumi
            placeholder:text-ink-muted placeholder:opacity-40
            mb-[26px]
          "
          style={{ letterSpacing: '-0.01em', lineHeight: '1.3' }}
        />

        {/* Divider — brush-stroke style */}
        <div
          className="mb-[26px]"
          style={{
            width: '42px',
            height: '1px',
            backgroundColor: 'var(--color-line)',
            opacity: 0.8,
          }}
        />

        {/* Body */}
        <textarea
          ref={bodyRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={copy.bodyPlaceholder}
          aria-label="メモの本文"
          className="
            flex-1
            w-full
            bg-transparent
            border-none outline-none resize-none
            text-[16px] text-sumi
            placeholder:text-ink-muted placeholder:opacity-40
            min-h-[300px]
          "
          style={{ lineHeight: '1.85', letterSpacing: '0.01em' }}
        />
      </div>
    </div>
  );
}

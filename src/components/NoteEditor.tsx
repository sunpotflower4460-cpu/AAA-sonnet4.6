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
        statusTimer.current = setTimeout(() => setSaveStatus('idle'), 2000);
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
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-[21px] py-[13px] border-b"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <button
          onClick={onBack}
          aria-label={copy.backButton}
          className="text-[14px] text-ink-muted hover:text-sumi transition-colors duration-200 py-[8px] pr-[13px]"
        >
          ← {copy.backButton}
        </button>

        <div className="flex items-center gap-[13px]">
          {/* Save status */}
          <span
            className="text-[12px] transition-opacity duration-500"
            style={{
              color: 'var(--color-ink-muted)',
              opacity: saveStatus === 'saved' ? 1 : 0,
            }}
          >
            {copy.saved}
          </span>

          {/* Favorite button */}
          <button
            onClick={handleFavoriteToggle}
            aria-label={copy.favoriteToggle}
            aria-pressed={isFavorite}
            className="text-[20px] transition-all duration-300 py-[8px] px-[4px]"
            style={{ color: isFavorite ? 'var(--color-gold)' : 'var(--color-line)' }}
          >
            ◆
          </button>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            aria-label={copy.deleteButton}
            className="text-[13px] py-[8px] px-[4px] transition-colors duration-200"
            style={{ color: 'var(--color-vermilion)', opacity: 0.8 }}
          >
            {copy.deleteButton}
          </button>
        </div>
      </div>

      {/* Editor body */}
      <div className="flex-1 flex flex-col overflow-y-auto px-[21px] pt-[34px] pb-[34px]">
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
            font-mincho text-[21px] text-sumi
            placeholder:text-ink-muted placeholder:opacity-50
            mb-[21px]
          "
        />

        {/* Divider */}
        <div
          className="w-[34px] h-[1px] mb-[21px]"
          style={{ backgroundColor: 'var(--color-line)' }}
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
            text-[16px] text-sumi leading-golden
            placeholder:text-ink-muted placeholder:opacity-50
            min-h-[300px]
          "
          style={{ lineHeight: '1.618' }}
        />
      </div>
    </div>
  );
}

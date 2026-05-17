import type { Note } from '../types/note';
import { formatDate } from '../lib/date';
import { copy } from '../lib/i18n';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  const displayTitle = note.title.trim() || copy.untitled;
  const preview = note.body.trim().slice(0, 80);

  return (
    <button
      onClick={onClick}
      aria-label={`メモ: ${displayTitle}`}
      className="
        w-full text-left
        bg-paper
        border border-[var(--color-line)]
        rounded-[4px]
        p-[21px]
        flex gap-[13px]
        hover:border-[var(--color-ink-muted)]
        active:scale-[0.99]
        transition-all duration-200
        relative overflow-hidden
      "
    >
      {/* Sword-line accent */}
      <div
        className="absolute left-0 top-[21px] bottom-[21px] w-[2px] rounded-full"
        style={{ backgroundColor: note.isFavorite ? 'var(--color-gold)' : 'var(--color-line)' }}
      />

      <div className="flex-1 min-w-0 pl-[8px]">
        <div className="flex items-center justify-between mb-[4px]">
          <h3
            className="text-[16px] font-mincho text-sumi truncate"
            style={{ fontWeight: note.title ? 600 : 400, fontStyle: note.title ? 'normal' : 'italic' }}
          >
            {displayTitle}
          </h3>
          {note.isFavorite && (
            <span
              className="ml-[8px] text-[12px] flex-shrink-0"
              style={{ color: 'var(--color-gold)' }}
              aria-label="お気に入り"
            >
              ◆
            </span>
          )}
        </div>
        {preview && (
          <p className="text-[14px] text-ink-muted line-clamp-2 leading-golden mb-[8px]">
            {preview}
          </p>
        )}
        <p className="text-[12px] text-ink-muted" style={{ opacity: 0.7 }}>
          {formatDate(note.updatedAt)}
        </p>
      </div>
    </button>
  );
}

import type { Note } from '../types/note';
import { formatDate } from '../lib/date';
import { copy } from '../lib/i18n';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  animationIndex?: number;
}

export function NoteCard({ note, onClick, animationIndex = 0 }: NoteCardProps) {
  const displayTitle = note.title.trim() || copy.untitled;
  const preview = note.body.trim().slice(0, 70);
  const delayClass = `card-delay-${Math.min(animationIndex, 9)}`;

  const accentLineStyle = {
    width: note.isFavorite ? '3px' : '2px',
    backgroundColor: note.isFavorite ? 'var(--color-gold)' : 'var(--color-line)',
    transition: 'background-color 300ms, width 300ms',
  };

  return (
    <button
      onClick={onClick}
      aria-label={`メモ: ${displayTitle}`}
      className={`
        w-full text-left
        bg-paper
        border border-[var(--color-line)]
        rounded-[4px]
        px-[21px] py-[18px]
        flex gap-[13px]
        hover:border-[rgba(31,27,24,0.22)]
        active:scale-[0.985]
        transition-all duration-300
        relative overflow-hidden
        animate-fade-slide-up ${delayClass}
      `}
      style={{ boxShadow: '0 1px 8px var(--color-shadow)' }}
    >
      {/* Sword-line accent */}
      <div
        className="absolute left-0 top-[14px] bottom-[14px] rounded-full"
        style={accentLineStyle}
      />

      <div className="flex-1 min-w-0 pl-[8px]">
        <div className="flex items-start justify-between gap-[8px] mb-[6px]">
          <h3
            className="text-[15px] font-mincho text-sumi truncate leading-snug"
            style={{ fontWeight: note.title ? 600 : 400, fontStyle: note.title ? 'normal' : 'italic' }}
          >
            {displayTitle}
          </h3>
          {note.isFavorite && (
            <span
              className="text-[11px] flex-shrink-0 mt-[2px]"
              style={{ color: 'var(--color-gold)' }}
              aria-label="お気に入り"
            >
              ◆
            </span>
          )}
        </div>
        {preview && (
          <p className="text-[13px] text-ink-muted line-clamp-2 leading-golden mb-[8px]" style={{ opacity: 0.85 }}>
            {preview}
          </p>
        )}
        <p className="text-[11px] text-ink-muted" style={{ opacity: 0.55, letterSpacing: '0.02em' }}>
          {formatDate(note.updatedAt)}
        </p>
      </div>
    </button>
  );
}

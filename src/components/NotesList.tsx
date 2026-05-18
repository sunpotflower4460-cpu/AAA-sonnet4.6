import type { Note } from '../types/note';
import { NoteCard } from './NoteCard';
import { EmptyState } from './EmptyState';
import { SearchBar } from './SearchBar';
import { copy } from '../lib/i18n';

interface NotesListProps {
  notes: Note[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
}

export function NotesList({
  notes,
  searchQuery,
  onSearchChange,
  onSelectNote,
  onCreateNote,
}: NotesListProps) {
  const filtered = notes.filter((n) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const isEmpty = notes.length === 0;
  const noResults = !isEmpty && sorted.length === 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-[21px] pt-[55px] pb-[21px]">
        <p
          className="text-[11px] mb-[8px]"
          style={{
            color: 'var(--color-ink-muted)',
            opacity: 0.6,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          {copy.appSubtitle}
        </p>
        <h1
          className="font-mincho text-[38px] text-sumi leading-none mb-[13px]"
          style={{ letterSpacing: '-0.01em' }}
        >
          {copy.appName}
        </h1>
        <p
          className="text-[13px] text-ink-muted mb-[34px]"
          style={{ opacity: 0.75, fontStyle: 'italic', lineHeight: '1.618' }}
        >
          {copy.taglineEn}
        </p>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      {/* Notes */}
      <div className="flex-1 overflow-y-auto px-[21px] pb-[89px]">
        {isEmpty ? (
          <EmptyState onCreateNote={onCreateNote} />
        ) : noResults ? (
          <EmptyState onCreateNote={onCreateNote} isSearching />
        ) : (
          <div className="flex flex-col gap-[10px]">
            {sorted.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                animationIndex={index}
                onClick={() => onSelectNote(note.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={onCreateNote}
        aria-label={copy.newNote}
        className="
          fixed
          w-[55px] h-[55px]
          bg-indigo text-paper
          rounded-full
          flex items-center justify-center
          text-[22px]
          hover:opacity-90 active:scale-[0.93]
          transition-all duration-200
        "
        style={{
          right: '21px',
          bottom: 'max(34px, calc(34px + env(safe-area-inset-bottom)))',
          boxShadow: '0 4px 20px rgba(36, 59, 83, 0.28)',
        }}
      >
        ＋
      </button>
    </div>
  );
}

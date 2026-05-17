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
      <div className="px-[21px] pt-[34px] pb-[21px]">
        <h1 className="font-mincho text-[21px] text-sumi leading-tight mb-[4px]">
          {copy.appName}
        </h1>
        <p className="text-[12px] text-ink-muted mb-[4px]">{copy.appSubtitle}</p>
        <p className="text-[13px] text-ink-muted leading-golden mb-[21px]">
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
          <div className="flex flex-col gap-[13px]">
            {sorted.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
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
          fixed bottom-[34px] right-[21px]
          w-[55px] h-[55px]
          bg-indigo text-paper
          rounded-full
          flex items-center justify-center
          text-[24px]
          shadow-md
          hover:scale-105 active:scale-95
          transition-transform duration-200
          safe-bottom
        "
        style={{
          bottom: 'max(34px, calc(34px + env(safe-area-inset-bottom)))',
          boxShadow: '0 4px 16px var(--color-shadow)',
        }}
      >
        ＋
      </button>
    </div>
  );
}

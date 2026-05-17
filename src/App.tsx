import { useState, useCallback } from 'react';
import { AppShell } from './components/AppShell';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import { loadNotes, saveNotes } from './lib/storage';
import type { Note } from './types/note';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const persistNotes = useCallback((updated: Note[]) => {
    setNotes(updated);
    saveNotes(updated);
  }, []);

  const handleCreateNote = useCallback(() => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: generateId(),
      title: '',
      body: '',
      createdAt: now,
      updatedAt: now,
      isFavorite: false,
    };
    const updated = [newNote, ...notes];
    persistNotes(updated);
    setActiveNoteId(newNote.id);
  }, [notes, persistNotes]);

  const handleUpdateNote = useCallback(
    (updated: Note) => {
      const newNotes = notes.map((n) => (n.id === updated.id ? updated : n));
      persistNotes(newNotes);
    },
    [notes, persistNotes]
  );

  const handleDeleteNote = useCallback(
    (id: string) => {
      const newNotes = notes.filter((n) => n.id !== id);
      persistNotes(newNotes);
      setActiveNoteId(null);
    },
    [notes, persistNotes]
  );

  const activeNote = activeNoteId ? notes.find((n) => n.id === activeNoteId) ?? null : null;

  return (
    <AppShell>
      {activeNote ? (
        <NoteEditor
          note={activeNote}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
          onBack={() => setActiveNoteId(null)}
        />
      ) : (
        <NotesList
          notes={notes}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectNote={setActiveNoteId}
          onCreateNote={handleCreateNote}
        />
      )}
    </AppShell>
  );
}

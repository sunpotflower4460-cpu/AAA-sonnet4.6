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

  // Use functional setState so these callbacks are stable (no notes dep),
  // preventing the infinite auto-save loop in NoteEditor.
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
    setNotes((prev) => {
      const updated = [newNote, ...prev];
      saveNotes(updated);
      return updated;
    });
    setActiveNoteId(newNote.id);
  }, []);

  const handleUpdateNote = useCallback((updated: Note) => {
    setNotes((prev) => {
      const newNotes = prev.map((n) => (n.id === updated.id ? updated : n));
      saveNotes(newNotes);
      return newNotes;
    });
  }, []);

  const handleDeleteNote = useCallback((id: string) => {
    setNotes((prev) => {
      const newNotes = prev.filter((n) => n.id !== id);
      saveNotes(newNotes);
      return newNotes;
    });
    setActiveNoteId(null);
  }, []);

  const activeNote = activeNoteId ? notes.find((n) => n.id === activeNoteId) ?? null : null;

  return (
    <AppShell>
      {activeNote ? (
        <NoteEditor
          key={activeNote.id}
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

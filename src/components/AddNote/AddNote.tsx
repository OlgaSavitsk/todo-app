import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { noteService } from '@/helpers/note.service';
import { NoteData } from '@/shared/models/note.type';

type AddNoteProps = {
  onAddNote: (data: NoteData) => void;
};

function AddNote({ onAddNote }: AddNoteProps) {
  const [noteName, setNotesName] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newNote = {
      id: uuidV4(),
      title: noteName,
      tags: noteService.createTag(noteName),
    };
    onAddNote(newNote);
  }

  return (
    <>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Note Title" value={noteName} onChange={(e) => setNotesName(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddNote;

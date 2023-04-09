import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { noteService } from '@/helpers/note.service';
import { NoteData } from '@/shared/models/note.type';
import { Box, Button, InputAdornment, TextField } from '@mui/material';

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
      createdAt: new Date(),
    };
    onAddNote(newNote);
    setNotesName('');
  }

  return (
    <div>
      <h1>Notes</h1>
      <Box
        component="form"
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Add Note"
          placeholder="Note Title"
          value={noteName}
          onChange={(e) => setNotesName(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" type="submit">
                  Add Note
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  );
}

export default AddNote;

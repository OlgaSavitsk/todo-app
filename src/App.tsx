import { useEffect, useMemo, useState } from 'react';
import { HashRouter } from 'react-router-dom';

import NoteList from './components/NoteList/NoteList';
import SelectTag from './components/SelectTag/SelectTag';
import { NoteType, NoteData } from './shared/models/note.type';
import AddNote from './components/AddNote/AddNote';
import { notesApi } from './api/note';
import './App.scss';

function WrappedApp() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await notesApi.getNotes();
      setNotes(data);
    }
    fetchData();
  }, []);

  async function addNote({ ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [...prevNotes, data];
    });
    await notesApi.createNotes(data);
  }

  async function handleDeleteNotes(id: string) {
    setNotes(notes.filter((note) => note.id !== id));
    await notesApi.deleteNotes(id);
  }

  async function handleChangeNote(id: string, data: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        const updateNote = note.id === id ? data : note;
        return updateNote;
      });
    });
    await notesApi.updateNotes(id, data);
  }

  function handleChangeTags(data: string[]) {
    setSelectedTags(data);
  }

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return selectedTags.length === 0 || note.tags.some((noteTag) => selectedTags.includes(noteTag.label));
    });
  }, [selectedTags, notes]);

  return (
    <div className="App">
      <div className="control-container">
        <AddNote onAddNote={(data) => addNote(data)} />
        <SelectTag notes={notes} onChangeTags={handleChangeTags} />
      </div>
      <div>
        <NoteList
          notes={selectedTags ? filteredNotes : notes}
          onChangeNotes={handleChangeNote}
          onDeleteNotes={handleDeleteNotes}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <WrappedApp />
    </HashRouter>
  );
}

export default App;

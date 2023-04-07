import React, { useMemo, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import NoteList from './components/NoteList/NoteList';
import SelectTag from './components/SelectTag/SelectTag';
import './App.scss';

export type NoteType = {
  id: string;
} & NoteData;

export type NoteData = {
  id: string;
  title: string | undefined;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function WrappedApp() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [noteName, setNotesName] = useState('');

  const tags = useMemo(() => {
    return notes.flatMap((note) => {
      return note.tags.map((tag: Tag) => tag.label);
    });
  }, [notes]);

  function createTag(title: string): Tag[] {
    return title.split(' ').reduce((acc: Tag[], arg) => {
      if (arg.startsWith('#')) {
        const tag: string = arg;
        const newTag = { id: uuidV4(), label: tag };
        acc.push(newTag);
      }
      return acc;
    }, []);
  }

  function addNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          id: uuidV4(),
          title: noteName,
          tags: createTag(noteName),
        },
      ];
    });
  }

  function handleDeleteNotes(id: string) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleChangeNote(id: string, { title }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,

            id: id,
            title: title,
            tags: createTag(title!),
          };
        } else {
          return note;
        }
      });
    });
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
      <div>
        <h1>Notes</h1>
        <form onSubmit={addNote}>
          <input placeholder="Note Title" value={noteName} onChange={(e) => setNotesName(e.target.value)} />
          <button type="submit">Add</button>
        </form>
        <NoteList notes={filteredNotes} onChangeNotes={handleChangeNote} onDeleteNotes={handleDeleteNotes} />
      </div>
      <div>
        <h1>Tags</h1>
        <SelectTag tags={tags} onChangeTags={handleChangeTags} />
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

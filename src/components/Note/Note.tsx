import { Fragment, useRef, useState } from 'react';
import { Chip } from '@mui/material';

import { noteService } from '@/helpers/note.service';
import { NoteType, NoteData, Tag } from '@/shared/models/note.type';
import '@/App.scss';

type NoteProps = {
  note: NoteType;
  onDelete: (id: string) => void;
  onChange: (data: NoteData) => void;
};

function Highlight({ tags, str }: { tags: Tag[]; str: string }): JSX.Element {
  const tagsArr = tags.map((tag: Tag) => tag.label);
  const regExp = new RegExp(`(${tagsArr.join('|')})`, 'ig');
  const parts = str.split(regExp);
  return (
    <div className="highlight">
      {parts.map((part: string, index: number) =>
        part.match(regExp) ? (
          <span className="green" key={index}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </div>
  );
}

export function Note({ note, onChange, onDelete }: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(note.title);
  const titleRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    setIsEditing(false);
    const updatedNoteTitle = titleRef.current?.value;
    onChange({ ...note, title: updatedNoteTitle, tags: noteService.createTag(updatedNoteTitle!) });
  }

  return (
    <>
      <div className="container">
        {!isEditing && <Fragment>{note.title!.replace(/#/gi, '')}</Fragment>}

        {isEditing && (
          <Fragment>
            <input ref={titleRef} value={value} onChange={(e) => setValue(e.target.value)} />
            <Highlight tags={note.tags} str={value!} />
          </Fragment>
        )}
      </div>
      {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      {isEditing && <button onClick={handleSubmit}>Done</button>}
      <button onClick={() => onDelete(note.id)}>Delete</button>
      {note.tags.map((tag) => (
        <Chip key={tag.id} variant="outlined" label={tag.label} />
      ))}
    </>
  );
}

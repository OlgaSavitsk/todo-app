import { NoteData } from '../../App';
import { Note } from '../Note/Note';

type NoteListProps = {
  notes: NoteData[];
  onDeleteNotes: (id: string) => void;
  onChangeNotes: (id: string, data: NoteData) => void;
};

function NoteList({ notes, onChangeNotes, onDeleteNotes }: NoteListProps) {
  return (
    <ul>
      {notes.map((note) => {
        return (
          <li key={note.id}>
            <Note note={note} onChange={(data) => onChangeNotes(note.id, data)} onDelete={onDeleteNotes} />
          </li>
        );
      })}
    </ul>
  );
}

export default NoteList;

import { Fragment, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Chip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { noteService } from '@/helpers/note.service';
import { NoteType, NoteData, Tag } from '@/shared/models/note.type';
import '@/App.scss';

type NoteProps = {
  note: NoteType;
  onDelete: (id: string) => void;
  onChange: (data: NoteData) => void;
};

type HighlightProps = {
  tags: Tag[];
  str: string;
  onChange: (data: string) => void;
};

function Highlight({ tags, str, onChange }: HighlightProps): JSX.Element {
  const tagsArr = tags.map((tag: Tag) => tag.label);
  const regExp = new RegExp(`(${tagsArr.join('|')})`, 'ig');
  const parts = str.split(regExp);
  return (
    <div
      className="highlight"
      contentEditable={true}
      suppressContentEditableWarning={true}
      ref={(domNode) => {
        domNode?.focus();
      }}
      onInput={(e) => onChange(e.currentTarget.textContent!)}
    >
      {parts.map((part: string, index: number) =>
        part.match(regExp) && tagsArr.length ? (
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

  function handleSubmit() {
    setIsEditing(false);
    onChange({
      ...note,
      title: value,
      tags: noteService.createTag(value!),
      createdAt: new Date(),
    });
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader sx={{ textAlign: 'left' }} subheader={noteService.formateDate(note.createdAt)} />
        <CardContent>
          {!isEditing && (
            <Typography sx={{ textAlign: 'left' }} variant="body2" color="text.secondary">
              {note.title!.replace(/#/gi, '')}
            </Typography>
          )}

          {isEditing && (
            <Fragment>
              <Highlight tags={note.tags} str={note.title!} onChange={(data) => setValue(data)} />
            </Fragment>
          )}
        </CardContent>
        <CardContent>
          <div className="tag-container">
            {note.tags.map((tag) => (
              <Chip key={tag.id} variant="outlined" label={tag.label} />
            ))}
          </div>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {!isEditing && (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          {isEditing && (
            <Button size="small" onClick={handleSubmit}>
              Save
            </Button>
          )}
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onDelete(note.id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

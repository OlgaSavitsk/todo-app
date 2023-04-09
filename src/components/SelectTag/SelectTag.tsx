import { useMemo } from 'react';
import { Stack, Autocomplete, Chip, TextField } from '@mui/material';

import { NoteData, Tag } from '@/shared/models/note.type';

type NoteListProps = {
  notes: NoteData[];
  onChangeTags: (data: string[]) => void;
};

function SelectTag({ notes, onChangeTags }: NoteListProps) {
  const tags = useMemo(() => {
    return notes.flatMap((note) => {
      return note.tags.map((tag: Tag) => tag.label);
    });
  }, [notes]);

  return (
    <div>
      <h1>Tags</h1>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={[...new Set(tags)]}
          freeSolo
          onChange={(event, newValue) => {
            onChangeTags(newValue);
          }}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />
            ))
          }
          renderInput={(params) => <TextField {...params} variant="filled" placeholder="Select tag" />}
        />
      </Stack>
    </div>
  );
}

export default SelectTag;

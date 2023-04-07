import { Stack, Autocomplete, Chip, TextField } from '@mui/material';

type NoteListProps = {
  tags: string[];
  onChangeTags: (data: string[]) => void;
};

function SelectTag({ tags, onChangeTags }: NoteListProps) {
  return (
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
            // eslint-disable-next-line react/jsx-key
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => <TextField {...params} variant="filled" placeholder="Select tag" />}
      />
    </Stack>
  );
}

export default SelectTag;

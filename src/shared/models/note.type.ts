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

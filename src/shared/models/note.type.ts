export type NoteType = {
  id: string;
} & NoteData;

export type NoteData = {
  id: string;
  title: string | undefined;
  tags: Tag[];
  createdAt: Date;
};

export type Tag = {
  id: string;
  label: string;
};

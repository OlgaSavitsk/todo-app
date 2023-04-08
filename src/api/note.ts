import { NoteData } from '@/shared/models/note.type';
import { Base } from './Base';

export class Note extends Base {
  PATH_NOTES = '/notes';

  getNotes(): Promise<NoteData[]> {
    const instanse = this.getInstance();
    return this.getRequest(instanse.get(`${this.PATH_NOTES}`));
  }

  createNotes(note: NoteData): Promise<NoteData> {
    const instanse = this.getInstance();
    return this.getRequest(instanse.post(`${this.PATH_NOTES}`, note));
  }

  deleteNotes(id: string): Promise<NoteData[]> {
    const instanse = this.getInstance();
    return this.getRequest(instanse.delete(`${this.PATH_NOTES}/${id}`));
  }

  updateNotes(id: string, note: NoteData): Promise<NoteData[]> {
    const instanse = this.getInstance();
    return this.getRequest(instanse.put(`${this.PATH_NOTES}/${id}`, note));
  }
}

export const notesApi = new Note();

import { v4 as uuidV4 } from 'uuid';

import { Tag } from '@/shared/models/note.type';

export const noteService = {
  createTag(title: string): Tag[] {
    return title.split(' ').reduce((acc: Tag[], arg) => {
      if (arg.startsWith('#')) {
        const tag: string = arg;
        const newTag = { id: uuidV4(), label: tag };
        acc.push(newTag);
      }
      return acc;
    }, []);
  },

  formateDate(createdDate: Date) {
    const date = new Date(createdDate);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  },
};

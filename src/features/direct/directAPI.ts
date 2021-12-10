import { WithId } from './../../app/types';
import { Direct, ItemsResponse, Message, Response } from '../../app/types';

export const directAPI = {
  get: (id: number) => {
    return new Promise<Response<Direct>>((res) => {
      setTimeout(() => {
        res({
          data: {
            contact: {
              id,
              contact: true,
              department: 'daa',
              group: 'f',
              login: 'durak',
              name: 'max',
              photo: null,
              status: 'student',
            },
          },
          errors: [],
        });
      }, 2000);
    });
  },

  getMessages: ({
    id,
    page,
    count,
  }: {
    id: number;
    page: number;
    count: number;
  }) => {
    return new Promise<ItemsResponse<(Message & WithId)[]>>((res) => {
      setTimeout(() => {
        res({
          data: {
            items: [
              {
                id: 1,
                authorId: id,
                text: 'fafaf',
              },
              {
                id: 2,
                authorId: 2,
                text: 'czxc',
              },
              {
                id: 3,
                authorId: 2,
                text: 'kuku',
              },
              {
                id: 4,
                authorId: id,
                text: 'poka',
              },
            ],
            total: 20,
          },
          errors: [],
        });
      }, 2000);
    });
  },
};

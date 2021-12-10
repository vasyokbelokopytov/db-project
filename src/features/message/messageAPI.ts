import {
  Response,
  Message,
  MessageCreatedData,
  WithId,
} from './../../app/types';
export const messageAPI = {
  get: (id: number) => {
    return new Promise<Response<Message & WithId>>((res) => {
      setTimeout(() => {
        res({
          data: {
            id,
            authorId: id,
            text: 'boroda',
          },
          errors: [],
        });
      }, 2000);
    });
  },

  create: (message: Pick<Message, 'text'>) => {
    return new Promise<Response<MessageCreatedData>>((res) => {
      setTimeout(() => {
        res({
          data: {
            id: 222,
          },
          errors: [],
        });
      }, 2000);
    });
  },
};

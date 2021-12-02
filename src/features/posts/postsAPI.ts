import { PostWithId } from './../../app/types';
import { Response, ItemsResponse, Post } from '../../app/types';

export const postsAPI = {
  get: (channelId: number) => {
    return new Promise<ItemsResponse<PostWithId[]>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              items: [
                {
                  id: 1,
                  authorId: 2,
                  text: 'bla',
                },

                {
                  id: 1,
                  authorId: 1,
                  text: 'bla bla',
                },

                {
                  id: 1,
                  authorId: 2,
                  text: 'bla sho',
                },
              ],
              total: 5,
            },
            errors: [],
          }),
        1000
      );
    });
  },

  create: (post: Post, channelId: number) => {
    return new Promise<Response<PostWithId>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id: Math.random(),
              ...post,
            },
            errors: [],
          }),
        1000
      );
    });
  },
};

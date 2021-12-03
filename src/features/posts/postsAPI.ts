import { WithId } from './../../app/types';
import { Response, ItemsResponse, Post } from '../../app/types';

export const postsAPI = {
  get: (channelId: number) => {
    return new Promise<ItemsResponse<(Post & WithId)[]>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              items: [
                {
                  id: 1,
                  channelId: 3,
                  author: {
                    id: 1,
                    login: 'масло1337',
                    name: 'маслянко',
                    status: 'lecturer',
                    department: 'ПМА',
                    photo: null,
                  },
                  text: 'blavdsv',
                },

                {
                  id: 2,
                  channelId: 3,
                  author: {
                    id: 1,
                    login: 'масло1337',
                    name: 'маслянко',
                    status: 'lecturer',
                    department: 'ПМА',
                    photo: null,
                  },
                  text: 'bdsvsdla',
                },

                {
                  id: 3,
                  channelId: 3,
                  author: {
                    id: 1,
                    login: 'масло1337',
                    name: 'маслянко',
                    status: 'lecturer',
                    department: 'ПМА',
                    photo: null,
                  },
                  text: 'bldvsdva',
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

  create: (post: Omit<Post, 'author'>) => {
    return new Promise<Response<Post & WithId>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id: Math.random(),
              ...post,
              author: {
                id: 1,
                login: 'масло1337',
                name: 'маслянко',
                status: 'lecturer',
                department: 'ПМА',
                photo: null,
              },
            },
            errors: [],
          }),
        1000
      );
    });
  },
};

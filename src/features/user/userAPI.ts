import {
  Response,
  User,
  UserWithId,
  ChannelsPreviewData,
} from './../../app/types';

export const userAPI = {
  get: (id: number) => {
    return new Promise<Response<UserWithId>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              group: 'authorize group',
              faculty: 'st',
              id: 1,
              login: 'auther',
              name: 'not me',
              status: 'student',
              photo: null,
            },
            errors: [],
          }),
        1000
      );
    });
  },

  update: (userData: User) => {
    return new Promise<Response<{}>>((res) => {
      setTimeout(
        () =>
          res({
            data: {},
            errors: [],
          }),
        1000
      );
    });
  },

  getChannels: () => {
    return new Promise<Response<ChannelsPreviewData>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              items: [
                {
                  id: 1,
                  name: 'aboba',
                  photo: null,
                },
                {
                  id: 2,
                  name: 'v',
                  photo: null,
                },
                {
                  id: 3,
                  name: 'b',
                  photo: null,
                },
              ],
              total: 10,
            },
            errors: [],
          }),
        1000
      );
    });
  },
};

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
              group: 'КМ-83',
              faculty: 'ФПМ',
              id: 1,
              login: 'zloykrecker',
              name: 'Бєлокопитов Василь Олександрович',
              status: 'student',
              photo: null,
            },
            errors: [],
          }),
        1000
      );
    });
  },

  update: (userData: Partial<User>) => {
    return new Promise<Response<UserWithId>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              department: 'hu',
              faculty: 'ФПМF',
              id: 1,
              login: 'vvv',
              name: 'Бєлокопитов Василь Олександрович',
              status: 'lecturer',
              photo: userData.photo ?? null,
            },
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

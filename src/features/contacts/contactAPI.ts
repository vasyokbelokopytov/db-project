import { WithPhoto, WithId } from './../../app/types';
import { Response, User } from '../../app/types';

export const contactAPI = {
  check: (id: number) => {
    return new Promise<Response<{ isContact: boolean }>>((res) => {
      setTimeout(() => {
        res({
          data: {
            isContact: false,
          },
          errors: [],
        });
      }, 2000);
    });
  },

  add: (id: number) => {
    return new Promise<Response<User & WithPhoto & WithId>>((res) => {
      setTimeout(() => {
        res({
          data: {
            id: 2,
            department: 'borffoda',
            login: 'vfckj',
            name: 'vfvbvf',
            photo: null,
            status: 'student',
            group: 'cx',
          },
          errors: [],
        });
      }, 2000);
    });
  },

  remove: (id: number) => {
    return new Promise<Response<{}>>((res) => {
      setTimeout(() => {
        res({
          data: {},
          errors: [],
        });
      }, 2000);
    });
  },
};

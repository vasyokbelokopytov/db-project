import { Response } from '../../app/types';

export const contactAPI = {
  add: (id: number) => {
    return new Promise<Response<{}>>((res) => {
      setTimeout(() => {
        res({
          data: {},
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

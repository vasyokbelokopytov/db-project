import { Response, Channel, WithId, WithPhoto } from './../../app/types';

export const channelAPI = {
  get: (id: number) => {
    return new Promise<Response<Channel & WithId & WithPhoto>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id,
              name: 'kpi',
              description: 'about',
              photo: null,
            },
            errors: [],
          }),
        1000
      );
    });
  },

  create: (channel: Channel & WithPhoto) => {
    return new Promise<Response<Channel & WithId & WithPhoto>>((res) => {
      setTimeout(
        () =>
          res({
            data: { id: Math.random(), ...channel },
            errors: [],
          }),
        1000
      );
    });
  },

  update: (channel: Partial<Channel & WithPhoto>) => {
    return new Promise<Response<Channel & WithId & WithPhoto>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id: 4,
              name: 'updated',
              description: 'about',
              photo: null,
            },
            errors: [],
          }),
        1000
      );
    });
  },
};

import { Response, Channel, ChannelWithId } from './../../app/types';

export const userAPI = {
  get: (id: number) => {
    return new Promise<Response<ChannelWithId>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id,
              name: 'kpi',
              photo: null,
            },
            errors: [],
          }),
        1000
      );
    });
  },

  create: (channel: Channel) => {
    return new Promise<Response<ChannelWithId>>((res) => {
      setTimeout(
        () =>
          res({
            data: channel,
            errors: [],
          }),
        1000
      );
    });
  },

  update: (userData: Partial<Channel>) => {
    return new Promise<Response<ChannelWithId>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id: 4,
              name: 'updated',
              photo: null,
            },
            errors: [],
          }),
        1000
      );
    });
  },
};

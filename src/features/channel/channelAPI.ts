import { Response, Channel, ChannelWithId } from './../../app/types';

export const channelAPI = {
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
            data: { id: Math.random(), ...channel },
            errors: [],
          }),
        1000
      );
    });
  },

  update: (channelWithId: Partial<ChannelWithId>) => {
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

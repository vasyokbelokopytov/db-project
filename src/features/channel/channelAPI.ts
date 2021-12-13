import { template } from '../../app/api';
import {
  Response,
  Channel,
  WithId,
  WithPhoto,
  ChannelCreatedData,
  ItemsResponse,
  Post,
} from './../../app/types';

export const channelAPI = {
  get: (id: number) => {
    return template.get<Response<Channel & WithId & WithPhoto>>(
      `channel/${id}`
    );
  },

  create: (channel: Channel & WithPhoto) => {
    return template.post<Response<ChannelCreatedData>>('channel', {
      ...channel,
    });
  },

  update: (channel: Channel & WithId & WithPhoto) => {
    return template.put<Response<{}>>(`channel/${channel.id}`, { ...channel });
  },

  getPosts: ({
    id,
    page,
    count,
  }: {
    id: number;
    page: number;
    count: number;
  }) => {
    return template.get<ItemsResponse<(Post & WithId)[]>>(
      `channel/${id}/posts?page=${page}&count=${count}`
    );
  },
};

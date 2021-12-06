import { template } from './../../app/api';
import { SettingsFormValues } from './../../components/Settings';
import {
  Response,
  WithPhoto,
  User,
  WithId,
  ItemsResponse,
  ChannelPreview,
} from './../../app/types';

export const userAPI = {
  get: (id: number) => {
    return template.get<Response<User & WithId & WithPhoto>>(`user/${id}`);
  },

  update: (userData: SettingsFormValues & WithPhoto) => {
    return template.put<Response<{}>>('user', {
      ...userData,
    });
  },

  getChannels: (page: number, count: number) => {
    return template.get<ItemsResponse<ChannelPreview[]>>(
      `/user/channels?page=${page}&count=${count}`
    );
  },
};

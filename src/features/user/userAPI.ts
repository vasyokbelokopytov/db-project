import { template } from './../../app/api';
import { SettingsFormValues } from './../../components/Settings';
import { Response, ChannelsPreviewData, WithPhoto } from './../../app/types';

export const userAPI = {
  get: (id: number) => {
    return template.get(`user/${id}`);
  },

  update: (userData: SettingsFormValues & WithPhoto) => {
    return template.put('user', {
      ...userData,
    });
  },

  getChannels: (page: number = 1, count: number = 5) => {
    return template.get<Response<ChannelsPreviewData>>(
      `/user/channels?page=${page}&count=${count}`
    );
  },
};

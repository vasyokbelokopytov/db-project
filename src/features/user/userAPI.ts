import { SettingsFormValues } from './../../components/Settings';
import {
  Response,
  User,
  ChannelsPreviewData,
  WithId,
  WithPhoto,
} from './../../app/types';

export const userAPI = {
  get: (id: number) => {
    return new Promise<Response<User & WithId & WithPhoto>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              group: 'КМ-83',
              department: 'ФПМ',
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

  update: (userData: SettingsFormValues & WithPhoto) => {
    return new Promise<Response<User & WithId & WithPhoto>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              department: 'hu',
              id: 1,
              login: 'vvv',
              name: 'Бєлокопитов Василь Олександрович',
              status: 'lecturer',
              photo: userData.photo,
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

import { User, WithId, WithPhoto } from './../../app/types';
import { ItemsResponse } from '../../app/types';

export const searchAPI = {
  get: ({
    contact,
    count,
    page,
    query,
  }: {
    page: number;
    count: number;
    contact: boolean;
    query: string;
  }) => {
    return new Promise<ItemsResponse<(User & WithId & WithPhoto)[]>>((res) => {
      setTimeout(() => {
        res({
          data: {
            items: [
              {
                id: 1,
                department: 'boroda',
                login: 'vfcsdcscdckj',
                name: 'vfvf',
                photo: null,
                status: 'lecturer',
              },
              {
                id: 2,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
              },
              {
                id: 3,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
              },
              {
                id: 1,
                department: 'boroda',
                login: 'vfcsdcscdckj',
                name: 'vfvf',
                photo: null,
                status: 'lecturer',
              },
              {
                id: 2,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
              },
              {
                id: 3,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
              },
              {
                id: 1,
                department: 'boroda',
                login: 'vfcsdcscdckj',
                name: 'vfvf',
                photo: null,
                status: 'lecturer',
              },
              {
                id: 2,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
              },
              {
                id: 3,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
              },
              {
                id: 1,
                department: 'boroda',
                login: 'vfcsdcscdckj',
                name: 'vfvf',
                photo: null,
                status: 'lecturer',
              },
              {
                id: 2,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
              },
              {
                id: 3,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
              },
            ],
            total: 20,
          },
          errors: [],
        });
      }, 5000);
    });
  },
};

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
    contact: '0' | '1' | '2';
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
                contact: false,
              },
              {
                id: 2,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
                contact: true,
              },
              {
                id: 3,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
                contact: true,
              },
              {
                id: 4,
                department: 'boroda',
                login: 'vfcsdcscdckj',
                name: 'vfvf',
                photo: null,
                status: 'lecturer',
                contact: false,
              },
              {
                id: 5,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
                contact: true,
              },
              {
                id: 6,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
                contact: false,
              },
              {
                id: 7,
                department: 'boroda',
                login: 'vfcsdcscdckj',
                name: 'vfvf',
                photo: null,
                status: 'lecturer',
                contact: true,
              },
              {
                id: 8,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
                contact: false,
              },
              {
                id: 9,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
                contact: true,
              },
              {
                id: 10,
                department: 'boroda',
                login: 'vfcsdcscdckj',
                name: 'vfvf',
                photo: null,
                status: 'lecturer',
                contact: false,
              },
              {
                id: 12,
                department: 'borffoda',
                login: 'vfckj',
                name: 'vfvbvf',
                photo: null,
                status: 'student',
                group: 'cx',
                contact: false,
              },
              {
                id: 33,
                department: 'boroda123',
                login: 'vfckjtra',
                name: 'vfvfaaa',
                photo: null,
                status: 'lecturer',
                contact: false,
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

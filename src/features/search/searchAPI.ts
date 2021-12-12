import { template } from './../../app/api';
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
    const response = template.get<ItemsResponse<(User & WithId & WithPhoto)[]>>(
      `search?query=${query}&count=${count}&page=${page}&contact=${contact}`
    );

    return response;
  },
};

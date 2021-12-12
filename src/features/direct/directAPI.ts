import { template } from './../../app/api';
import { Message, WithId, ItemsResponse } from './../../app/types';

export const directAPI = {
  getMessages: ({
    id,
    page,
    count,
  }: {
    id: number;
    page: number;
    count: number;
  }) => {
    return template.get<ItemsResponse<(Message & WithId)[]>>(
      `direct/${id}?page=${page}&count=${count}`
    );
  },
};

import { template } from './../../app/api';
import { Response, MessageCreatedData, Message } from './../../app/types';
export const messageAPI = {
  create: (message: Message) => {
    return template.post<Response<MessageCreatedData>>('message', message);
  },
};

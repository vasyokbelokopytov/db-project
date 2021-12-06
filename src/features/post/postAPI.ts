import { PostCreatedData } from './../../app/types';
import { template } from '../../app/api';

import { Response, ItemsResponse, Post, WithId } from '../../app/types';

export const postAPI = {
  create: (post: Omit<Post, 'author'>) => {
    return template.post<Response<PostCreatedData>>('posts', { ...post });
  },
};

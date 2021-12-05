import { template } from './../../app/api';
import { AuthData, Response, User } from './../../app/types';
import { SignInData } from './authSlice';

export const authAPI = {
  authorize: () => {
    return template.get<Response<AuthData>>('session');
  },

  signIn: ({ login, password }: SignInData) => {
    return template.post<Response<AuthData>>('session', {
      login,
      password,
    });
  },

  signUp: (user: User) => {
    return template.post<Response<AuthData>>('user', {
      ...user,
    });
  },

  signOut: () => {
    return template.delete<Response<AuthData>>('session');
  },
};

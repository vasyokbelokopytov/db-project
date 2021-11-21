import { AuthData, Response, User } from './../../app/types';
import { SignInData } from './authSlice';

export const authAPI = {
  authorize: () => {
    return new Promise<Response<AuthData>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id: 23,
            },
            errors: [],
          }),
        1000
      );
    });
  },

  signIn: ({ login, password }: SignInData) => {
    return new Promise<Response<AuthData>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id: 23,
            },
            errors: [],
          }),
        2000
      );
    });
  },

  signUp: (user: User) => {
    return new Promise<Response<AuthData>>((res) => {
      setTimeout(
        () =>
          res({
            data: {
              id: 23,
            },
            errors: [],
          }),
        2000
      );
    });
  },

  signOut: () => {
    return new Promise<Response<AuthData>>((res) => {
      setTimeout(
        () =>
          res({
            data: {},
            errors: [],
          }),
        2000
      );
    });
  },
};

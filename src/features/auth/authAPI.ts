import { SignInData } from './authSlice';

export const authAPI = {
  signIn: ({ login, password }: SignInData) => {
    return new Promise<{ id: number }>((res) => {
      setTimeout(() => res({ id: Date.now() }), 2000);
    });
  },

  signOut: () => {
    return new Promise<void>((res) => {
      setTimeout(() => res(), 2000);
    });
  },
};

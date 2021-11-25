import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authorize, signIn, SignInData, signOut } from './authSlice';

export const useAuth = () => {
  const authId = useAppSelector((state) => state.auth.id);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  const dispatch = useAppDispatch();

  return {
    authId,
    error,
    isLoading,
    authorize: () => {
      dispatch(authorize());
    },
    signIn: ({ login, password }: SignInData) => {
      dispatch(signIn({ login, password }));
    },
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export const useRedirectFromAuth = () => {
  const authId = useAppSelector((state) => state.auth.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (authId) {
      navigate('/');
    }
  }, [authId, navigate]);
};

import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';

interface Props {
  children: React.ReactElement<any, any> | null;
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const authId = useAppSelector((state) => state.auth.id);
  return authId ? children : <Navigate to="/sign-in" />;
};

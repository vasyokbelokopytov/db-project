import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';

export const useRedirectFromAuth = () => {
  const authId = useAppSelector((state) => state.auth.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (authId) {
      navigate('/');
    }
  }, [authId, navigate]);
};

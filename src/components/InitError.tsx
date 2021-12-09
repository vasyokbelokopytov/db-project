import { Button, Result } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init } from '../features/app/appSlice';
import { authorize } from '../features/auth/authSlice';

interface Props {
  error: string | null;
  loading: boolean;
}

export const InitError: React.FC<Props> = ({ error, loading }) => {
  const dispatch = useAppDispatch();
  const authId = useAppSelector((state) => state.auth.id);

  const clickHandler = () => {
    if (authId) {
      dispatch(init(authId));
      return;
    }

    dispatch(authorize());
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Result
        status="warning"
        title="Виникла помилка під час завантаження додатку"
        subTitle={error}
        extra={
          <Button type="primary" onClick={clickHandler} loading={loading}>
            Спробувати ще раз
          </Button>
        }
      />
    </div>
  );
};

import { Button, Result } from 'antd';
import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { init } from '../features/app/appSlice';
import { authorize } from '../features/auth/authSlice';

interface Props {
  error: string | null;
}

export const InitError: React.FC<Props> = ({ error }) => {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(authorize());
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Result
        status="warning"
        title="Виникла помилка під час завантаження додатку"
        subTitle={error}
        extra={
          <Button type="primary" onClick={clickHandler}>
            Спробувати ще раз
          </Button>
        }
      />
    </div>
  );
};

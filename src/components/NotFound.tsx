import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/');
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Вибачте, такої сторінки не існує"
        extra={
          <Button type="primary" onClick={clickHandler}>
            На головну
          </Button>
        }
      />
    </div>
  );
};

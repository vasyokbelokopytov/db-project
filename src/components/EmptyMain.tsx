import { Button, Empty } from 'antd';

import { Typography } from 'antd';

import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { creatorOpened } from '../features/channel/channelSlice';

const { Paragraph } = Typography;

export const EmptyMain: React.FC = () => {
  const dispatch = useAppDispatch();

  const openForm = () => {
    dispatch(creatorOpened());
  };

  return (
    <Empty
      className=""
      description={
        <div>
          <Paragraph strong>Почніть свою роботу зі створеня каналу</Paragraph>
          <Button type="primary" onClick={openForm}>
            Створити канал
          </Button>
        </div>
      }
    />
  );
};

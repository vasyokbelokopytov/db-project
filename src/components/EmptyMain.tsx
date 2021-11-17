import { Button, Empty } from 'antd';

import { Typography } from 'antd';

import React from 'react';

const { Paragraph } = Typography;

export const EmptyMain: React.FC = () => {
  return (
    <Empty
      className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      description={
        <div>
          <Paragraph strong>Почніть свою роботу зі створеня серверу</Paragraph>
          <Button type="primary">Створити сервер</Button>
        </div>
      }
    />
  );
};

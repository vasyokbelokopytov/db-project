import { Button, Empty } from 'antd';

import { Typography } from 'antd';

import React from 'react';

const { Paragraph } = Typography;

export const EmptyMain: React.FC = () => {
  return (
    <Empty
      className=""
      description={
        <div>
          <Paragraph strong>Почніть свою роботу зі створеня серверу</Paragraph>
          <Button type="primary">Створити сервер</Button>
        </div>
      }
    />
  );
};

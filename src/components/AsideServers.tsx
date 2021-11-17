import React from 'react';

import { Col, Avatar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const AsideServers: React.FC = () => {
  return (
    <Col flex="65px" className="flex flex-col gap-4 items-center p-2">
      <Button icon={<PlusOutlined />} shape="circle" size="large" />
      <Avatar size={46}>U</Avatar>
      <Avatar size={46}>U</Avatar>
      <Avatar size={46}>U</Avatar>
      <Avatar size={46}>U</Avatar>
    </Col>
  );
};

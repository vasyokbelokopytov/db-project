import React from 'react';

import { Row, Col, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import logo from '../assets/logo.png';
import Text from 'antd/lib/typography/Text';

export const Header: React.FC = () => {
  return (
    <Row className="border-b-2">
      <Col flex="65px" className="flex flex-col gap-4 items-center p-2">
        <img src={logo} alt="kpi logo" className="w-14" />
      </Col>
      <Col flex="auto" className="p-2"></Col>
      <Col flex="200px" className="flex justify-between items-center p-2">
        <div className="w-4">
          <Avatar size="large" icon={<UserOutlined />} />
          <Text strong>zloykreckerzloykreckerzloykreckerzloykrecker</Text>
        </div>

        <Button type="link" icon={<LogoutOutlined />} />
      </Col>
    </Row>
  );
};

import React from 'react';

import { Col } from 'antd';

import { EmptyMain } from './EmptyMain';

export const Main: React.FC = () => {
  return (
    <Col flex="auto" className="p-2 bg-white">
      <EmptyMain />
    </Col>
  );
};

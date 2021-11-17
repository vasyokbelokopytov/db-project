import React from 'react';

import { Row } from 'antd';
import { AsideServers } from './AsideServers';
import { Main } from './Main';
import { AsideContacts } from './AsideContacts';

export const Body: React.FC = () => {
  return (
    <Row className="h-full">
      <AsideServers />
      <Main />
      <AsideContacts />
    </Row>
  );
};

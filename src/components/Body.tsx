import React from 'react';

import { AsideServers } from './AsideServers/AsideServers';
import { Main } from './Main';
import { AsideContacts } from './AsideContacts';

export const Body: React.FC = () => {
  return (
    <section className="h-full flex">
      <AsideServers />
      <Main />
      <AsideContacts />
    </section>
  );
};

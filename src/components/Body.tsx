import React from 'react';

import { AsideServers } from './AsideServers/AsideServers';
import { AsideContacts } from './AsideContacts';
import { Outlet } from 'react-router';

export const Body: React.FC = () => {
  return (
    <>
      <AsideServers />
      <main className="flex justify-center items-center flex-grow bg-white p-2">
        <Outlet />
      </main>
      <AsideContacts />
    </>
  );
};

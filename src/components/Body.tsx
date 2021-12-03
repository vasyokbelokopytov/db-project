import React from 'react';

import { AsideChannels } from './AsideChannels/AsideChannels';
import { AsideContacts } from './AsideContacts/AsideContacts';
import { Outlet } from 'react-router';
import { CreateChannelForm } from './Channel/CreateChannelForm';
import { EditChannelForm } from './Channel/EditChannelForm';

export const Body: React.FC = () => {
  return (
    <>
      <AsideChannels />
      <main className="flex justify-center items-center flex-grow bg-white p-6">
        <CreateChannelForm />
        <EditChannelForm />
        <Outlet />
      </main>
      <AsideContacts />
    </>
  );
};

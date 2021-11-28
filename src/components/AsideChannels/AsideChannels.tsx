import React from 'react';

import { AsideChannel } from './AsideChannel';
import { AsideButton } from './AsideButton';
import { useAppSelector } from '../../app/hooks';

export const AsideChannels: React.FC = () => {
  const channels = useAppSelector((state) => state.user.channels);

  return (
    <aside className="flex flex-col items-center bg-gray-100">
      <AsideButton />

      {channels
        .map((channel) => <AsideChannel key={channel.id} channel={channel} />)
        .reverse()}
    </aside>
  );
};

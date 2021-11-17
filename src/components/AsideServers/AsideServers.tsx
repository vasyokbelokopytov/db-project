import React from 'react';

import { AsideServer } from './AsideServer';
import { AsideButton } from './AsideButton';

export const AsideServers: React.FC = () => {
  return (
    <aside className="flex flex-col items-center bg-gray-100">
      <AsideServer />
      <AsideServer />
      <AsideServer />
      <AsideServer />
      <AsideButton />
    </aside>
  );
};

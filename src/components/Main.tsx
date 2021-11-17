import React from 'react';

import { EmptyMain } from './EmptyMain';

export const Main: React.FC = () => {
  return (
    <main className="relative flex-grow bg-white p-2">
      <EmptyMain />
    </main>
  );
};

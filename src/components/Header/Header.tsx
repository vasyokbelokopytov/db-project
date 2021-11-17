import React from 'react';

import { HeaderLogo } from './HeaderLogo';
import { HeaderMiddle } from './HeaderMiddle';
import { HeaderUser } from './HeaderUser';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center border-b-2 bg-gray-100">
      <HeaderLogo />
      <HeaderMiddle />
      <HeaderUser />
    </header>
  );
};

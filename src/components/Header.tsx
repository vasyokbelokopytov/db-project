import React from 'react';

import logo from '../assets/logo.png';
import { UserCircleIcon } from '@heroicons/react/solid';

export const Header: React.FC = () => {
  return (
    <header className="px-4 py-2">
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img className="h-14" src={logo} alt="kpi logo" />
          <h1 className="font-title font-semibold text-xl">KPI Network</h1>
        </div>
        <div className="">
          <UserCircleIcon className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
};

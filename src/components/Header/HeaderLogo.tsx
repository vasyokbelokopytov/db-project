import React from 'react';

import logo from '../../assets/logo.png';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="flex flex-none w-18 p-2">
      <img src={logo} alt="kpi logo" className="w-full" />
    </div>
  );
};

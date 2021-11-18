import React from 'react';

import logo from '../../assets/logo.png';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-none w-18 p-1">
      <img src={logo} alt="kpi logo" className="w-14" />
    </div>
  );
};

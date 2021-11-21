import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-none w-18 p-1">
      <Link to="/">
        <img src={logo} alt="kpi logo" className="w-14" />
      </Link>
    </div>
  );
};

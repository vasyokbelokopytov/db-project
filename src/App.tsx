import React from 'react';
import { Body } from './components/Body';

import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  return (
    <div className="box-border h-screen flex flex-col">
      <Header />
      <Body />
    </div>
  );
};

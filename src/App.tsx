import React from 'react';
import { Body } from './components/Body';

import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <Body />
    </div>
  );
};

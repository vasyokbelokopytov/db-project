import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Body } from './components/Body';

import { Header } from './components/Header/Header';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

export const App: React.FC = () => {
  return (
    <div className="box-border h-screen flex flex-col">
      <Header />
      <section className="h-full flex relative">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </section>
    </div>
  );
};

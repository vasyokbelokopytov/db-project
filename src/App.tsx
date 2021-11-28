import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Body } from './components/Body';
import { Channel } from './components/Channel/Channel';
import { EmptyMain } from './components/EmptyMain';

import { Header } from './components/Header/Header';
import { Init } from './components/Init';
import { Settings } from './components/Settings';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { init } from './features/app/appSlice';
import { PrivateRoute } from './features/auth/PrivateRoute';

export const App: React.FC = () => {
  const isInit = useAppSelector((state) => state.app.isInit);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isInit) {
      dispatch(init());
    }
  }, [dispatch, isInit]);

  if (!isInit) return <Init />;

  return (
    <div className="box-border h-screen flex flex-col">
      <Header />
      <section className="flex-grow flex overflow-hidden">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <EmptyMain />
                </PrivateRoute>
              }
            />
            <Route
              path="/channel/:channelId"
              element={
                <PrivateRoute>
                  <Channel />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </section>
    </div>
  );
};

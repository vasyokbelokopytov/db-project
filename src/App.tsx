import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Body } from './components/Body';
import { EmptyMain } from './components/EmptyMain';

import { Header } from './components/Header/Header';
import { Init } from './components/Init';
import { Settings } from './components/Settings';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { init } from './features/app/appSlice';
import { PrivateRoute } from './features/auth/PrivateRoute';

export const App: React.FC = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  if (isLoading) return <Init />;

  return (
    <div className="box-border h-screen flex flex-col">
      <Header />
      <section className="h-full flex">
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Body />}>
            <Route index element={<EmptyMain />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </section>
    </div>
  );
};

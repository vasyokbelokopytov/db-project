import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Body } from './components/Body';
import { Channel } from './components/Channel/Channel';
import { EmptyMain } from './components/EmptyMain';

import { Header } from './components/Header/Header';
import { Init } from './components/Init';
import { InitError } from './components/InitError';
import { NotFound } from './components/NotFound';
import { Search } from './components/Search/Search';
import { Settings } from './components/Settings';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { init } from './features/app/appSlice';
import { authorize } from './features/auth/authSlice';
import { PrivateRoute } from './features/auth/PrivateRoute';

export const App: React.FC = () => {
  const authId = useAppSelector((state) => state.auth.id);
  const isInit = useAppSelector((state) => state.app.isInit);
  const isIniting = useAppSelector((state) => state.app.isIniting);
  const isAuthorizing = useAppSelector((state) => state.auth.isAuthorizing);
  const initError = useAppSelector((state) => state.app.error);
  const authError = useAppSelector((state) => state.auth.authError);

  const error = initError ?? authError;
  const isLoading = isIniting || isAuthorizing;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInit && !initError) {
      dispatch(authorize());
    }
  }, [dispatch, initError, isInit]);

  useEffect(() => {
    if (authId) {
      dispatch(init(authId));
    }
  }, [authId, dispatch]);

  if (error) {
    return <InitError error={error} loading={isLoading} />;
  }

  if (isLoading && !error) return <Init />;

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
              path="/chat/:userId"
              element={
                <PrivateRoute>
                  <EmptyMain />
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
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <Search />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
    </div>
  );
};

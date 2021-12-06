import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import channelReducer from '../features/channel/channelSlice';
import postReducer from '../features/post/postSlice';

import appReducer from '../features/app/appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    channel: channelReducer,
    post: postReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

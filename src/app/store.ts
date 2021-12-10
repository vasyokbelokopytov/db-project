import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import channelReducer from '../features/channel/channelSlice';
import postReducer from '../features/post/postSlice';
import searchReducer from '../features/search/searchSlice';
import contactReducer from '../features/contact/contactSlice';
import directReducer from '../features/direct/directSlice';
import messageReducer from '../features/message/messageSlice';

import appReducer from '../features/app/appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    channel: channelReducer,
    post: postReducer,
    app: appReducer,
    search: searchReducer,
    contact: contactReducer,
    direct: directReducer,
    message: messageReducer,
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

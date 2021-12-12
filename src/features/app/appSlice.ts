import {
  fetchUser,
  fetchUserChannels,
  fetchUserContacts,
  UserState,
} from './../user/userSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AppState {
  isInit: boolean;
  isIniting: boolean;
  error: string | null;
}

const initialState: AppState = {
  isInit: false,
  isIniting: false,
  error: null,
};

export const init = createAsyncThunk(
  'app/init',
  async (id: number, { dispatch, getState }) => {
    const state = getState() as { user: UserState };
    return await Promise.all([
      dispatch(fetchUser(id)).unwrap(),
      dispatch(
        fetchUserChannels({
          portion: 1,
          count: state.user.channelsCount,
        })
      ).unwrap(),
      dispatch(
        fetchUserContacts({
          count: state.user.contactsCount,
          portion: 1,
        })
      ).unwrap(),
    ]);
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initChanged: (state, action) => {
      state.isInit = action.payload;
    },
    initErrorChanged: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.isIniting = true;
      })
      .addCase(init.fulfilled, (state) => {
        state.isIniting = false;
        state.isInit = true;
        state.error = null;
      })
      .addCase(init.rejected, (state, action) => {
        state.isIniting = false;
        state.isInit = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { initChanged, initErrorChanged } = appSlice.actions;

export default appSlice.reducer;

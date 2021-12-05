import { fetchUser, fetchUserChannels } from './../user/userSlice';
import { authorize, AuthState } from './../auth/authSlice';
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

export const init = createAsyncThunk('app/init', async (_, { dispatch }) => {
  const authResponse = await dispatch(authorize()).unwrap();

  if (authResponse.data.id && !authResponse.errors.length) {
    return await Promise.all([
      dispatch(fetchUser(authResponse.data.id)),
      dispatch(fetchUserChannels()),
    ]);
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initChanged: (state, action) => {
      state.isInit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.error = null;
        state.isIniting = true;
      })
      .addCase(init.fulfilled, (state) => {
        state.isIniting = false;
        state.isInit = true;
      })
      .addCase(init.rejected, (state, action) => {
        state.isIniting = false;
        state.isInit = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { initChanged } = appSlice.actions;

export default appSlice.reducer;

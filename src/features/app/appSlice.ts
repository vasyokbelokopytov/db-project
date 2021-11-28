import { fetchUser, fetchUserChannels } from './../user/userSlice';
import { authorize } from './../auth/authSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AppState {
  isInit: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  isInit: false,
  isLoading: false,
  error: null,
};

export const init = createAsyncThunk('app/init', async (_, { dispatch }) => {
  const authResponse = await dispatch(authorize()).unwrap();

  if (authResponse.data.id && !authResponse.errors.length) {
    await Promise.all([
      dispatch(fetchUser(authResponse.data.id)).unwrap(),
      dispatch(fetchUserChannels()).unwrap(),
    ]);
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(init.fulfilled, (state) => {
        state.isLoading = false;
        state.isInit = true;
      });
  },
});

export default appSlice.reducer;

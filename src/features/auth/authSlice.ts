import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

export interface SignInData {
  login: string;
  password: string;
}

export interface AuthState {
  isAuth: boolean;
  id: number | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuth: true,
  id: null,
  isLoading: false,
};

export const signIn = createAsyncThunk(
  'auth/SIGNED_IN',
  async ({ login, password }: SignInData) => {
    const response = await authAPI.signIn({ login, password });
    return response;
  }
);

export const signOut = createAsyncThunk('auth/SIGNED_OUT', async () => {
  const response = await authAPI.signOut();
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.id = action.payload.id;
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.id = null;
      });
  },
});

export default authSlice.reducer;

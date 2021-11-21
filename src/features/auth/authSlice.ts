import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/types';
import { authAPI } from './authAPI';

export interface SignInData {
  login: string;
  password: string;
}

interface AuthState {
  id: number | null;
  isLoading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  id: null,
  isLoading: true,
  error: null,
};

export const authorize = createAsyncThunk('auth/AUTHORIZED', async () => {
  const response = await authAPI.authorize();
  return response;
});

export const signIn = createAsyncThunk(
  'auth/SIGNED_IN',
  async ({ login, password }: SignInData) => {
    const response = await authAPI.signIn({ login, password });
    return response;
  }
);

export const signUp = createAsyncThunk('auth/SIGNED_UP', async (user: User) => {
  const response = await authAPI.signUp(user);
  return response;
});

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
      .addCase(authorize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload.errors.length && action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(authorize.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      })

      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload.errors.length && action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      })

      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload.errors.length && action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      })

      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.id = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;

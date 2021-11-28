import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/types';
import { authAPI } from './authAPI';

export interface SignInData {
  login: string;
  password: string;
}

interface AuthState {
  id: number | null;
  isAuthorizing: boolean;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isSigningOut: boolean;

  error: null | string;
}

const initialState: AuthState = {
  id: null,
  isAuthorizing: false,
  isSigningIn: false,
  isSigningUp: false,
  isSigningOut: false,

  error: null,
};

export const authorize = createAsyncThunk('auth/authorized', async () => {
  const response = await authAPI.authorize();
  return response;
});

export const signIn = createAsyncThunk(
  'auth/signed_in',
  async ({ login, password }: SignInData) => {
    const response = await authAPI.signIn({ login, password });
    return response;
  }
);

export const signUp = createAsyncThunk('auth/signed_up', async (user: User) => {
  const response = await authAPI.signUp(user);
  return response;
});

export const signOut = createAsyncThunk('auth/signed_out', async () => {
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
        state.isAuthorizing = true;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.isAuthorizing = false;
        if (!action.payload.errors.length && action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(authorize.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isAuthorizing = false;
      })

      .addCase(signIn.pending, (state) => {
        state.isSigningIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isSigningIn = false;
        if (!action.payload.errors.length && action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isSigningIn = false;
      })

      .addCase(signUp.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSigningUp = false;
        if (!action.payload.errors.length && action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isSigningUp = false;
      })

      .addCase(signOut.pending, (state) => {
        state.isSigningOut = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isSigningOut = false;
        state.id = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isSigningOut = false;
      });
  },
});

export default authSlice.reducer;

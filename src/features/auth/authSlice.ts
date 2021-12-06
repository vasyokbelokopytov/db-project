import { AuthData } from './../../app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, Response } from '../../app/types';
import { authAPI } from './authAPI';
import { AxiosError } from 'axios';
import { userChanged, userChannelsChanged } from '../user/userSlice';

export interface SignInData {
  login: string;
  password: string;
}

export interface AuthState {
  id: number | null;

  isAuthorizing: boolean;
  authError: string | null;

  isSigningIn: boolean;
  signingInError: string | null;

  isSigningUp: boolean;
  signingUpError: string | null;

  isSigningOut: boolean;
  signingOutError: string | null;
}

const initialState: AuthState = {
  id: null,

  isAuthorizing: true,
  authError: null,

  isSigningIn: false,
  signingInError: null,

  isSigningUp: false,
  signingUpError: null,

  isSigningOut: false,
  signingOutError: null,
};

export const authorize = createAsyncThunk('auth/authorized', async () => {
  const response = await authAPI.authorize();

  return response.data;
});

export const signIn = createAsyncThunk<
  Response<AuthData>,
  SignInData,
  {
    rejectValue: string;
  }
>(
  'auth/signed_in',
  async ({ login, password }: SignInData, { rejectWithValue }) => {
    try {
      const response = await authAPI.signIn({ login, password });
      if (response.data.errors[0]) {
        return rejectWithValue(response.data.errors[0]);
      }

      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status === 401) {
        return rejectWithValue(error.response.data.errors[0]);
      }
      return rejectWithValue(
        error.response?.statusText ?? 'Some error occured'
      );
    }
  }
);

export const signUp = createAsyncThunk<
  Response<AuthData>,
  User,
  {
    rejectValue: string;
  }
>('auth/signed_up', async (user: User, { rejectWithValue }) => {
  try {
    const response = await authAPI.signUp(user);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const statuses = [400, 404, 409];

    if (error.response?.status && statuses.includes(error.response.status)) {
      return rejectWithValue(error.response.data.errors[0]);
    } else {
      return rejectWithValue(
        error.response?.statusText ?? 'Some error occured'
      );
    }
  }
});

export const signOut = createAsyncThunk(
  'auth/signed_out',
  async (_, { dispatch }) => {
    const response = await authAPI.signOut();
    if (!response.data.errors.length) {
      dispatch(userChanged(null));
      dispatch(userChannelsChanged([]));
    }
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signingInErrorChanged: (state, action) => {
      state.signingInError = action.payload;
    },
    signingUpErrorChanged: (state, action) => {
      state.signingUpError = action.payload;
    },

    signingOutErrorChanged: (state, action) => {
      state.signingOutError = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authorize.pending, (state) => {
        state.isAuthorizing = true;
        state.id = null;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.isAuthorizing = false;
        state.authError = null;
        if (!action.payload.errors.length && action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(authorize.rejected, (state, action) => {
        state.authError = action.error.message ?? null;
        state.isAuthorizing = false;
      })

      .addCase(signIn.pending, (state) => {
        state.isSigningIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isSigningIn = false;
        if (action.payload.data.id) {
          state.id = action.payload.data.id;
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signingInError = action.payload ?? null;
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
        state.signingUpError = action.payload ?? null;
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
        state.signingOutError = action.error.message ?? null;
        state.isSigningOut = false;
      });
  },
});

export const {
  signingInErrorChanged,
  signingUpErrorChanged,
  signingOutErrorChanged,
} = authSlice.actions;

export default authSlice.reducer;

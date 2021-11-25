import { userAPI } from './userAPI';
import { User, UserWithId, ChannelPreview } from './../../app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: UserWithId | null;
  channels: ChannelPreview[];
  isChannelsFetching: boolean;
  isLoading: boolean;
  error: null | string;
  isSettingsOpened: boolean;
}

const initialState: UserState = {
  user: null,
  channels: [],
  isChannelsFetching: false,
  isLoading: true,
  error: null,

  isSettingsOpened: false,
};

export const fetchUser = createAsyncThunk(
  'user/fetched',
  async (id: number) => {
    const response = await userAPI.get(id);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/updated',
  async (userData: Partial<User>) => {
    const response = await userAPI.update(userData);
    return response;
  }
);

export const fetchUserChannels = createAsyncThunk(
  'user/channels_fetched',
  async () => {
    const response = await userAPI.getChannels();
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSettings: (state) => {
      state.isSettingsOpened = !state.isSettingsOpened;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user = action.payload.data;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      })

      .addCase(fetchUserChannels.pending, (state) => {
        state.isChannelsFetching = true;
      })
      .addCase(fetchUserChannels.fulfilled, (state, action) => {
        state.isChannelsFetching = false;
        state.channels = [...state.channels, ...action.payload.data.items];
      })
      .addCase(fetchUserChannels.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isChannelsFetching = false;
      });
  },
});

export const { toggleSettings } = userSlice.actions;

export default userSlice.reducer;

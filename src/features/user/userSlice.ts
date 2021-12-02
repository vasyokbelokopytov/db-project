import { userAPI } from './userAPI';
import { User, UserWithId, ChannelPreview } from './../../app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: UserWithId | null;
  isUserFetching: boolean;
  isUserUpdating: boolean;

  channels: ChannelPreview[];
  isChannelsFetching: boolean;

  isSettingsOpened: boolean;

  error: null | string;
}

const initialState: UserState = {
  user: null,
  isUserFetching: true,
  isUserUpdating: false,

  channels: [],
  isChannelsFetching: false,

  isSettingsOpened: false,

  error: null,
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

    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isUserFetching = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isUserFetching = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isUserFetching = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isUserUpdating = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUserUpdating = false;
        if (state.user) {
          state.user = action.payload.data;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isUserUpdating = false;
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

export const { toggleSettings, addChannel } = userSlice.actions;

export default userSlice.reducer;

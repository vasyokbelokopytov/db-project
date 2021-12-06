import { AxiosError } from 'axios';
import { SettingsFormValues } from './../../components/Settings';
import { userAPI } from './userAPI';
import {
  User,
  ChannelPreview,
  WithId,
  WithPhoto,
  Response,
  ItemsResponse,
} from './../../app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: (User & WithId & WithPhoto) | null;
  isFetching: boolean;
  fetchingError: string | null;

  isUpdating: boolean;
  updateSucceed: boolean;
  updatingError: string | null;

  channels: ChannelPreview[];
  count: number;
  lastPortion: number;
  total: number | null;

  isChannelsFetching: boolean;
  channelsFetchingError: string | null;
}

const initialState: UserState = {
  user: null,
  isFetching: false,
  fetchingError: null,

  isUpdating: false,
  updateSucceed: false,
  updatingError: null,

  channels: [],
  count: 10,
  lastPortion: 0,
  total: null,
  isChannelsFetching: false,
  channelsFetchingError: null,
};

export const fetchUser = createAsyncThunk<
  Response<User & WithId & WithPhoto>,
  number,
  {
    rejectValue: string;
  }
>('user/fetched', async (id: number, { rejectWithValue }) => {
  try {
    const response = await userAPI.get(id);
    if (response.data.errors[0]) {
      return rejectWithValue(response.data.errors[0]);
    }

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response && error.response.status === 401) {
      return rejectWithValue(error.response.data.errors[0]);
    }
    return rejectWithValue(error.response?.statusText ?? 'Some error occured');
  }
});

export const updateUser = createAsyncThunk<
  User & WithPhoto & WithId,
  SettingsFormValues & WithPhoto,
  {
    rejectValue: string;
  }
>(
  'user/updated',
  async (
    userData: SettingsFormValues & WithPhoto,
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { user: UserState };

    try {
      const response = await userAPI.update(userData);
      if (response.data.errors[0]) {
        return rejectWithValue(response.data.errors[0]);
      }

      return {
        ...state.user.user,
        ...userData,
      } as User & WithPhoto & WithId;
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

export const fetchUserChannels = createAsyncThunk<
  ItemsResponse<ChannelPreview[]>,
  { portion: number; count: number },
  {
    rejectValue: string;
  }
>(
  'user/channels_fetched',
  async (
    { portion, count }: { portion: number; count: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await userAPI.getChannels(portion, count);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },

    userChanged: (state, action) => {
      state.user = action.payload;
    },

    userChannelsChanged: (state, action) => {
      state.channels = action.payload;
    },

    channelsFetchingErrorChanged: (state, action) => {
      state.channelsFetchingError = action.payload;
    },

    updateSucceedChanged: (state, action) => {
      state.updateSucceed = action.payload;
    },

    updatingErrorChanged: (state, action) => {
      state.updatingError = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchingError = action.payload ?? null;
        state.isFetching = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateSucceed = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updatingError = action.payload ?? null;
        state.isUpdating = false;
      })

      .addCase(fetchUserChannels.pending, (state) => {
        state.isChannelsFetching = true;
      })
      .addCase(fetchUserChannels.fulfilled, (state, action) => {
        state.isChannelsFetching = false;
        state.channels = [...state.channels, ...action.payload.data.items];
        state.lastPortion += 1;

        state.total = action.payload.data.total;
      })
      .addCase(fetchUserChannels.rejected, (state, action) => {
        state.channelsFetchingError = action.payload ?? null;
        state.isChannelsFetching = false;
      });
  },
});

export const {
  addChannel,
  userChanged,
  userChannelsChanged,
  updateSucceedChanged,
  updatingErrorChanged,
  channelsFetchingErrorChanged,
} = userSlice.actions;

export default userSlice.reducer;

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
  channelsCount: number;
  channelsLastPortion: number;
  channelsTotal: number | null;

  contacts: (User & WithId & WithPhoto)[];
  contactsCount: number;
  contactsLastPortion: number;
  contactsTotal: number | null;

  isChannelsFetching: boolean;
  channelsFetchingError: string | null;

  isContactsFetching: boolean;
  contactsFetchingError: string | null;
}

const initialState: UserState = {
  user: null,
  isFetching: false,
  fetchingError: null,

  isUpdating: false,
  updateSucceed: false,
  updatingError: null,

  channels: [],
  channelsCount: 10,
  channelsLastPortion: 0,
  channelsTotal: null,

  contacts: [],
  contactsCount: 5,
  contactsLastPortion: 0,
  contactsTotal: null,

  isChannelsFetching: false,
  channelsFetchingError: null,

  isContactsFetching: false,
  contactsFetchingError: null,
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

export const fetchUserContacts = createAsyncThunk<
  ItemsResponse<(User & WithId & WithPhoto)[]>,
  { portion: number; count: number },
  {
    rejectValue: string;
  }
>('user/contacts_fetched', async ({ portion, count }, { rejectWithValue }) => {
  try {
    const response = await userAPI.getContacts(portion, count);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },

    addUserContact: (state, action) => {
      state.contacts.push(action.payload);
    },

    removeUserContact: (state, action) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
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
        state.channelsLastPortion += 1;

        state.channelsTotal = action.payload.data.total;
      })
      .addCase(fetchUserChannels.rejected, (state, action) => {
        state.channelsFetchingError = action.payload ?? null;
        state.isChannelsFetching = false;
      })

      .addCase(fetchUserContacts.pending, (state) => {
        state.isContactsFetching = true;
      })
      .addCase(fetchUserContacts.fulfilled, (state, action) => {
        state.isContactsFetching = false;
        state.contacts = [...state.contacts, ...action.payload.data.items];
        state.contactsLastPortion += 1;

        state.contactsTotal = action.payload.data.total;
      })
      .addCase(fetchUserContacts.rejected, (state, action) => {
        state.contactsFetchingError = action.payload ?? null;
        state.isContactsFetching = false;
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
  addUserContact,
  removeUserContact,
} = userSlice.actions;

export default userSlice.reducer;

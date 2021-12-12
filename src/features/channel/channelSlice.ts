import {
  Channel,
  ChannelCreatedData,
  ItemsResponse,
  Post,
  Response,
  WithId,
  WithPhoto,
} from './../../app/types';
import { channelAPI } from './channelAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addChannel } from '../user/userSlice';
import { AxiosError } from 'axios';

export interface ChannelState {
  channel: (Channel & WithId & WithPhoto) | null;

  posts: (Post & WithId)[] | null;
  totalPosts: number | null;
  count: number;
  lastPortion: number;
  isPostFetching: boolean;
  postFetchingError: string | null;

  isCreatorOpened: boolean;
  isCreating: boolean;
  creationError: null | string;
  createdSucceed: boolean;

  isEditorOpened: boolean;
  isEditing: boolean;
  editingError: null | string;
  editedSucceed: boolean;

  isFetching: boolean;
  fetchingError: string | null;
}

const initialState: ChannelState = {
  channel: null,

  posts: null,
  totalPosts: null,
  count: 10,
  lastPortion: 0,
  isPostFetching: false,
  postFetchingError: null,

  isCreatorOpened: false,
  isCreating: false,
  creationError: null,
  createdSucceed: false,

  isEditorOpened: false,
  isEditing: false,
  editingError: null,
  editedSucceed: false,

  isFetching: false,
  fetchingError: null,
};

export const fetchChannel = createAsyncThunk<
  Response<Channel & WithId & WithPhoto>,
  number,
  { rejectValue: string }
>(
  'channel/fetched',
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as { channel: ChannelState };
    try {
      const response = await channelAPI.get(id);
      if (response.data.errors[0]) {
        return rejectWithValue(response.data.errors[0]);
      }

      dispatch(
        fetchPosts({
          id,
          page: state.channel.lastPortion + 1,
          count: state.channel.count,
        })
      );

      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status === 404) {
        return rejectWithValue(error.response.data.errors[0]);
      }
      return rejectWithValue(
        error.response?.statusText ?? 'Some error occured'
      );
    }
  }
);

export const createChannel = createAsyncThunk<
  Response<ChannelCreatedData>,
  Channel & WithPhoto,
  { rejectValue: string }
>(
  'channel/created',
  async (channel: Channel & WithPhoto, { dispatch, rejectWithValue }) => {
    try {
      const response = await channelAPI.create(channel);

      if (response.data.errors[0]) {
        return rejectWithValue(response.data.errors[0]);
      }

      if (response.data.data.id) {
        dispatch(
          addChannel({
            id: response.data.data.id,
            ...channel,
          })
        );
        dispatch(creatorClosed());
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

export const editChannel = createAsyncThunk<
  Channel & WithId & WithPhoto,
  Channel & WithId & WithPhoto,
  { rejectValue: string }
>(
  'channel/edited',
  async (
    channel: Channel & WithId & WithPhoto,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await channelAPI.update(channel);

      if (response.data.errors[0]) {
        return rejectWithValue(response.data.errors[0]);
      }
      dispatch(editorClosed());

      return channel;
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

export const fetchPosts = createAsyncThunk<
  ItemsResponse<(Post & WithId)[]>,
  {
    id: number;
    page: number;
    count: number;
  },
  { rejectValue: string }
>('channel/postsFetched', async ({ id, page, count }, { rejectWithValue }) => {
  try {
    const response = await channelAPI.getPosts({ id, page, count });

    if (response.data.errors[0]) {
      return rejectWithValue(response.data.errors[0]);
    }

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    return rejectWithValue(error.response?.statusText ?? 'Some error occured');
  }
});

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    creatorOpened: (state) => {
      state.isCreatorOpened = true;
    },

    creatorClosed: (state) => {
      state.isCreatorOpened = false;
    },

    editorOpened: (state) => {
      state.isEditorOpened = true;
    },

    editorClosed: (state) => {
      state.isEditorOpened = false;
    },

    creationErrorChanged: (state, action) => {
      state.creationError = action.payload;
    },

    createdSucceedChanged: (state, action) => {
      state.createdSucceed = action.payload;
    },

    editedSucceedChanged: (state, action) => {
      state.editedSucceed = action.payload;
    },

    editingErrorChanged: (state, action) => {
      state.editingError = action.payload;
    },

    postsChanged: (state, action) => {
      state.posts = action.payload;
    },

    totalPostsChanged: (state, action) => {
      state.totalPosts = action.payload;
    },

    lastPortionChanged: (state, action) => {
      state.lastPortion = action.payload;
    },

    postAdded: (state, action) => {
      if (state.posts) {
        state.posts.push(action.payload);
      } else {
        state.posts = [action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannel.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.isFetching = false;
        state.channel = action.payload.data;
        state.fetchingError = null;
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.channel = null;
        state.isFetching = false;
        state.fetchingError = action.payload ?? null;
      })

      .addCase(createChannel.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createChannel.fulfilled, (state) => {
        state.isCreating = false;
        state.createdSucceed = true;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.isCreating = false;
        state.creationError = action.payload ?? null;
      })

      .addCase(editChannel.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        state.isEditing = false;
        state.channel = action.payload;
      })
      .addCase(editChannel.rejected, (state, action) => {
        state.isEditing = false;
        state.editingError = action.payload ?? null;
      })

      .addCase(fetchPosts.pending, (state) => {
        state.isPostFetching = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isPostFetching = false;
        if (!state.posts) {
          state.posts = action.payload.data.items;
        } else {
          state.posts = [...state.posts, ...action.payload.data.items];
        }
        state.lastPortion += 1;
        state.totalPosts = action.payload.data.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isPostFetching = false;
        state.editingError = action.payload ?? null;
      });
  },
});

export const {
  creatorOpened,
  creatorClosed,
  editorOpened,
  editorClosed,
  creationErrorChanged,
  createdSucceedChanged,
  editedSucceedChanged,
  postsChanged,
  postAdded,
  lastPortionChanged,
  totalPostsChanged,
  editingErrorChanged,
} = channelSlice.actions;

export default channelSlice.reducer;

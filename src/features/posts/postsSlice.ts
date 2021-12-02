import { PostWithId } from './../../app/types';
import { UserState } from './../user/userSlice';
import { postsAPI } from './postsAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../app/types';
import { ChannelState } from '../channel/channelSlice';

export interface PostsState {
  posts: PostWithId[] | null;
  total: number | null;

  isFetching: boolean;
  isSending: boolean;
  sendingError: string | null;

  fetchingError: string | null;
}

const initialState: PostsState = {
  posts: null,
  total: null,

  isSending: false,
  sendingError: null,

  isFetching: false,
  fetchingError: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/postsFetched',
  async (channelId: number) => {
    const response = await postsAPI.get(channelId);
    return response;
  }
);

export const sendPost = createAsyncThunk(
  'posts/postSended',
  async (text: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { channel: ChannelState; user: UserState };
    const channelId = state.channel.channel?.id;
    const authorId = state.user.user?.id;

    if (channelId && authorId) {
      const response = await postsAPI.create(
        {
          text,
          authorId,
        },
        channelId
      );

      dispatch(postAdded(response.data));
      return response;
    }

    rejectWithValue('There is no channel id provided');
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    postAdded: (state, action) => {
      if (state.posts) {
        state.posts.push(action.payload);
      } else {
        state.posts = [action.payload];
      }
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isFetching = false;
        state.posts = action.payload.data.items;
        state.total = action.payload.data.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchingError = action.error.message ?? null;
      })

      .addCase(sendPost.pending, (state) => {
        state.isSending = true;
        state.sendingError = null;
      })
      .addCase(sendPost.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendPost.rejected, (state, action) => {
        state.isSending = false;
        state.sendingError = action.error.message ?? null;
      }),
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;

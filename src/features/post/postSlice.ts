import { PostCreatedData, Response } from './../../app/types';
import { AxiosError } from 'axios';
import { WithId } from '../../app/types';
import { postAPI } from './postAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../app/types';
import { ChannelState, postAdded } from '../channel/channelSlice';
import { UserState } from '../user/userSlice';

export interface PostState {
  post: (Post & WithId) | null;

  isSending: boolean;
  sendingError: string | null;
}

const initialState: PostState = {
  post: null,

  isSending: false,
  sendingError: null,
};

export const sendPost = createAsyncThunk<Response<PostCreatedData>, string>(
  'post/sended',
  async (text: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { channel: ChannelState; user: UserState };
    const channelId = state.channel.channel?.id;
    const user = state.user.user;

    try {
      if (channelId) {
        const post = {
          text,
          channelId,
        };
        const response = await postAPI.create(post);

        dispatch(
          postAdded({ id: response.data.data.id, ...post, author: user })
        );
        return response.data;
      }

      return rejectWithValue('There is no channel id provided');
    } catch (e) {
      const error = e as AxiosError;

      const statuses = [401, 404];

      if (error.response?.status && statuses.includes(error.response.status)) {
        return rejectWithValue(error.response.data.errors[0]);
      } else {
        return rejectWithValue(
          error.response?.statusText ?? 'Some error occured'
        );
      }
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
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

export default postSlice.reducer;

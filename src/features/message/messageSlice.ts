import { AxiosError } from 'axios';
import { AuthState } from './../auth/authSlice';
import { messageAPI } from './messageAPI';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DirectState, messageAdded } from '../direct/directSlice';
import { MessageCreatedData, Message, Response } from './../../app/types';
export interface MessageState {
  message: Message | null;

  isSending: boolean;
  sendingError: string | null;
}

const initialState: MessageState = {
  message: null,

  isSending: false,
  sendingError: null,
};

export const sendMessage = createAsyncThunk<
  Response<MessageCreatedData>,
  string
>(
  'message/sended',
  async (text: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { direct: DirectState; auth: AuthState };
    const contactId = state.direct.contact?.id;
    const authId = state.auth.id;

    try {
      if (contactId && authId) {
        const response = await messageAPI.create({
          receiverId: contactId,
          authorId: authId,
          text,
        });

        dispatch(
          messageAdded({
            id: response.data.data.id,
            text,
            authorId: authId,
            receiverId: contactId,
          })
        );
        return response.data;
      }

      return rejectWithValue('There is no user id provided');
    } catch (e) {
      const error = e as AxiosError;

      const statuses = [401];

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

const messageSlice = createSlice({
  name: 'message',
  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isSending = true;
        state.sendingError = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSending = false;
        state.sendingError = action.error.message ?? null;
      }),
});

export default messageSlice.reducer;

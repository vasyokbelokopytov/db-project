import { directAPI } from './../direct/directAPI';
import { Message, Response, User, WithId, WithPhoto } from './../../app/types';
import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ItemsResponse } from '../../app/types';
import { userAPI } from '../user/userAPI';

export interface DirectState {
  contact: (User & WithId & WithPhoto) | null;
  messages: (Message & WithId)[];
  total: number | null;
  lastPortion: number;
  count: number;

  isMessagesFetching: boolean;
  messagesFetchingError: string | null;

  isContactFetching: boolean;
  contactFetchingError: null | string;
}

const initialState: DirectState = {
  contact: null,
  messages: [],
  total: null,
  lastPortion: 0,
  count: 7,

  isMessagesFetching: false,
  messagesFetchingError: null,

  isContactFetching: false,
  contactFetchingError: null,
};

export const fetchContact = createAsyncThunk<
  Response<User & WithId & WithPhoto>,
  number,
  { rejectValue: string }
>(
  'direct/contactFetched',
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as { direct: DirectState };
    try {
      const response = await userAPI.get(id);
      if (response.data.errors[0]) {
        return rejectWithValue(response.data.errors[0]);
      }

      dispatch(
        fetchMessages({
          id,
          page: state.direct.lastPortion + 1,
          count: state.direct.count,
        })
      );

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

export const fetchMessages = createAsyncThunk<
  ItemsResponse<(Message & WithId)[]>,
  {
    id: number;
    page: number;
    count: number;
  },
  { rejectValue: string }
>(
  'direct/messagesFetched',
  async ({ id, page, count }, { rejectWithValue }) => {
    try {
      const response = await directAPI.getMessages({ id, page, count });

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

const directSlice = createSlice({
  name: 'direct',
  initialState,
  reducers: {
    messageAdded: (state, action) => {
      if (state.messages) {
        state.messages.push(action.payload);
      } else {
        state.messages = [action.payload];
      }
    },

    messagesChanged: (state, action) => {
      state.messages = action.payload;
    },

    messageslastPortionChanged: (state, action) => {
      state.lastPortion = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContact.pending, (state) => {
        state.isContactFetching = true;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.isContactFetching = false;
        state.contact = action.payload.data;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.isContactFetching = false;
        state.contactFetchingError = action.payload ?? null;
      })

      .addCase(fetchMessages.pending, (state) => {
        state.isMessagesFetching = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isMessagesFetching = false;
        if (state.messages) {
          state.messages = [...action.payload.data.items, ...state.messages];
        } else {
          state.messages = action.payload.data.items;
        }

        state.lastPortion = state.lastPortion + 1;
        state.total = action.payload.data.total;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isMessagesFetching = false;
        state.messagesFetchingError = action.payload ?? null;
      }),
});

export const { messageAdded, messagesChanged, messageslastPortionChanged } =
  directSlice.actions;

export default directSlice.reducer;

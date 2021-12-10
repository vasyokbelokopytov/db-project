import { directAPI } from './../direct/directAPI';
import { WithId } from './../../app/types';
import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Direct, ItemsResponse } from '../../app/types';
import { Message } from '../../app/types';

export interface DirectState {
  direct: Direct | null;
  messages: (Message & WithId)[];
  total: number | null;
  lastPortion: number;
  count: number;

  isMessagesFetching: boolean;
  messagesFetchingError: string | null;

  isDirectFetching: boolean;
  directFetchingError: string | null;
}

const initialState: DirectState = {
  direct: null,
  messages: [],
  total: null,
  lastPortion: 0,
  count: 10,

  isMessagesFetching: false,
  messagesFetchingError: null,

  isDirectFetching: false,
  directFetchingError: null,
};

export const fetchDirect = createAsyncThunk<
  Direct,
  number,
  { rejectValue: string }
>(
  'direct/fetched',
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as { direct: DirectState };
    try {
      const response = await directAPI.get(id);
      if (response.errors[0]) {
        return rejectWithValue(response.errors[0]);
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
      if (error.response && error.response.status === 404) {
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

      if (response.errors[0]) {
        return rejectWithValue(response.errors[0]);
      }

      return response;
    } catch (e) {
      const error = e as AxiosError;

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
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchDirect.pending, (state) => {
        state.isDirectFetching = true;
      })
      .addCase(fetchDirect.fulfilled, (state, action) => {
        state.isDirectFetching = false;
        state.direct = action.payload;
      })
      .addCase(fetchDirect.rejected, (state, action) => {
        state.isDirectFetching = false;
        state.directFetchingError = action.error.message ?? null;
      })

      .addCase(fetchMessages.pending, (state) => {
        state.isMessagesFetching = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isMessagesFetching = false;
        state.messages = action.payload.data.items;
        state.total = action.payload.data.total;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isMessagesFetching = false;
        state.messagesFetchingError = action.error.message ?? null;
      }),
});

export const { messageAdded, messagesChanged } = directSlice.actions;

export default directSlice.reducer;

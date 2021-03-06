import { AxiosError } from 'axios';
import { searchAPI } from './searchAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WithPhoto, WithId, User, ItemsResponse } from './../../app/types';

export interface SearchState {
  users: (User & WithPhoto & WithId)[];
  isUsersFetching: boolean;
  fetchingError: string | null;
  query: string;
  page: number;
  count: number;
  total: number | null;
  contact: '0' | '1' | '2';
}

const initialState: SearchState = {
  users: [],
  isUsersFetching: false,
  fetchingError: null,
  query: '',
  page: 1,
  count: 10,
  total: null,
  contact: '0',
};

export const fetchUsers = createAsyncThunk<
  ItemsResponse<(User & WithPhoto & WithId)[]>,
  {
    page: number;
    count: number;
    contact: '0' | '1' | '2';
    query: string;
  },
  { rejectValue: string }
>('search/usersFetched', async (searchData, { rejectWithValue }) => {
  try {
    const response = await searchAPI.get(searchData);
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

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    userChanged: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }

        return user;
      });
    },
    queryChanged: (state, action) => {
      state.query = action.payload;
    },
    pageChanged: (state, action) => {
      state.page = action.payload;
    },
    contactChanged: (state, action) => {
      state.contact = action.payload;
    },
    countChanged: (state, action) => {
      state.count = action.payload;
    },

    fetchingErrorChanged: (state, action) => {
      state.fetchingError = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isUsersFetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isUsersFetching = false;
        state.users = action.payload.data.items;
        state.total = action.payload.data.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isUsersFetching = false;
        state.fetchingError = action.payload ?? null;
      }),
});

export const {
  contactChanged,
  countChanged,
  pageChanged,
  queryChanged,
  userChanged,
  fetchingErrorChanged,
} = searchSlice.actions;

export default searchSlice.reducer;

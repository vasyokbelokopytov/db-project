import { searchAPI } from './searchAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WithPhoto, WithId, User } from './../../app/types';

export interface SearchState {
  users: (User & WithPhoto & WithId)[];
  isUsersFetching: boolean;
  fetchingError: string | null;
  page: number;
  count: number;
  total: number | null;
  contact: boolean;
}

const initialState: SearchState = {
  users: [],
  isUsersFetching: false,
  fetchingError: null,
  page: 1,
  count: 10,
  total: null,
  contact: false,
};

const fetchUsers = createAsyncThunk(
  'search/usersFetched',
  async ({
    page,
    count,
    contact,
  }: {
    page: number;
    count: number;
    contact: boolean;
  }) => {
    const response = await searchAPI.get(page, count, contact);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    pageChanged: (state, action) => {
      state.page = action.payload;
    },
    contactChanged: (state, action) => {
      state.contact = action.payload;
    },
    countChanged: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isUsersFetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isUsersFetching = false;
        state.users = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isUsersFetching = false;
        state.fetchingError = action.error.message ?? null;
      }),
});

export const { contactChanged, countChanged, pageChanged } =
  searchSlice.actions;

export default searchSlice.reducer;

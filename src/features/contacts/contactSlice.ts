import { contactAPI } from './contactAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WithId, WithPhoto } from './../../app/types';
import { User } from '../../app/types';

export interface ContactState {
  contacts: (User & WithId & WithPhoto)[];

  isContactChecking: boolean;
  checkingError: string | null;

  isContactAdding: boolean;
  addingError: string | null;

  isContactRemoving: boolean;
  removingError: string | null;

  isContactsFetching: boolean;
  fetchingError: string | null;
}

const initialState: ContactState = {
  contacts: [],

  isContactChecking: false,
  checkingError: null,

  isContactAdding: false,
  addingError: null,

  isContactRemoving: false,
  removingError: null,

  isContactsFetching: false,
  fetchingError: null,
};

export const checkIsContact = createAsyncThunk(
  'contact/checked',
  async (id: number) => {
    const response = await contactAPI.check(id);
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contact/added',
  async (id: number) => {
    const response = await contactAPI.add(id);
    return response.data;
  }
);

export const removeContact = createAsyncThunk(
  'contact/removed',
  async (id: number) => {
    const response = await contactAPI.remove(id);
    return response.data;
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addContact.pending, (state) => {
        state.isContactAdding = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isContactAdding = false;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isContactAdding = false;
        state.addingError = action.error.message ?? null;
      }),
});

export const {} = contactSlice.actions;

export default contactSlice.reducer;

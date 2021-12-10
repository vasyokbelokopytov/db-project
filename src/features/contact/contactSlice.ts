import { AxiosError } from 'axios';
import { SearchState } from '../search/searchSlice';
import { contactAPI } from './contactAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WithId, WithPhoto } from '../../app/types';
import { User } from '../../app/types';
import { userChanged } from '../search/searchSlice';

export interface ContactState {
  contacts: (User & WithId & WithPhoto)[];

  contactsInProcess: number[];
  addingError: string | null;
  removingError: string | null;

  isContactsFetching: boolean;
  fetchingError: string | null;
}

const initialState: ContactState = {
  contacts: [],

  contactsInProcess: [],
  addingError: null,
  removingError: null,

  isContactsFetching: false,
  fetchingError: null,
};

export const addContact = createAsyncThunk<User & WithId & WithPhoto, number>(
  'contact/added',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { search: SearchState };
    try {
      const response = await contactAPI.add(id);

      if (response.errors.length) {
        return rejectWithValue(response.errors[0]);
      }

      const user = state.search.users.find((user) => user.id === id);

      if (user) {
        const newUser: User & WithId & WithPhoto = {
          ...user,
          contact: true,
        };

        dispatch(userChanged(newUser));

        return newUser;
      }

      return rejectWithValue('User not found');
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.statusText) {
        return rejectWithValue(error.response.statusText);
      }

      return rejectWithValue('Some error occured');
    }
  }
);

export const removeContact = createAsyncThunk<
  User & WithId & WithPhoto,
  number
>(
  'contact/removed',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { search: SearchState };
    try {
      const response = await contactAPI.remove(id);

      if (response.errors.length) {
        return rejectWithValue(response.errors[0]);
      }

      const user = state.search.users.find((user) => user.id === id);

      if (user) {
        const newUser: User & WithId & WithPhoto = {
          ...user,
          contact: false,
        };

        dispatch(userChanged(newUser));

        return newUser;
      }

      return rejectWithValue('User not found');
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.statusText) {
        return rejectWithValue(error.response.statusText);
      }

      return rejectWithValue('Some error occured');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(addContact.pending, (state, action) => {
        state.contactsInProcess.push(action.meta.arg);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contactsInProcess = state.contactsInProcess.filter(
          (id) => id !== action.meta.arg
        );
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contactsInProcess = state.contactsInProcess.filter(
          (id) => id !== action.meta.arg
        );
        state.addingError = action.error.message ?? null;
      })

      .addCase(removeContact.pending, (state, action) => {
        state.contactsInProcess.push(action.meta.arg);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contactsInProcess = state.contactsInProcess.filter(
          (id) => id !== action.meta.arg
        );
        state.contacts = state.contacts.filter((c) => c.id !== action.meta.arg);
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.contactsInProcess = state.contactsInProcess.filter(
          (id) => id !== action.meta.arg
        );
        state.removingError = action.error.message ?? null;
      }),
});

export const {} = contactSlice.actions;

export default contactSlice.reducer;

import { AxiosError } from 'axios';
import { SearchState } from '../search/searchSlice';
import { contactAPI } from './contactAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WithId, WithPhoto } from '../../app/types';
import { User } from '../../app/types';
import { userChanged } from '../search/searchSlice';
import { addUserContact, removeUserContact } from '../user/userSlice';

export interface ContactState {
  contactsInProcess: number[];
  addingError: string | null;
  removingError: string | null;
}

const initialState: ContactState = {
  contactsInProcess: [],
  addingError: null,
  removingError: null,
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
          isContact: true,
        };

        dispatch(userChanged(newUser));
        dispatch(addUserContact(newUser));

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
          isContact: false,
        };
        dispatch(removeUserContact(user.id));
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
  reducers: {
    addingErrorChanged: (state, action) => {
      state.addingError = action.payload;
    },

    removingErrorChanged: (state, action) => {
      state.removingError = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(addContact.pending, (state, action) => {
        state.contactsInProcess.push(action.meta.arg);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contactsInProcess = state.contactsInProcess.filter(
          (id) => id !== action.meta.arg
        );
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
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.contactsInProcess = state.contactsInProcess.filter(
          (id) => id !== action.meta.arg
        );
        state.removingError = action.error.message ?? null;
      }),
});

export const { addingErrorChanged, removingErrorChanged } =
  contactSlice.actions;

export default contactSlice.reducer;

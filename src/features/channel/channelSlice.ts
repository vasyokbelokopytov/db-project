import { ChannelWithId, Channel } from './../../app/types';
import { channelAPI } from './channelAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addChannel } from '../user/userSlice';

export interface ChannelState {
  channel: ChannelWithId | null;

  isCreatorOpened: boolean;
  isCreating: boolean;

  isEditorOpened: boolean;
  isEditing: boolean;

  isFetching: boolean;
  error: string | null;
}

const initialState: ChannelState = {
  channel: null,

  isCreatorOpened: false,
  isCreating: false,

  isEditorOpened: false,
  isEditing: false,

  isFetching: false,
  error: null,
};

export const fetchChannel = createAsyncThunk(
  'channel/fetched',
  async (id: number) => {
    const response = await channelAPI.get(id);
    return response;
  }
);

export const createChannel = createAsyncThunk(
  'channel/created',
  async (channel: Channel, { dispatch }) => {
    const response = await channelAPI.create(channel);
    dispatch(addChannel(response.data));
    dispatch(creatorClosed());
    return response;
  }
);

export const editChannel = createAsyncThunk(
  'channel/edited',
  async (channel: ChannelWithId, { dispatch }) => {
    const response = await channelAPI.update(channel);
    dispatch(editorClosed());
    return response;
  }
);

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    creatorOpened: (state) => {
      state.isCreatorOpened = true;
    },

    creatorClosed: (state) => {
      state.isCreatorOpened = false;
    },

    editorOpened: (state) => {
      state.isEditorOpened = true;
    },

    editorClosed: (state) => {
      state.isEditorOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannel.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.isFetching = false;
        state.channel = action.payload.data;
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message ?? null;
      })

      .addCase(createChannel.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createChannel.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message ?? null;
      })

      .addCase(editChannel.pending, (state, action) => {
        state.isEditing = true;
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        state.isEditing = false;
        state.channel = action.payload.data;
      })
      .addCase(editChannel.rejected, (state, action) => {
        state.isEditing = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { creatorOpened, creatorClosed, editorOpened, editorClosed } =
  channelSlice.actions;

export default channelSlice.reducer;

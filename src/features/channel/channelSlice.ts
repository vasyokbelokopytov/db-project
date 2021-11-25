import { createSlice } from '@reduxjs/toolkit';
import { Channel } from '../../app/types';

export interface ChannelState {
  channel: Channel | null;
}

const initialState: ChannelState = {
  channel: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
});

export default channelSlice.reducer;

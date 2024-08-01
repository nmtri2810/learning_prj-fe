import chatRoomAPI from '@/apis/chatRoom';
import { IChatRoom } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getChatRoom = createAsyncThunk(
  'chatRoom/getChatRoom',
  async (id: string) => {
    const res = await chatRoomAPI.get(id);
    return res.data;
  },
);

interface IChatRoomState {
  one: IChatRoom | null;
  oneLoading: boolean;
}

const initialState: IChatRoomState = {
  one: null,
  oneLoading: false,
};

export const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatRoom.pending, (state) => {
        state.oneLoading = true;
      })
      .addCase(getChatRoom.fulfilled, (state, action) => {
        state.one = action.payload;
        state.oneLoading = false;
      })
      .addCase(getChatRoom.rejected, (state) => {
        state.oneLoading = false;
      });
  },
});

export const {} = chatRoomSlice.actions;
export const chatRoomReducer = chatRoomSlice.reducer;

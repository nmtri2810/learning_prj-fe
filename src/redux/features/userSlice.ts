import userAPI from '@/app/apis/user';
import { IUser } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getList = createAsyncThunk('users', async () => {
  const res = await userAPI.getList();
  return res.data;
});

interface IUserState {
  list: IUser[];
  listLoading: boolean;
}

const initialState: IUserState = {
  list: [],
  listLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.listLoading = false;
      })
      .addCase(getList.rejected, (state) => {
        state.listLoading = false;
      });
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;

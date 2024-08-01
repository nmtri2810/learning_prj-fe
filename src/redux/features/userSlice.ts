import userAPI from '@/apis/user';
import { IUser } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getList = createAsyncThunk('users/getList', async () => {
  const res = await userAPI.getList();
  return res.data;
});

export const getUser = createAsyncThunk('users/getUser', async (id: string) => {
  const res = await userAPI.get(id);
  return res.data;
});

interface IUserState {
  list: IUser[];
  listLoading: boolean;
  one: IUser | null;
  oneLoading: boolean;
}

const initialState: IUserState = {
  list: [],
  listLoading: false,
  one: null,
  oneLoading: false,
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

    builder
      .addCase(getUser.pending, (state) => {
        state.oneLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.one = action.payload;
        state.oneLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.oneLoading = false;
      });
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;

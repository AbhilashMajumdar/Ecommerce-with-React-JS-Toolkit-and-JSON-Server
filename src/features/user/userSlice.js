import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserInfoById, updateUserInfo } from "./userAPI";

const initialState = {
  userInfo: null,
  status: "idle",
};

export const fetchUserInfoByIdAsync = createAsyncThunk(
  "user/fetchUserInfoById",
  async (userId) => {
    const response = await fetchUserInfoById(userId);
    return response.data;
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "user/updateUserInfo",
  async (userData) => {
    const response = await updateUserInfo(userData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfoByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

// export const {} = userSlice.actions;

export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;

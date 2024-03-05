import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logOutUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (userData) => {
    const response = await checkUser(userData);
    return response.data;
  }
);

export const logOutUserAsync = createAsyncThunk(
  "auth/logOutUser",
  async (userData) => {
    const response = await logOutUser(userData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(logOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
  },
});

export const { removeError } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;

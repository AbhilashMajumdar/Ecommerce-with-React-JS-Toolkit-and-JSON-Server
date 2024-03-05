import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartByUserId,
  removeCart,
  resetCart,
  updateCart,
} from "./cartAPI";

const initialState = {
  cartItems: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (data) => {
    const response = await addToCart(data);
    return response.data;
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (id) => {
    const response = await fetchCartByUserId(id);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (item) => {
    const response = await updateCart(item);
    return response.data;
  }
);

export const removeCartAsync = createAsyncThunk(
  "cart/removeCart",
  async (id) => {
    const response = await removeCart(id);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (id) => {
    const response = await resetCart(id);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(removeCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = [];
      });
  },
});

// export const { } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;

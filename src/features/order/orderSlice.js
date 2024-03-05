import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  deleteOrder,
  fetchAllOrders,
  fetchOrdersByUserId,
  updateOrder,
} from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (item) => {
    const response = await createOrder(item);
    return response.data;
  }
);

export const fetchOrdersByUserIdAsync = createAsyncThunk(
  "order/fetchOrdersByUserId",
  async (userId) => {
    const response = await fetchOrdersByUserId(userId);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({pagination, sort}) => {
    const response = await fetchAllOrders(pagination, sort);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const deleteOrderAsync = createAsyncThunk(
  "order/deleteOrder",
  async (id) => {
    const response = await deleteOrder(id);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrdersByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = state.orders.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;

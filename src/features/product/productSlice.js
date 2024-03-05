import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllBrands,
  fetchAllCategories,
  fetchFilterProducts,
  fetchProductById,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  selectedProduct: null,
  categories: [],
  brands: [],
  totalProducts: null,
  status: "idle",
};

export const fetchFilterProductsAsync = createAsyncThunk(
  "product/fetchFilterProducts",
  async ({ filter, sort, pagination }) => {
    const response = await fetchFilterProducts(filter, sort, pagination);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (item) => {
    const response = await createProduct(item);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (item) => {
    const response = await updateProduct(item);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilterProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = state.products.map((item)=> item.id === action.payload.id ? action.payload : item);
      });
  },
});

// export const {} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.selectedProduct;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectTotalProducts = (state) => state.product.totalProducts;
export const selectStatus = (state) => state.product.status;

export default productSlice.reducer;

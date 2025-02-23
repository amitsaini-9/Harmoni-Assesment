// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/constants";
import { toast } from "react-hot-toast";

// Base URL constant
const BASE_URL = "https://fakestoreapi.com";

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    } catch (error) {
      toast.error("Failed to fetch products. Please try again later.");
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      if (!category) {
        throw new Error("Category is required");
      }

      const response = await fetch(
        `${BASE_URL}/products/category/${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products for this category");
      }

      return response.json();
    } catch (error) {
      toast.error("Failed to fetch category products. Please try again later.");
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: STATUS.IDLE,
    error: null,
    selectedCategory: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedCategory = (state) =>
  state.products.selectedCategory;
export const selectIsLoading = (state) =>
  state.products.status === STATUS.LOADING;

// Actions
export const { clearError, setSelectedCategory } = productSlice.actions;

export default productSlice.reducer;

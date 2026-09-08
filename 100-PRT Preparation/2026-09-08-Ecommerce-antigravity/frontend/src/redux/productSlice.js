import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/products');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/products/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch product details');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;

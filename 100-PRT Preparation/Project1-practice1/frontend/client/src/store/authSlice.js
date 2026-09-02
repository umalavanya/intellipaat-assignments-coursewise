import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: storedUser || null,
  loading: false,
  error: null,
  success: false,
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/register', userData);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/login', userData);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

// Handle all auth actions
const handleAuth = (state, action) => {
  state.loading = false;
  state.success = true;
  state.user = action.payload;
  state.error = null;
};

const handleError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.user = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, handleAuth)
      .addCase(register.rejected, handleError)
      
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, handleAuth)
      .addCase(login.rejected, handleError)
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.success = false;
        state.error = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  status: 'idle',
  error: null,
  token: localStorage.getItem('token') || null,
  tokenExpiresAt:null,
};

// Async thunk for registration
export const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5100/api/auth/register`, adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (adminData, { rejectWithValue }) => {
    console.log(adminData)
    try {
      const response = await axios.post(`http://localhost:5100/api/auth/login`, adminData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }});

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5100/api/auth/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.tokenExpiresAt=null;
      state.status='idle';
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        console.log(state.tokenExpiresAt)
        state.tokenExpiresAt = action.payload.tokenExpiresAt;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('admin', JSON.stringify(action.payload.admin));
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.admin = null;
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })},
});
export const { logoutAdmin } = authSlice.actions;
export default authSlice.reducer;

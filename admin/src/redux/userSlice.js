import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  status: 'idle',
  error: null,
  token: localStorage.getItem('token') || null,
  tokenExpiresAt:null,
};

// Async thunk for registration
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5100/api/users/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    console.log(userData)
    try {
      const response = await axios.post(`http://localhost:5100/api/auth/login`, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'user/logout',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5100/api/users/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for login change password

// Placeholder for login change password thunk
export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      const response = await axios.post(`http://localhost:5100/api/users/forgetpassword`,userData);
      window.location.reload('/resetpassword/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//Async thunk for reset password
export const resetPassword = createAsyncThunk('user/resetPassword/:token',async(formData,token,{rejectWithValue}) => {
    console.log(token);
    console.log(formData);
    try {
      const response = await axios.post(`http://localhost:5100/api/users/resetpassword/${token}`,formData);
      return response.data;
    } 
    catch (error) {
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
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        console.log(state.tokenExpiresAt)
        state.tokenExpiresAt = action.payload.tokenExpiresAt;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
     .addCase(forgetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;

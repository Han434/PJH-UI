// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:4000/user');
  return response.data;
});

// ✅ Create a new user
export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  const response = await axios.post('http://localhost:4000/user', newUser);
  return response.data;
});

// ✅ Delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`http://localhost:4000/user/${userId}`);
  return userId; // Return the userId to remove from state
});

// ✅ Fetch a user by ID (renamed)
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
  const response = await axios.get(`http://localhost:4000/user/${userId}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    selectedUser: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create user
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((user) => user.id !== action.payload);
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
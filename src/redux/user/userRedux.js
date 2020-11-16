import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'

export const fetchUsers = createAsyncThunk('FETCH_USERS', async thunkAPI => {
  try {
    const response = await api.getUsers()
    return response.data
  } catch (err) {
    thunkAPI.dispatch('FETCH_USERS/rejected')
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    errorMessage: '',
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = null
      state.users = []
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload
    },
    [fetchUsers.rejected]: (state, action) => {
      state.errorMessage = action.error.message
    },
  },
})

export const { login, logout } = userSlice.actions

export const selectUser = state => state.user.user
export const selectUsers = state => state.user.users

export default userSlice.reducer

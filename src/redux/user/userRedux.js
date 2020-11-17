import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user = null
      state.users = []
    },
    allUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const { login, logout, allUsers } = userSlice.actions

export const selectUser = state => state.user.user
export const selectUsers = state => state.user.users

export default userSlice.reducer

import { combineReducers } from '@reduxjs/toolkit'

import userReducer from 'redux/user/userRedux'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer

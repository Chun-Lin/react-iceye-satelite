import { configureStore } from '@reduxjs/toolkit'

import rootReducer from 'redux/rootReducer'

export default configureStore({
  reducer: rootReducer,
})

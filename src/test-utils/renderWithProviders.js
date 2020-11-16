import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import rootReducer from 'redux/rootReducer'

const middleware = [...getDefaultMiddleware()]

const customRender = (
  ui,
  {
    initialState = {},
    store = configureStore({
      reducer: rootReducer,
      middleware: middleware,
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

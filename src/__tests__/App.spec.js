import React from 'react'

import { render, wait } from 'test-utils'

import App from 'containers/App'

test('should show <App /> correctly', async () => {
  const { getByRole, getByTestId } = render(<App />, {
    initialState: { user: { users: [{ name: 'Gary' }] } },
  })

  await wait(() =>
    expect(getByRole('img')).toHaveAttribute(
      'src',
      'https://www.iceye.com/hubfs/img/media/mediakits/logos/png-iceye-logo-white.png'
    )
  )

  await wait(() => expect(getByTestId('iconHamburger')).toBeInTheDocument())
})

test('should show <App /> correctly', async () => {
  const { getByText } = render(<App />, {
    initialState: { user: { users: [], user: null } },
  })

  await wait(() => expect(getByText(/Name/i)).toBeInTheDocument())
  await wait(() => expect(getByText(/Password/i)).toBeInTheDocument())
})

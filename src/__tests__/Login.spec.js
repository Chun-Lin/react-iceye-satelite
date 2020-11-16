import React from 'react'
import userEvent from '@testing-library/user-event'

import { render, wait } from 'test-utils'
import api from 'api'
import Login from 'components/Login'

jest.mock('api')

test('should show <Login /> correctly', async () => {
  let { getToken: mockGetToken } = api

  mockGetToken.mockResolvedValue({
    data: { data: { access: 'ansu8nhu8g0h23' } },
  })

  const { findByText, getByPlaceholderText } = render(<Login />)

  expect(await findByText(/SIGN IN TO YOUR ACCOUNT/i)).toBeInTheDocument()
  expect(await findByText(/Name/i)).toBeInTheDocument()
  expect(await findByText(/Password/i)).toBeInTheDocument()

  const nameInputNode = getByPlaceholderText(/Please Enter Your Name/i)
  userEvent.type(nameInputNode, 'Gary')
  expect(nameInputNode).toHaveValue('Gary')

  const passwordInputNode = getByPlaceholderText(/Please Enter Your Password/i)
  await wait(() => {
    userEvent.type(passwordInputNode, 'gary1234')
  })
  expect(passwordInputNode).toHaveValue('gary1234')

  const signInBtnNode = await findByText(/^SIGN IN$/i)
  await wait(() => {
    userEvent.click(signInBtnNode)
  })

  expect(mockGetToken).toHaveBeenCalledWith({
    userId: 'Gary',
    password: 'gary1234',
  })
})

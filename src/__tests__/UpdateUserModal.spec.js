import React from 'react'
import userEvent from '@testing-library/user-event'

import { render, wait } from 'test-utils'
import api from 'api'
import UpdateUserModal from 'components/UpdateUserModal'

jest.mock('api')

test('should show <UpdateUserModal /> correctly', async () => {
  let { updateUserInfo: mockUpdateUserInfo } = api

  mockUpdateUserInfo.mockResolvedValue()

  const onClose = jest.fn()
  const { findByText, getByPlaceholderText, getByTestId } = render(
    <UpdateUserModal onClose={onClose} />
  )

  expect(await findByText(/Update User Info/i)).toBeInTheDocument()
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

  const closeBtnNode = getByTestId('closeBtn')
  await wait(() => {
    userEvent.click(closeBtnNode)
  })

  expect(onClose).toHaveBeenCalledTimes(1)

  const updateBtnNode = await findByText(/^UPDATE$/i)
  await wait(() => {
    userEvent.click(updateBtnNode)
  })

  expect(mockUpdateUserInfo).toHaveBeenCalledWith({
    name: 'Gary',
    password: 'gary1234',
  })
})

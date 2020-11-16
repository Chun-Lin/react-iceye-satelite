import React from 'react'
import userEvent from '@testing-library/user-event'

import { render, wait } from 'test-utils'

import api from 'api'
import Main from 'components/Main'

jest.mock('api')

test('should show <Main /> correctly', async () => {
  let { getAcquisitions: mockGetAcquisitions } = api

  mockGetAcquisitions.mockResolvedValue({
    data: [
      {
        timestamp: 1602646350,
        sites: 8,
      },
      {
        timestamp: 1602500000,
        sites: 20,
      },
      {
        timestamp: 1603000000,
        sites: 12,
      },
      {
        timestamp: 1604500000,
        sites: 15,
      },
      {
        timestamp: 1604000000,
        sites: 10,
      },
    ],
  })

  const { findByText, findByRole, findByTestId } = render(<Main />)

  expect(await findByRole('img')).toHaveAttribute(
    'src',
    'https://www.iceye.com/hubfs/img/media/mediakits/logos/png-iceye-logo-white.png'
  )
  await wait(() => expect(mockGetAcquisitions).toHaveBeenCalled())
  expect(await findByText(/^20$/)).toBeInTheDocument()

  const iconHamburgerNode = await findByTestId('iconHamburger')
  userEvent.click(iconHamburgerNode)

  expect(await findByText(/^Update User/i)).toBeInTheDocument()
  expect(await findByText(/Logout/i)).toBeInTheDocument()
})

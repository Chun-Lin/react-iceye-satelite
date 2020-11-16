import React from 'react'
import userEvent from '@testing-library/user-event'

import { render } from 'test-utils'

import Header from 'components/Header'

test('should show <Header /> correctly', async () => {
  const setIsMenuOpen = jest.fn()
  const { findByRole, getByTestId } = render(
    <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={false} />
  )

  expect(await findByRole('img')).toHaveAttribute(
    'src',
    'https://www.iceye.com/hubfs/img/media/mediakits/logos/png-iceye-logo-white.png'
  )

  const iconHamburgerNode = getByTestId('iconHamburger')
  userEvent.click(iconHamburgerNode)

  expect(setIsMenuOpen).toHaveBeenCalledTimes(1)
})

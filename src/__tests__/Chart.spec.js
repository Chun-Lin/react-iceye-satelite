import React from 'react'

import { render } from 'test-utils'
import Chart from 'components/Chart'

test('should show <Header /> correctly', async () => {
  const mockChartData = [
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
  ]
  const { findByText } = render(<Chart data={mockChartData} />)

  expect(await findByText(/^20$/)).toBeInTheDocument()
})

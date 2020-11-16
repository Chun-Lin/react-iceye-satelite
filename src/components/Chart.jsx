import PropTypes from 'prop-types'
import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  createContainer,
} from 'victory'
import dayjs from 'dayjs'

function Chart({ data }) {
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi')

  const generateTickValues = data => {
    return data.filter(acquisition => acquisition.timeStamp % 500000 === 0)
  }

  return (
    <div>
      {data.length > 0 ? (
        <VictoryChart
          theme={VictoryTheme.material}
          width={600}
          height={300}
          containerComponent={
            <VictoryZoomVoronoiContainer
              preserveAspectRatio="none"
              labels={({ datum }) =>
                `${datum.sites} sites, ${dayjs
                  .unix(datum.timestamp)
                  .format('MMM[.]DD h:mm A')}`
              }
            />
          }
        >
          <VictoryBar data={data} x="timestamp" y="sites" />
          <VictoryAxis
            tickValues={generateTickValues(data)}
            tickFormat={timeStamp =>
              `${dayjs.unix(timeStamp).format('MMM[.]DD hA')}`
            }
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      ) : null}
    </div>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default Chart

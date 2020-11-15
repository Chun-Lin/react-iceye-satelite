import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory'
import dayjs from 'dayjs'

import api from 'api'

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-tiems: center;
  background-color: #fefefe;
  overflow: auto;
`

const Header = styled.header`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  background-color: #71b17f;
`

const ChartWrapper = styled.div`
  flex: 1;
`

function Main() {
  const [acquisitions, setAcqusitions] = useState([])

  useEffect(() => {
    const getSatelliteAcquisitions = async () => {
      try {
        const res = await api.getAcquisitions()
        setAcqusitions(res.data)
      } catch (err) {
        console.log(err.message)
      }
    }

    getSatelliteAcquisitions()
  }, [])

  const generateTickValues = acquisitions => {
    return acquisitions.filter(
      acquisition => acquisition.timeStamp % 500000 === 0
    )
  }

  return (
    <MainWrapper>
      <Header>
        <div>Title</div>
        <div>icon</div>
      </Header>
      <ChartWrapper>
        {acquisitions.length > 0 ? (
          <VictoryChart
            theme={VictoryTheme.material}
            width={600}
            height={300}
            containerComponent={
              <VictoryZoomContainer preserveAspectRatio="none" />
            }
          >
            <VictoryBar data={acquisitions} x="timestamp" y="sites" />
            <VictoryAxis
              tickValues={generateTickValues(acquisitions)}
              tickFormat={timeStamp =>
                `${dayjs.unix(timeStamp).format('MMM[.]DD hA')}`
              }
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        ) : null}
      </ChartWrapper>
    </MainWrapper>
  )
}

export default Main

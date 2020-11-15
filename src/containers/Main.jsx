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
import { GiHamburgerMenu } from 'react-icons/gi'

import api from 'api'
import { useModal } from 'hooks'
import UpdateUserModal from 'components/UpdateUserModal'

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
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #71b17f;
`

const ChartWrapper = styled.div`
  flex: 1;
  position: relative;
`

const DropdownMenuWrapper = styled.div`
  position: absolute;
  width: 30%;
  padding: 10px 0;
  top: 0px;
  right: 0;
  border-radius: 5px;
  z-index: 500;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 600px) and (max-width: 900px) {
  }

  @media screen and (max-width: 600px) {
    width: 50%;
  }
`

const MenuList = styled.div`
  padding: 12px 16px;

  &:hover {
    background-color: lightgrey;
  }
`

function Main() {
  const [acquisitions, setAcqusitions] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const {
    showModal: showUpdateModal,
    closeModal: closeUpdateModal,
    renderModal: renderUpdateModal,
  } = useModal({
    isCoverRemovable: true,
    isCoverShown: true,
  })

  const updateUserHandler = () => {
    showUpdateModal()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <MainWrapper>
      <Header>
        <div>Title</div>
        <GiHamburgerMenu size="40px" onClick={menuHandler} />
      </Header>

      <ChartWrapper>
        {isMenuOpen ? (
          <DropdownMenuWrapper>
            <MenuList onClick={updateUserHandler}>Update User</MenuList>
            <MenuList>Logout</MenuList>
          </DropdownMenuWrapper>
        ) : null}

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
      {renderUpdateModal(<UpdateUserModal onClose={closeUpdateModal} />)}
    </MainWrapper>
  )
}

export default Main

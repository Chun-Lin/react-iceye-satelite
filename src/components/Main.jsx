import React, { useEffect, useState, lazy, Suspense } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import api from 'api'
import { useModal } from 'hooks'
import UpdateUserModal from 'components/UpdateUserModal'
import { logout } from 'redux/user/userRedux'

import Header from 'components/Header'

const Chart = lazy(() => import('components/Chart'))

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fefefe;
  overflow: auto;
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

  const dispatch = useDispatch()

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

  const logoutClickHandler = async () => {
    await localStorage.removeItem('userId')
    await localStorage.removeItem('accessToken')
    await dispatch(logout())
  }

  return (
    <MainWrapper>
      <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <ChartWrapper>
        {isMenuOpen ? (
          <DropdownMenuWrapper>
            <MenuList onClick={updateUserHandler}>Update User</MenuList>
            <MenuList onClick={logoutClickHandler}>Logout</MenuList>
          </DropdownMenuWrapper>
        ) : null}
        <Suspense fallback={<div></div>}>
          <Chart data={acquisitions} />
        </Suspense>
      </ChartWrapper>

      {renderUpdateModal(<UpdateUserModal onClose={closeUpdateModal} />)}
    </MainWrapper>
  )
}

export default Main

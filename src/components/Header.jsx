import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'

const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #71b17f;

  img {
    width: 20%;
    height: 100%;
    object-fit: contain;
  }
`

function Header({ setIsMenuOpen, isMenuOpen }) {
  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <HeaderWrapper>
      <img
        src="https://www.iceye.com/hubfs/img/media/mediakits/logos/png-iceye-logo-white.png"
        alt="ICEYE"
      />
      <GiHamburgerMenu
        size="40px"
        color="#FEFEFE"
        onClick={menuHandler}
        data-testid="iconHamburger"
      />
    </HeaderWrapper>
  )
}

Header.propTypes = {
  isMenuOpen: PropTypes.bool,
  setIsMenuOpen: PropTypes.func,
}

export default Header

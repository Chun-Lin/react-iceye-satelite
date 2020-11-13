import React, { memo, useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const ModalPortalStyles = styled.div`
  > *:first-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    ${(props) => props.modalStyles};
  }
`

let modalRootEl = document.getElementById('modal-root')
if (!modalRootEl) {
  modalRootEl = document.createElement('div')
  modalRootEl.setAttribute('id', 'modal-root')
}

export const ModalPortal = memo(({ children }) => {
  useEffect(() => {
    document.body.appendChild(modalRootEl)
  })

  return ReactDOM.createPortal(
    <ModalPortalStyles>{children}</ModalPortalStyles>,
    modalRootEl
  )
})

const ModalCover = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 900;
  background: ${(props) =>
    props.isCoverShown ? 'rgba(0,0,0,0.2)' : 'transparent'};
  ${(props) => props.coverStyles};
`

export const useModal = ({ isCoverRemovable = true, isCoverShown = true }) => {
  const [isVisible, setIsVisible] = useState(false)

  const showModal = useCallback(() => setIsVisible(true), [])
  const closeModal = useCallback(() => setIsVisible(false), [])

  const renderModal = (modal) => (
    <>
      <ModalPortal>
        {isVisible ? (
          <>
            {modal}
            <ModalCover
              isCoverShown={isCoverShown}
              onClick={isCoverRemovable ? closeModal : undefined}
            />
          </>
        ) : null}
      </ModalPortal>
    </>
  )

  return {
    isVisible,
    showModal,
    closeModal,
    renderModal,
  }
}

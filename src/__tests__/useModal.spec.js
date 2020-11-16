import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'

import { render } from 'test-utils'
import { useModal, ModalPortal } from 'hooks'

const Modal = ({ closeModal }) => {
  return (
    <div style={{ width: '100px', height: '100px', background: 'white' }}>
      Test...
      <button onClick={closeModal}>Hide</button>
    </div>
  )
}

function App() {
  const {
    showModal: showTestModal,
    closeModal: closeTestModal,
    renderModal,
  } = useModal({
    isCoverRemovable: true,
    isCoverShown: true,
  })

  return (
    <div className="App">
      <button onClick={showTestModal}>Show</button>
      {renderModal(<Modal closeModal={closeTestModal} />)}
    </div>
  )
}

describe('Testing renderring, showing, hiding modal comp with useModal', () => {
  it('Test useModal', () => {
    const { result } = renderHook(() =>
      useModal({ isCoverRemovable: true, isCoverShown: true })
    )

    act(() => {
      result.current.showModal()
    })

    expect(result.current.isVisible).toBe(true)

    act(() => {
      result.current.closeModal()
    })

    expect(result.current.isVisible).toBe(false)
  })

  it('modal shows the children and a close button', () => {
    const closeModal = jest.fn()

    const { getByText } = render(
      <ModalPortal>
        <Modal closeModal={closeModal} />
      </ModalPortal>
    )

    expect(getByText('Test...')).toBeTruthy()

    userEvent.click(getByText('Hide'))

    expect(closeModal).toHaveBeenCalledTimes(1)
  })

  it('modal renderring by using useModal', () => {
    const { getByText, queryByText } = render(<App />)

    userEvent.click(getByText('Show'))

    expect(getByText('Test...')).toBeTruthy()

    userEvent.click(getByText('Hide'))

    expect(queryByText('Test...')).toBeNull()
  })
})

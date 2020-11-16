import React from 'react'
import './Modal.scss'

const Modal = ({ children, close }) => {
  const checkForClose = (e) => {
    if (e.target.id === 'ModalBackground') {
      handleClose(e)
    }
  }
  const handleClose = () => {
    document.getElementById('ModalBackground').className = 'closing'
    document.getElementById('Modal').className = 'closing'
    window.setTimeout(() => close(), 320)
  }
  return (
    <div id="ModalBackground" onClick={checkForClose}>
      <div id="Modal">
        <button
          id="ModalClose"
          onClick={handleClose}
          aria-label="Close Popup Menu"
        >
          x
        </button>
        {children}
        <div></div>
      </div>
    </div>
  )
}

export default Modal

import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Create from '../Create/Create'
import Join from '../Join/Join'
import Modal from '../Modal/Modal'
import './Header.scss'

const Header = () => {
  const { id } = useParams()
  const [modal, setModal] = useState()
  const [copy, setCopy] = useState('fa fa-clipboard')
  const [label, setLabel] = useState('Sharing ID:')

  function handleCopy() {
    const copyText = document.getElementById('gameId')
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand('copy')
    setCopy('fa fa-check')
    setLabel('Copied!')
    setTimeout(() => {
      setCopy('fa fa-clipboard')
      setLabel('Sharing Id:')
    }, 1000)
  }
  return (
    <header>
      <Link to="/">
        <h1>Go!</h1>
      </Link>
      {id && (
        <div className="GameId">
          {label}
          <input id="gameId" readOnly value={id} />
          <i onClick={handleCopy} className={copy} />
        </div>
      )}
      <div
        className="right"
        style={window.innerWidth < 600 && id ? { display: 'none' } : null}
      >
        <button onClick={() => setModal('create')}>New Game</button>
        <button onClick={() => setModal('join')}>Join Game</button>
      </div>

      {modal ? (
        <Modal close={() => setModal(false)}>
          {modal === 'join' ? (
            <Join close={() => setModal(false)} />
          ) : (
            <Create close={() => setModal(false)} />
          )}
        </Modal>
      ) : null}
    </header>
  )
}

export default Header

import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { callApi } from '../api'
import { createGame } from '../graphql/mutations'
import Modal from '../Modal/Modal'
import Create from '../Create/Create'
import Join from '../Join/Join'
import './Home.scss'

const Home = () => {
  const [modal, setModal] = useState()

  return (
    <div id="Home">
      <img src="/home.png" className="bg" alt="Go!" />
      <h1>Play online, in real time</h1>
      <h2>No sign-ups, no downloads, just get going!</h2>
      <div className="Buttons">
        <button onClick={() => setModal('create')}>start new game</button>
        <button onClick={() => setModal('join')}>join existing game</button>
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
    </div>
  )
}

export default Home

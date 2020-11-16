import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { callApi } from '../api'
import { createGame } from '../graphql/mutations'
import Modal from '../Modal/Modal'
import './Home.scss'

const Home = () => {
  const [modal, setModal] = useState()

  const Join = () => {
    const [gameId, setGameId] = useState('')
    return (
      <>
        <h3>Join a Game</h3>
        <label htmlFor="host">
          Enter your Game ID:
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
        </label>
        <Link to={`/game/${gameId}`}>
          <button>Find my game!</button>
        </Link>
      </>
    )
  }

  const Create = () => {
    const [host, setHost] = useState('')
    const [boardSize, setBoardSize] = useState(5)
    const history = useHistory()

    function createBoard(size) {
      return Array.apply(null, Array(size)).map(() =>
        Array.apply(null, Array(size)).map(() => '')
      )
    }

    async function handleCreate() {
      const res = await callApi(createGame, {
        input: {
          host,
          boardSize,
          board: JSON.stringify(createBoard(boardSize)),
        },
      })
      console.log(res)
      const { id } = res.data.createGame
      history.push(`/game/${id}`)
    }

    return (
      <>
        <h3>Create a New Game</h3>
        <label htmlFor="host">
          Your name:
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </label>
        <div className="Buttons">
          {[5, 9, 13, 19].map((size) => (
            <button
              key={size}
              onClick={() => setBoardSize(size)}
              className={boardSize === size ? 'active' : ''}
            >
              {size} x {size}
            </button>
          ))}
        </div>
        <button className="action" onClick={handleCreate}>
          Let's go!
        </button>
      </>
    )
  }

  return (
    <div id="Home">
      <h1>GO!</h1>
      <h2>Play online with friends in real time!</h2>
      <div className="Buttons">
        <button onClick={() => setModal('join')}>join game</button>
        <button onClick={() => setModal('create')}>create game</button>
      </div>
      {modal ? (
        <Modal close={() => setModal(false)}>
          {modal === 'join' ? <Join /> : <Create />}
        </Modal>
      ) : null}
    </div>
  )
}

export default Home

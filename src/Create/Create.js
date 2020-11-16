import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { callApi } from '../api'
import { createGame } from '../graphql/mutations'
import { getGame } from '../graphql/queries'
const shortid = require('shortid')

const Create = ({ close }) => {
  const [host, setHost] = useState('')
  const [boardSize, setBoardSize] = useState(5)
  const history = useHistory()

  function createBoard(size) {
    return Array.apply(null, Array(size)).map(() =>
      Array.apply(null, Array(size)).map(() => 0)
    )
  }

  async function handleCreate() {
    const id = shortid.generate().toUpperCase().substring(0, 4)
    const existing = await callApi(getGame, { id })
    if (existing.data.getGame) {
      handleCreate()
      return
    }
    await callApi(createGame, {
      input: {
        id,
        host,
        boardSize,
        board: JSON.stringify(createBoard(boardSize)),
      },
    })
    history.push(`/game/${id}`)
    close()
  }

  return (
    <>
      <h3>Create a New Game</h3>
      <label htmlFor="host">
        Hosted by:&nbsp;&nbsp;
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="your name..."
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

export default Create

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = ({ close }) => {
  const [gameId, setGameId] = useState('')
  return (
    <>
      <h3>Join a Game</h3>
      <label htmlFor="host">
        Game Id:&nbsp;&nbsp;
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="9 digit code..."
        />
      </label>
      <br />
      <Link to={`/game/${gameId}`} onClick={close}>
        <button className="action">Find my game!</button>
      </Link>
    </>
  )
}

export default Join

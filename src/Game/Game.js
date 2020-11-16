import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { callApi, createSubscription } from '../api'
import Board from '../Board/Board'
import { updateGame } from '../graphql/mutations'
import { getGame } from '../graphql/queries'
import { onUpdateGame } from '../graphql/subscriptions'
import './Game.scss'

const BASE_URL = 'localhost:3000'

const Game = () => {
  const { id } = useParams()
  const [game, setGame] = useState()
  const [loading, setLoading] = useState(true)
  const [copyText, setCopyText] = useState('Copy Sharable Link')
  const [player, setPlayer] = useState(1)

  useEffect(() => {
    fetchGame()
  }, [id])

  useEffect(() => {
    game && initSubscription()
  }, [game])

  async function fetchGame() {
    const res = await callApi(getGame, { id })
    setGame({
      ...res.data.getGame,
      board: JSON.parse(res.data.getGame.board),
    })
    setLoading(false)
  }

  async function initSubscription() {
    createSubscription(
      onUpdateGame,
      { id, host: game.host },
      handleSubscriptionUpdate
    )
  }

  async function handleSubscriptionUpdate(res) {
    setGame({
      ...res.value.data.onUpdateGame,
      board: JSON.parse(res.value.data.onUpdateGame.board),
    })
  }

  async function handleMove(cellX, cellY, playerOverride) {
    const updatedBoard = updateBoard(
      game.board,
      cellX,
      cellY,
      playerOverride !== undefined ? playerOverride : player
    )
    const res = await callApi(updateGame, {
      input: {
        id,
        board: JSON.stringify(updatedBoard),
      },
    })
    setGame({
      ...res.data.updateGame,
      board: JSON.parse(res.data.updateGame.board),
    })
  }

  function updateBoard(board, x, y, value) {
    // TODO: implement game logic
    const updated = board.slice()
    updated[y][x] = value
    return updated
  }

  const PlayerSelect = () => {
    return (
      <div id="PlayerSelect">
        <button
          className={player === 1 ? 'active' : ''}
          onClick={() => setPlayer(1)}
        >
          Light
        </button>
        <button
          className={player === 2 ? 'active' : ''}
          onClick={() => setPlayer(2)}
        >
          Dark
        </button>
      </div>
    )
  }

  if (!id) return <Redirect to="/" />
  if (loading) return <div id="Game">loading game id: {id}</div>
  else if (game)
    return (
      <div id="Game">
        {game.host && (
          <h2>
            Hosted by:&nbsp;<strong>{game.host}</strong>
          </h2>
        )}
        <PlayerSelect />
        <Board
          size={game.boardSize}
          board={game.board}
          handleMove={handleMove}
        />
      </div>
    )
  else return <div>Could not find a game with id: {id}</div>
}

export default Game

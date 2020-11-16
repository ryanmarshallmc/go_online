import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { callApi } from '../api'
import Board from '../Board/Board'
import { updateGame } from '../graphql/mutations'
import { getGame } from '../graphql/queries'
import './Game.scss'

const BASE_URL = 'localhost:3000'

const Game = () => {
  const { id } = useParams()
  const [game, setGame] = useState()
  const [loading, setLoading] = useState(true)
  const [copyText, setCopyText] = useState('Copy Sharable Link')

  useEffect(() => {
    async function fetchGame() {
      const res = await callApi(getGame, { id })
      console.log('got game!', res)
      setGame({
        ...res.data.getGame,
        board: JSON.parse(res.data.getGame.board),
      })
      setLoading(false)
    }
    fetchGame()
  }, [])

  async function handleMove(cellX, cellY) {
    console.log(
      'handling move on cell',
      cellX,
      cellY,
      'for player',
      game.currentTurn
    )
    const updatedBoard = updateBoard(game.board, cellX, cellY, game.currentTurn)
    const res = await callApi(updateGame, {
      input: {
        id,
        board: JSON.stringify(updatedBoard),
        currentTurn: game.currentTurn === 'white' ? 'black' : 'white',
      },
    })
    console.log('after update:', res)
    setGame({
      ...res.data.updateGame,
      board: JSON.parse(res.data.updateGame.board),
    })
  }

  function updateBoard(board, x, y, player) {
    // TODO: implement game logic
    const updated = board.slice()
    updated[y][x] = player.substring(0, 1)
    return updated
  }

  function copyLink() {
    navigator.clipboard.writeText(`${BASE_URL}/game/${id}`)
    setCopyText('Link Copied!')
    setTimeout(() => setCopyText('Copy Sharable Link'), 2000)
  }

  if (!id) return <Redirect to="/" />
  if (loading) return <div>loading game id: {id}</div>
  else if (game)
    return (
      <div id="Game">
        <Link to="/">
          <h1>Go!</h1>
        </Link>
        <h2>Hosted by: {game.host}</h2>
        <p>It's currently {game.currentTurn}'s turn.</p>
        <h6 onClick={copyLink}>{copyText}</h6>
        <Board board={game.board} handleMove={handleMove} />
      </div>
    )
  else return <div>Could not find a game with id: {id}</div>
}

export default Game

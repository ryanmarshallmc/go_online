import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { callApi } from '../api'
import Board from '../Board/Board'
import { getGame } from '../graphql/queries'

const Game = () => {
  const { id } = useParams()
  console.log('game id is', id)
  const [game, setGame] = useState()
  const [loading, setLoading] = useState(true)

  function handleMove(cell, player) {
    console.log('handling move on cell', cell, 'for player', player)
  }

  useEffect(() => {
    async function fetchGame() {
      const res = await callApi(getGame, { id })
      console.log('got game!', res)
      setGame({
        ...res.data.getGame,
        board: {
          current: [
            ['b', 'w', 'b', null, null],
            ['b', 'w', 'b', null, null],
            ['b', 'w', 'b', null, null],
            ['b', 'w', 'b', null, null],
            ['b', 'w', 'b', null, null],
          ],
        },
      })
      setLoading(false)
    }
    fetchGame()
  }, [])

  if (!id) return <Redirect to="/" />
  if (loading) return <div>loading game id: {id}</div>
  else if (game)
    return (
      <div>
        game hosted by: {game.host}
        <Board board={game.board} handleMove={handleMove} />
      </div>
    )
  else return <div>Could not find a game with id: {id}</div>
}

export default Game

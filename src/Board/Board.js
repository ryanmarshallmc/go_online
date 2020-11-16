import React, { useEffect, useState } from 'react'
import './Board.scss'

const Board = ({ size, board, handleMove }) => {
  const [menu, setMenu] = useState()
  useEffect(() => {
    document.documentElement.style.setProperty('--boardSize', size)
  }, [size])

  function addEdges(x, y) {
    const classes = []
    if (x === size - 1) {
      classes.push('right-edge')
    }
    if (y === size - 1) {
      classes.push('bottom-edge')
    }
    return classes.join(' ')
  }

  function addColor(cell) {
    return cell === 1 ? 'light' : cell === 2 ? 'dark' : null
  }

  function handleCloseMenu(e) {
    if (e.target.id === 'Board') setMenu(null)
  }

  const ContextMenu = ({ x, y }) => (
    <div id="ContextMenu">
      <div
        className="clear"
        onClick={() => {
          handleMove(x, y, 0)
          setMenu(null)
        }}
      />
      <div
        className="light"
        onClick={() => {
          handleMove(x, y, 1)
          setMenu(null)
        }}
      />
      <div
        className="dark"
        onClick={() => {
          handleMove(x, y, 2)
          setMenu(null)
        }}
      />
      <div className="close" onClick={() => setMenu(null)}>
        x
      </div>
    </div>
  )

  return (
    <div id="Board" onClick={handleCloseMenu}>
      {board.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={[x, y]}
            className={`Cell ${addEdges(x, y)} ${
              menu === `${x},${y}` ? 'active' : ''
            }`}
          >
            <div
              className={`Stone ${addColor(cell)}`}
              onClick={
                cell ? () => setMenu(`${x},${y}`) : () => handleMove(x, y)
              }
              onContextMenu={(e) => {
                e.preventDefault()
                setMenu(`${x},${y}`)
              }}
            />
            {menu === `${x},${y}` && <ContextMenu x={x} y={y} />}
          </div>
        ))
      )}
    </div>
  )
}

export default Board

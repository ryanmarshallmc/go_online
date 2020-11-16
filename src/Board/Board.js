import React, { useEffect } from 'react'
import './Board.scss'

const Board = ({ size, board, handleMove }) => {
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

  return (
    <div id="Board">
      {board.map((row, y) =>
        row.map((cell, x) => (
          <div key={[x, y]} className={`Cell ${x} ${y} ${addEdges(x, y)}`}>
            <div
              className={`Stone ${cell}`}
              onClick={cell ? null : () => handleMove(x, y)}
            />
          </div>
        ))
      )}
    </div>
  )
}

export default Board

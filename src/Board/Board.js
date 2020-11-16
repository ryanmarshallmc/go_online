import React from 'react'
import './Board.scss'

const Board = ({ board, handleMove }) => {
  return (
    <div id="Board">
      {board.map((row, i) => (
        <div
          className="Row"
          key={i}
          style={{
            height: `${100 / board.length}%`,
          }}
        >
          {row.map((cell, j) => (
            <div
              key={[i, j]}
              style={{
                width: `${100 / board.length}%`,
              }}
              className={`Cell ${cell}`}
              onClick={() => handleMove(j, i)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board

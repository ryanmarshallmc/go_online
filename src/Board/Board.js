import React from 'react'
import './Board.scss'

const Board = ({ board, handleMove }) => {
  const { current } = board
  return (
    <div id="Board">
      {current.map((row, i) => (
        <div className="Row" key={i}>
          {row.map((cell, j) => (
            <div
              key={[i, j]}
              className={`Cell ${cell}`}
              onClick={() => handleMove([i, j], 'white')}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board

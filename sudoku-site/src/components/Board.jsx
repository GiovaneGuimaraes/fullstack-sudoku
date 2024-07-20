import React from 'react';

const Board = ({ board, handleChange, solvedBoard }) => {
  const getCellStyle = (row, col) => {
    if (board[row][col] === 0) return {};
    if (board[row][col] === solvedBoard[row][col]) {
      return { backgroundColor: 'lightgreen' };
    } else {
      return { backgroundColor: 'lightcoral' };
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="number"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              style={getCellStyle(rowIndex, colIndex)}
              min="1"
              max="9"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;

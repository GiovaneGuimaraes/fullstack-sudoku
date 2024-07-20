import React from 'react';

const Cell = ({ value, onChange }) => {
  return (
    <input
      type="number"
      min="1"
      max="9"
      value={value !== 0 ? value : ''}
      onChange={onChange}
      className="cell"
    />
  );
};

export default Cell;
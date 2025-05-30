import React from 'react';
import './Square.css';

interface SquareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningSquare?: boolean;
  winner?: 'X' | 'O' | null;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare = false, winner }) => {
  const getClassName = () => {
    if (isWinningSquare && winner === 'X') return 'square winner-x';
    if (isWinningSquare && winner === 'O') return 'square winner-o';
    return 'square';
  };

  return (
    <button
      className={getClassName()}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default React.memo(Square);

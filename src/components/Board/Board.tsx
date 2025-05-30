import React from 'react';
import './Board.css';
import { useGameStore } from '../../store/useGameStore';
import Square from '../Square/Square';

const Board: React.FC = () => {
  const { board, makeMove, winner } = useGameStore();

  const winningLine = React.useMemo(() => {
    if (!winner) return [];
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
    for (const [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [a,b,c];
      }
    }
    return [];
  }, [board, winner]);

  return (
    <div className="board" role="grid" >
      {board.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => makeMove(i)}
          isWinningSquare={winningLine.includes(i)}
          winner={winner}
        />
      ))}
    </div>
  );
};

export default React.memo(Board);

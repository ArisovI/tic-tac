import React from 'react';
import './Game.css';
import { useGameStore } from '../../store/useGameStore';
import Board from '../Board/Board';

const Game: React.FC = () => {
  const { currentPlayer, winner, isDraw, resetGame } = useGameStore();

  const renderStatus = () => {
    if (winner) return `Победитель: ${winner}`;
    if (isDraw) return 'Ничья!';
    return `Ходит: ${currentPlayer}`;
  };

  return (
    <div className="game" role="main" >
      <h1>Крестики-нолики</h1>
      <Board />
      <div className="status">{renderStatus()}</div>
     {winner &&  <button className="reset-button" onClick={resetGame}>
        Начать заново
      </button>}
    </div>
  );
};

export default Game;

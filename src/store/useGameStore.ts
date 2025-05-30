import {create} from 'zustand'
import type { BoardState, Player } from '../types';

interface GameState {
  board: BoardState;
  currentPlayer: Player;
  winner: Player;
  isDraw: boolean;

  makeMove: (index: number) => void;
  resetGame: () => void;
}

const initialBoard: BoardState = Array(9).fill(null);

export const useGameStore = create<GameState>((set, get) => ({
  board: initialBoard,
  currentPlayer: 'X',
  winner: null,
  isDraw: false,

  makeMove: (index: number) => {
    const { board, currentPlayer, winner } = get();
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const winnerPlayer = calculateWinner(newBoard);
    const isDraw = !winnerPlayer && newBoard.every(Boolean);

    set({
      board: newBoard,
      winner: winnerPlayer,
      isDraw,
      currentPlayer: winnerPlayer || isDraw ? null : currentPlayer === 'X' ? 'O' : 'X',
    });
  },

  resetGame: () => {
    set({
      board: initialBoard,
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
    });
  },
}));

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
];

function calculateWinner(board: BoardState): Player {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

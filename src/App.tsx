import React, { useState, useEffect } from "react";
import { PuzzleBoard } from "./PuzzleBoard/PuzzleBoard";
import { PUZZLE_ROWS, PUZZLE_COLS } from "./config";
import "./App.css";

function App() {
  const totalTiles = PUZZLE_ROWS * PUZZLE_COLS;
  const solvedBoard = Array.from({ length: totalTiles }, (_, i) => (i + 1) % totalTiles);

  const [board, setBoard] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    shuffleBoard();
  }, []);

  const shuffleBoard = () => {
    const arr = [...solvedBoard];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setBoard(arr);
    setMessage("");
  };

  const handleTileClick = (index: number) => {
    const emptyIndex = board.indexOf(0);

    const row = Math.floor(index / PUZZLE_COLS);
    const col = index % PUZZLE_COLS;
    const emptyRow = Math.floor(emptyIndex / PUZZLE_COLS);
    const emptyCol = emptyIndex % PUZZLE_COLS;

    // Flytta i samma rad
    if (row === emptyRow && col !== emptyCol) {
      const newBoard = [...board];
      if (col < emptyCol) {
        // flytta höger
        for (let c = emptyCol; c > col; c--) {
          newBoard[row * PUZZLE_COLS + c] = newBoard[row * PUZZLE_COLS + c - 1];
        }
      } else {
        // flytta vänster
        for (let c = emptyCol; c < col; c++) {
          newBoard[row * PUZZLE_COLS + c] = newBoard[row * PUZZLE_COLS + c + 1];
        }
      }
      newBoard[index] = 0;
      setBoard(newBoard);
    }

    // Flytta i samma kolumn
    if (col === emptyCol && row !== emptyRow) {
      const newBoard = [...board];
      if (row < emptyRow) {
        // flytta nedåt
        for (let r = emptyRow; r > row; r--) {
          newBoard[r * PUZZLE_COLS + col] = newBoard[(r - 1) * PUZZLE_COLS + col];
        }
      } else {
        // flytta uppåt
        for (let r = emptyRow; r < row; r++) {
          newBoard[r * PUZZLE_COLS + col] = newBoard[(r + 1) * PUZZLE_COLS + col];
        }
      }
      newBoard[index] = 0;
      setBoard(newBoard);
    }
    checkWin();
  };

  const checkWin = () => {
    const isSolved = board.every((val, i) => val === solvedBoard[i]);
    if (isSolved) {
      setMessage("🎉 Grattis, du löste pusslet!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>N-Pussel</h1>
      <PuzzleBoard board={board} onTileClick={handleTileClick} />
      <div style={{ marginTop: "20px" }}>
        <button className="shuffle-button" onClick={shuffleBoard}>Slumpa</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;


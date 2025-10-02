import React, { useState, useEffect } from "react";
import { PuzzleBoard } from "./PuzzleBoard/PuzzleBoard";
import { AppPresenter } from "./AppPresenter";
import "./App.css";

function App() {
  const [presenter] = useState(() => new AppPresenter());
  const [board, setBoard] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    shuffleBoard();
  }, []);

  const shuffleBoard = () => {
    const newBoard = presenter.createShuffledBoard();
    setBoard(newBoard);
    setMessage("");
  };

  const handleTileClick = (index: number) => {
    const newBoard = presenter.handleTileClick(board, index);
    if (newBoard) {
      setBoard(newBoard);
      checkWin(newBoard);
    }
  };

  const checkWin = (currentBoard: number[]) => {
    const isSolved = presenter.checkWinCondition(currentBoard);
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


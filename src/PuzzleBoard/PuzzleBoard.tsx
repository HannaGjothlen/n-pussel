import React from "react";
import { PUZZLE_ROWS, PUZZLE_COLS } from "../config";
import "./PuzzleBoard.css";

type PuzzleBoardProps = {
  board: number[];
  onTileClick: (index: number) => void;
};

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ board, onTileClick }) => {
  return (
    <div
      className="puzzle-board"
      style={{
        gridTemplateRows: `repeat(${PUZZLE_ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${PUZZLE_COLS}, 1fr)`,
      }}
    >
      {board.map((value, index) => (
        <button
          key={index}
          disabled={value === 0}
          onClick={() => onTileClick(index)}
          className={`puzzle-tile ${value === 0 ? "empty" : ""}`}
        >
          {value !== 0 ? value : ""}
        </button>
      ))}
    </div>
  );
};



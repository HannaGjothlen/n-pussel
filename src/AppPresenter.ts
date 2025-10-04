import { PUZZLE_ROWS, PUZZLE_COLS } from './config';

export class AppPresenter {
  private totalTiles: number;
  private solvedBoard: number[];

  constructor() {
    this.totalTiles = PUZZLE_ROWS * PUZZLE_COLS;
    this.solvedBoard = Array.from({ length: this.totalTiles }, (_, i) => (i + 1) % this.totalTiles);
  }

  // Skapar en shufflad version av det lösta brädet (så att det alltid går att lösa pusslet)
  public createShuffledBoard(): number[] {
    const arr = [...this.solvedBoard];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Kontrollerar om pusslet är löst
  public checkWinCondition(board: number[]): boolean {
    return board.every((val, i) => val === this.solvedBoard[i]);
  }

  // Beräknar rad och kolumn från index (Row 0: [0,1,2,3])
  private getRowCol(index: number): { row: number; col: number } {
    return {
      row: Math.floor(index / PUZZLE_COLS),
      col: index % PUZZLE_COLS
    };
  }

  //Flyttar tiles i samma rad
  private moveTilesInRow(board: number[], clickedIndex: number, emptyIndex: number): number[] {
    const newBoard = [...board]; // Skapar entt nytt spelbräde
    const { row, col } = this.getRowCol(clickedIndex);
    const { col: emptyCol } = this.getRowCol(emptyIndex);

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
    newBoard[clickedIndex] = 0;
    return newBoard;
  }

  // Flyttar tiles i samma kolumn
  private moveTilesInColumn(board: number[], clickedIndex: number, emptyIndex: number): number[] {
    const newBoard = [...board];
    const { row, col } = this.getRowCol(clickedIndex);
    const { row: emptyRow } = this.getRowCol(emptyIndex);

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
    newBoard[clickedIndex] = 0;
    return newBoard;
  }

  //Hanterar klick på en tile och returnerar det nya brädet om flytten är giltig
  public handleTileClick(board: number[], clickedIndex: number): number[] | null {
    const emptyIndex = board.indexOf(0); //Hittar det tomma fältet
    
    const { row, col } = this.getRowCol(clickedIndex);
    const { row: emptyRow, col: emptyCol } = this.getRowCol(emptyIndex);

    // Flytta i samma rad
    if (row === emptyRow && col !== emptyCol) {
      return this.moveTilesInRow(board, clickedIndex, emptyIndex);
    }

    // Flytta i samma kolumn
    if (col === emptyCol && row !== emptyRow) {
      return this.moveTilesInColumn(board, clickedIndex, emptyIndex);
    }

    // Ingen giltig flytt
    return null;
  }


}

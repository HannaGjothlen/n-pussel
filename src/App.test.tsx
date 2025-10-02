import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { PUZZLE_ROWS, PUZZLE_COLS } from './config';

describe('N-Puzzle App', () => {
  test('renders app title and shuffle button', () => {
    render(<App />);
    
    const titleElement = screen.getByText('N-Pussel');
    expect(titleElement).toBeInTheDocument();
    
    const shuffleButton = screen.getByText('Slumpa');
    expect(shuffleButton).toBeInTheDocument();
    expect(shuffleButton).toHaveClass('shuffle-button');
  });

  test('initializes puzzle board with correct number of tiles', async () => {
    render(<App />);
    
    await waitFor(() => {
      const tiles = screen.getAllByRole('button');
      const puzzleTiles = tiles.filter(tile => tile.textContent !== 'Slumpa');
      expect(puzzleTiles).toHaveLength(PUZZLE_ROWS * PUZZLE_COLS);
    });
  });

  test('shuffle button is clickable and clears messages', async () => {
    render(<App />);
    
    const shuffleButton = screen.getByText('Slumpa');
    
    // Klicka på shuffle-knappen
    fireEvent.click(shuffleButton);
    
    // Kontrollera att inga win-meddelanden visas efter shuffle
    await waitFor(() => {
      const winMessage = screen.queryByText(/Grattis, du löste pusslet!/);
      expect(winMessage).not.toBeInTheDocument();
    });
  });
});

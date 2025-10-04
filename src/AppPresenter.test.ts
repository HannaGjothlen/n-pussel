import { AppPresenter } from './AppPresenter';

describe('AppPresenter', () => {
  let presenter: AppPresenter;

  beforeEach(() => {
    presenter = new AppPresenter();
  });

  describe('createShuffledBoard', () => {
    test('creates a board with correct number of tiles', () => {
      const board = presenter.createShuffledBoard();
      expect(board).toHaveLength(16); // 4x4 grid
    });

    test('contains all numbers from 0 to 15', () => {
      const board = presenter.createShuffledBoard();
      const sortedBoard = [...board].sort((a, b) => a - b);
      const expectedNumbers = Array.from({ length: 16 }, (_, i) => i);
      expect(sortedBoard).toEqual(expectedNumbers);
    });
  });

  describe('checkWinCondition', () => {
    test('returns true for solved board', () => {
      const solvedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
      expect(presenter.checkWinCondition(solvedBoard)).toBe(true);
    });

    test('returns false for unsolved board', () => {
      const unsolvedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0];
      expect(presenter.checkWinCondition(unsolvedBoard)).toBe(false);
    });
  });

  describe('handleTileClick', () => {
    test('moves tile horizontally when in same row as empty space', () => {
      // Tomrum vid index 3, klicka på brickan vid index 2
      const board = [1, 2, 3, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 4];
      const result = presenter.handleTileClick(board, 2);
      
      expect(result).not.toBeNull();
      expect(result![2]).toBe(0); // Tomrum flyttas till klickad position
      expect(result![3]).toBe(3); // Brickan flyttas till var tomrummet var
    });

    test('moves tile vertically when in same column as empty space', () => {
      // Tomrum vid index 11, klicka på brickan vid index 7
      const board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 13, 14, 15, 12];
      const result = presenter.handleTileClick(board, 7);
      
      expect(result).not.toBeNull();
      expect(result![7]).toBe(0); // Tomrum flyttas till klickad position
      expect(result![11]).toBe(8); // Brickan flyttas ner
    });

    test('returns null for invalid move', () => {
      // Tomrum vid index 14, klicka på brickan vid index 0 (inte intilliggande)
      const board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
      const result = presenter.handleTileClick(board, 0);
      
      expect(result).toBeNull();
    });

    test('moves multiple tiles in row when clicking far tile', () => {
      // Tomrum vid index 0, klicka på brickan vid index 3
      const board = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1];
      const result = presenter.handleTileClick(board, 3);
      
      expect(result).not.toBeNull();
      expect(result![0]).toBe(2); // Första brickan flyttas till tomrummet
      expect(result![1]).toBe(3); // Andra brickan flyttas
      expect(result![2]).toBe(4); // Tredje brickan flyttas
      expect(result![3]).toBe(0); // Tomrum flyttas till klickad position
    });
  });
});

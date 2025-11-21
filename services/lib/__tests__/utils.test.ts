import { gamesByDate, sortByDate, formatCurrency, formatDateToLocal, generatePagination } from '../utils'
import { GameJoinedWith2Players } from '../definitions'

describe('Utils Functions', () => {
  describe('gamesByDate', () => {
    it('should return +1 when first date is earlier than second date', () => {
      const gameA = { date: '2023-01-01' }
      const gameB = { date: '2023-01-02' }
      expect(gamesByDate(gameA, gameB)).toBe(1)
    })

    it('should return -1 when first date is later than second date', () => {
      const gameA = { date: '2023-01-02' }
      const gameB = { date: '2023-01-01' }
      expect(gamesByDate(gameA, gameB)).toBe(-1)
    })

    it('should return 0 when dates are equal', () => {
      const gameA = { date: '2023-01-01' }
      const gameB = { date: '2023-01-01' }
      expect(gamesByDate(gameA, gameB)).toBe(0)
    })
  })

  describe('sortByDate', () => {
    it('should sort games by date in descending order (newest first)', () => {
      const games: GameJoinedWith2Players[] = [
        {
          date: '2023-01-01',
          league_name: 'League 1',
          tournament_name: 'Tournament 1',
          game_id: '1',
          player1: 'Player 1',
          player1Wins: 2,
          player2: 'Player 2',
          player2Wins: 0,
          result: 1,
          round: 1
        },
        {
          date: '2023-01-03',
          league_name: 'League 1',
          tournament_name: 'Tournament 1',
          game_id: '2',
          player1: 'Player 3',
          player1Wins: 1,
          player2: 'Player 4',
          player2Wins: 2,
          result: 2,
          round: 1
        },
        {
          date: '2023-01-02',
          league_name: 'League 1',
          tournament_name: 'Tournament 1',
          game_id: '3',
          player1: 'Player 5',
          player1Wins: 0,
          player2: 'Player 6',
          player2Wins: 2,
          result: 2,
          round: 1
        }
      ]

      sortByDate(games)

      expect(games[0].date).toBe('2023-01-03')
      expect(games[1].date).toBe('2023-01-02')
      expect(games[2].date).toBe('2023-01-01')
    })
  })


  describe('formatDateToLocal', () => {
    it('should format date string to local format', () => {
      const result = formatDateToLocal('2023-12-25T00:00:00Z')
      expect(result).toMatch(/Dec 25, 2023/)
    })

    it('should use custom locale when provided', () => {
      const result = formatDateToLocal('2023-12-25T00:00:00Z', 'en-GB')
      expect(result).toMatch(/25 Dec 2023/)
    })

    it('should handle different date string formats', () => {
      const result = formatDateToLocal('2023-01-15')
      expect(result).toMatch(/Jan 15, 2023/)
    })
  })

  describe('generatePagination', () => {
    it('should return all pages when total pages <= 7', () => {
      expect(generatePagination(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
      expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5])
    })

    it('should show first 3, ellipsis, and last 2 when current page <= 3', () => {
      expect(generatePagination(1, 10)).toEqual([1, 2, 3, '...', 9, 10])
      expect(generatePagination(2, 15)).toEqual([1, 2, 3, '...', 14, 15])
      expect(generatePagination(3, 20)).toEqual([1, 2, 3, '...', 19, 20])
    })

    it('should show first 2, ellipsis, and last 3 when current page >= totalPages - 2', () => {
      expect(generatePagination(8, 10)).toEqual([1, 2, '...', 8, 9, 10])
      expect(generatePagination(13, 15)).toEqual([1, 2, '...', 13, 14, 15])
      expect(generatePagination(18, 20)).toEqual([1, 2, '...', 18, 19, 20])
    })

    it('should show first, ellipsis, middle, ellipsis, last when current page is in the middle', () => {
      expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10])
      expect(generatePagination(8, 15)).toEqual([1, '...', 7, 8, 9, '...', 15])
      expect(generatePagination(10, 20)).toEqual([1, '...', 9, 10, 11, '...', 20])
    })
  })
}) 

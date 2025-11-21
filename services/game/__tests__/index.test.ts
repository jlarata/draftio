import { gameServices } from '../index'

// Mock the SQL database operations
jest.mock('@vercel/postgres', () => ({
  sql: jest.fn(),
}))

// Mock nextauth
jest.mock('next-auth', () => ({
  auth: jest.fn(),
}))

const mockSql = require('@vercel/postgres').sql

describe('Game Services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchGameById', () => {
    it('should fetch a game by ID', async () => {
      const mockGameData = {
        id: 'game-123',
        tournament_id: 'tournament-123',
        player1: 'player1-id',
        player2: 'player2-id',
        match1: 2,
        match2: 1,
        match3: 0,
        result: 1
      }

      mockSql.mockResolvedValueOnce({
        rows: [mockGameData]
      })

      const result = await gameServices.fetchGameById('game-123')

      expect(mockSql).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining('SELECT'),
          expect.stringContaining('game-123')
        ])
      )
      expect(result).toEqual(mockGameData)
    })

    it('should handle database errors gracefully', async () => {
      mockSql.mockRejectedValueOnce(new Error('Database connection failed'))

      await expect(gameServices.fetchGameById('invalid-id'))
        .rejects
        .toThrow('Failed to fetch game id invalid-id')
    })
  })

  describe('fetchFilteredGamesByUserEmail', () => {
    it('should fetch games with search and pagination', async () => {
      const mockGames = [
        {
          league_name: 'Test League',
          tournament_name: 'Test Tournament',
          date: '2023-12-25',
          game_id: 'game-1',
          player: 'Player 1',
          wins: 2,
          round: 1
        },
        {
          league_name: 'Test League',
          tournament_name: 'Test Tournament',
          date: '2023-12-25',
          game_id: 'game-1',
          player: 'Player 2',
          wins: 0,
          round: 1
        }
      ]

      mockSql.mockResolvedValueOnce({
        rows: mockGames
      })

      const result = await gameServices.fetchFilteredGamesByUserEmail('Test', 1, 'test@example.com')

      expect(mockSql).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining('SELECT'),
          expect.stringContaining('test@example.com'),
          expect.stringContaining('%Test%')
        ])
      )
      expect(result).toEqual(mockGames)
    })

    it('should handle empty search results', async () => {
      mockSql.mockResolvedValueOnce({
        rows: []
      })

      const result = await gameServices.fetchFilteredGamesByUserEmail('NonExistentGame', 1, 'test@example.com')

      expect(result).toEqual([])
    })
  })

  describe('fetchGamesPagesByUserEmail', () => {
    it('should calculate total pages correctly', async () => {
      mockSql.mockResolvedValueOnce({
        rows: [{ count: '25' }]
      })

      const result = await gameServices.fetchGamesPagesByUserEmail('search', 'test@example.com')

      expect(result).toBe(3) // Math.ceil(25 / 10) = 3
    })

    it('should handle zero results', async () => {
      mockSql.mockResolvedValueOnce({
        rows: [{ count: '0' }]
      })

      const result = await gameServices.fetchGamesPagesByUserEmail('search', 'test@example.com')

      expect(result).toBe(0)
    })

    it('should handle database errors', async () => {
      mockSql.mockRejectedValueOnce(new Error('Database error'))

      await expect(gameServices.fetchGamesPagesByUserEmail('search', 'test@example.com'))
        .rejects
        .toThrow('Failed to fetch total number of games.')
    })
  })
}) 

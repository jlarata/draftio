import { gameUtils } from '../utils'
import { Match } from '../../Match'
import { Player } from '../../Player'

describe('Swiss System Utils', () => {
  describe('get5DigitSeed', () => {
    it('should return a 5-digit number from date', () => {
      const seed = gameUtils.get5DigitSeed({ date: '2023-12-25' })
      expect(typeof seed).toBe('number')
      expect(seed.toString().length).toBe(5)
      expect(seed).toBeGreaterThanOrEqual(0)
      expect(seed).toBeLessThanOrEqual(99999)
    })

    it('should return consistent seed for same date', () => {
      const date = '2023-12-25'
      const seed1 = gameUtils.get5DigitSeed({ date })
      const seed2 = gameUtils.get5DigitSeed({ date })
      expect(seed1).toBe(seed2)
    })

    it('should return different seeds for different dates', () => {
      const seed1 = gameUtils.get5DigitSeed({ date: '2023-12-25' })
      const seed2 = gameUtils.get5DigitSeed({ date: '2023-12-26' })
      expect(seed1).not.toBe(seed2)
    })
  })

  describe('getRandomInt', () => {
    it('should return a number within range', () => {
      const max = 10
      const seed = 12345
      const result = gameUtils.getRandomInt(max, seed)
      
      expect(typeof result).toBe('number')
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(max)
    })

    it('should return consistent results for same seed', () => {
      const max = 10
      const seed = 12345
      const result1 = gameUtils.getRandomInt(max, seed)
      const result2 = gameUtils.getRandomInt(max, seed)
      expect(result1).toBe(result2)
    })
  })

  describe('arePlayersDuplicatedInMatches', () => {
    let player1: Player
    let player2: Player
    let player3: Player
    let player4: Player

    beforeEach(() => {
      player1 = new Player({
        name: 'Player 1',
        uuid: '1',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      player2 = new Player({
        name: 'Player 2',
        uuid: '2',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      player3 = new Player({
        name: 'Player 3',
        uuid: '3',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      player4 = new Player({
        name: 'Player 4',
        uuid: '4',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })
    })

    it('should return true when players are duplicated', () => {
      const match1 = new Match({ player1, player2 })
      const match2 = new Match({ player1: player3, player2: player1 }) // player1 is duplicated

      expect(gameUtils.arePlayersDuplicatedInMatches({ match1, match2 })).toBe(true)
    })

    it('should return false when no players are duplicated', () => {
      const match1 = new Match({ player1, player2 })
      const match2 = new Match({ player1: player3, player2: player4 })

      expect(gameUtils.arePlayersDuplicatedInMatches({ match1, match2 })).toBe(false)
    })

    it('should handle reversed player positions', () => {
      const match1 = new Match({ player1, player2 })
      const match2 = new Match({ player1: player2, player2: player3 }) // player2 is duplicated

      expect(gameUtils.arePlayersDuplicatedInMatches({ match1, match2 })).toBe(true)
    })
  })

  describe('calculateRoundsForSwiss', () => {
    it('should return log2 of players when it is a power of 2', () => {
      const players2 = Array(2).fill(null).map((_, i) => new Player({
        name: `Player ${i}`,
        uuid: `${i}`,
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      }))
      expect(gameUtils.calculateRoundsForSwiss({ players: players2 })).toBe(1)

      const players4 = Array(4).fill(null).map((_, i) => new Player({
        name: `Player ${i}`,
        uuid: `${i}`,
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      }))
      expect(gameUtils.calculateRoundsForSwiss({ players: players4 })).toBe(2)

      const players8 = Array(8).fill(null).map((_, i) => new Player({
        name: `Player ${i}`,
        uuid: `${i}`,
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      }))
      expect(gameUtils.calculateRoundsForSwiss({ players: players8 })).toBe(3)
    })

    it('should return undefined when not a power of 2', () => {
      const players3 = Array(3).fill(null).map((_, i) => new Player({
        name: `Player ${i}`,
        uuid: `${i}`,
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      }))
      expect(gameUtils.calculateRoundsForSwiss({ players: players3 })).toBeUndefined()

      const players5 = Array(5).fill(null).map((_, i) => new Player({
        name: `Player ${i}`,
        uuid: `${i}`,
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      }))
      expect(gameUtils.calculateRoundsForSwiss({ players: players5 })).toBeUndefined()
    })
  })

  describe('filterByPlayedMatch', () => {
    it('should filter out played matches', () => {
      const player1 = new Player({
        name: 'Player 1',
        uuid: '1',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      const player2 = new Player({
        name: 'Player 2',
        uuid: '2',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      const match1 = new Match({ player1, player2 })
      const match2 = new Match({ player1, player2 })
      
      // Mark one match as played
      match1.setPlayed()

      const unplayedMatches = [match1, match2]
      const filtered = gameUtils.filterByPlayedMatch({ unplayedMatches })

      expect(filtered).toHaveLength(1)
      expect(filtered[0]).toBe(match2)
    })

    it('should return all matches if none are played', () => {
      const player1 = new Player({
        name: 'Player 1',
        uuid: '1',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      const player2 = new Player({
        name: 'Player 2',
        uuid: '2',
        wins: 0,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      const match1 = new Match({ player1, player2 })
      const match2 = new Match({ player1, player2 })

      const unplayedMatches = [match1, match2]
      const filtered = gameUtils.filterByPlayedMatch({ unplayedMatches })

      expect(filtered).toHaveLength(2)
      expect(filtered).toEqual([match1, match2])
    })
  })

  describe('sameWinsMatches', () => {
    it('should filter matches where both players have same wins', () => {
      const player1 = new Player({
        name: 'Player 1',
        uuid: '1',
        wins: 2,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      const player2 = new Player({
        name: 'Player 2',
        uuid: '2',
        wins: 2,
        loss: 0,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      const player3 = new Player({
        name: 'Player 3',
        uuid: '3',
        wins: 1,
        loss: 1,
        draws: 0,
        gameWins: 0,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      const sameWinsMatch = new Match({ player1, player2 }) // Both have 2 wins
      const differentWinsMatch = new Match({ player1, player2: player3 }) // 2 vs 1 wins

      const unplayedMatches = [sameWinsMatch, differentWinsMatch]
      const filtered = gameUtils.sameWinsMatches({ unplayedMatches })

      expect(filtered).toHaveLength(1)
      expect(filtered[0]).toBe(sameWinsMatch)
    })
  })

  describe('createNumberArray', () => {
    it('should create array of numbers from 0 to length-1', () => {
      expect(gameUtils.createNumberArray({ unplayerMatchLength: 5 })).toEqual([0, 1, 2, 3, 4])
      expect(gameUtils.createNumberArray({ unplayerMatchLength: 3 })).toEqual([0, 1, 2])
      expect(gameUtils.createNumberArray({ unplayerMatchLength: 0 })).toEqual([])
    })
  })
}) 

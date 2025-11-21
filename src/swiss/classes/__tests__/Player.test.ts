import { Player } from '../Player'
import { Config } from '../Config'

describe('Player Class', () => {
  let player: Player
  let mockConfig: Config

  beforeEach(() => {
    player = new Player({
      name: 'Test Player',
      uuid: 'test-uuid-123',
      wins: 0,
      loss: 0,
      draws: 0,
      gameWins: 0,
      gameLoss: 0,
      rivals: [],
      buchholz: 0
    })

    mockConfig = new Config({
      bo: 3,
      pointsPerMatchWin: 3,
      pointsPerMatchTie: 1,
      pointsPerGameWin: 1,
      pointsPerBye: 2
    })
  })

  describe('constructor', () => {
    it('should create a player with correct initial values', () => {
      expect(player.name).toBe('Test Player')
      expect(player.uuid).toBe('test-uuid-123')
      expect(player.wins).toBe(0)
      expect(player.loss).toBe(0)
      expect(player.draws).toBe(0)
      expect(player.gameWins).toBe(0)
      expect(player.gameLoss).toBe(0)
      expect(player.rivals).toEqual([])
      expect(player.buchholz).toBe(0)
    })
  })

  describe('addWin', () => {
    it('should increment wins by 1', () => {
      player.addWin()
      expect(player.wins).toBe(1)

      player.addWin()
      expect(player.wins).toBe(2)
    })
  })

  describe('addLoss', () => {
    it('should increment loss by 1', () => {
      player.addLoss()
      expect(player.loss).toBe(1)

      player.addLoss()
      expect(player.loss).toBe(2)
    })
  })

  describe('addDraw', () => {
    it('should increment draws by 1', () => {
      player.addDraw()
      expect(player.draws).toBe(1)

      player.addDraw()
      expect(player.draws).toBe(2)
    })
  })

  describe('addGameWin', () => {
    it('should increment gameWins by 1', () => {
      player.addGameWin()
      expect(player.gameWins).toBe(1)

      player.addGameWin()
      expect(player.gameWins).toBe(2)
    })
  })

  describe('addGameLoss', () => {
    it('should increment gameLoss by 1', () => {
      player.addGameLoss()
      expect(player.gameLoss).toBe(1)

      player.addGameLoss()
      expect(player.gameLoss).toBe(2)
    })
  })

  describe('addRival', () => {
    it('should add a rival to the rivals array', () => {
      const rival = new Player({
        name: 'Rival Player',
        uuid: 'rival-uuid',
        wins: 1,
        loss: 0,
        draws: 0,
        gameWins: 2,
        gameLoss: 1,
        rivals: [],
        buchholz: 0
      })

      player.addRival(rival)
      expect(player.rivals).toHaveLength(1)
      expect(player.rivals[0]).toBe(rival)
    })

    it('should add multiple rivals', () => {
      const rival1 = new Player({
        name: 'Rival 1',
        uuid: 'rival-1',
        wins: 1,
        loss: 0,
        draws: 0,
        gameWins: 2,
        gameLoss: 1,
        rivals: [],
        buchholz: 0
      })

      const rival2 = new Player({
        name: 'Rival 2',
        uuid: 'rival-2',
        wins: 0,
        loss: 1,
        draws: 0,
        gameWins: 1,
        gameLoss: 2,
        rivals: [],
        buchholz: 0
      })

      player.addRival(rival1)
      player.addRival(rival2)

      expect(player.rivals).toHaveLength(2)
      expect(player.rivals[0]).toBe(rival1)
      expect(player.rivals[1]).toBe(rival2)
    })
  })

  describe('setBuchholz', () => {
    it('should calculate buchholz score based on rivals performance', () => {
      // Create rivals with known stats
      const rival1 = new Player({
        name: 'Rival 1',
        uuid: 'rival-1',
        wins: 2,  // 2 * 3 = 6 points
        loss: 0,
        draws: 1,  // 1 * 1 = 1 point
        gameWins: 3,  // 3 * 1 = 3 points
        gameLoss: 1,
        rivals: [],
        buchholz: 0
      })

      const rival2 = new Player({
        name: 'Rival 2',
        uuid: 'rival-2',
        wins: 1,  // 1 * 3 = 3 points
        loss: 1,
        draws: 0,
        gameWins: 2,  // 2 * 1 = 2 points
        gameLoss: 2,
        rivals: [],
        buchholz: 0
      })

      player.addRival(rival1)
      player.addRival(rival2)

      player.setBuchholz({ config: mockConfig })

      // Expected: (2*3 + 1*1 + 3*1) + (1*3 + 0*1 + 2*1) = 10 + 5 = 15
      expect(player.buchholz).toBe(15)
    })

    it('should reset buchholz to 0 before calculation', () => {
      player.buchholz = 100  // Set to some non-zero value

      const rival = new Player({
        name: 'Rival',
        uuid: 'rival',
        wins: 1,
        loss: 0,
        draws: 0,
        gameWins: 1,
        gameLoss: 0,
        rivals: [],
        buchholz: 0
      })

      player.addRival(rival)
      player.setBuchholz({ config: mockConfig })

      // Should be 1*3 + 0*1 + 1*1 = 4, not 104
      expect(player.buchholz).toBe(4)
    })

    it('should handle empty rivals array', () => {
      player.setBuchholz({ config: mockConfig })
      expect(player.buchholz).toBe(0)
    })
  })
}) 

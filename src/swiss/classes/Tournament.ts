import { Config } from './Config'
import { DatabaseInfo } from './classesDb/DatabaseInfo'
import { Match } from './Match'
import { Player } from './Player'
import { Round } from './Round'
import { gameUtils } from './utils/utils'
import { DatabaseRoundInfo } from './classesDb/DatabaseRoundInfo'
import { createGame } from '@/services/lib/actions'

export class Tournament {
  public players: Player[] = []
  public unplayedMatches: Match[] = []
  private returnRound: Match[] = []
  public seed: number | undefined
  public rounds: Round[] = []
  public config: Config[] = [] //Este array esta mal, pero me tira error si saco esto y cambio setConfig
  public databaseInfo: DatabaseInfo = new DatabaseInfo({})
  public databaseRoundInfo: DatabaseRoundInfo[] = []

  public startTournament({ playersNames, date, config }: { playersNames: string[]; date: string; config: Config }) {
    this.databaseInfo.date = date
    this.createPlayers({ playersNames })
    this.setAllMatchMatrix()
    this.setConfig({ config })
    this.seed = this.setSeed({ date })
  }

  private setConfig({ config }: { config: Config }) {
    this.config = [config]
  }

  private createPlayers({ playersNames }: { playersNames: string[] }) {
    this.players = playersNames.map(
      (name) =>
        new Player({ name, uuid: '-1', wins: 0, loss: 0, draws: 0, gameWins: 0, gameLoss: 0, rivals: [], buchholz: 0 })
    )
  }

  private setAllMatchMatrix() {
    const games = [] as Match[]
    this.players.forEach((currPlayer) => {
      this.players.forEach((oponentPlayer) => {
        if (
          currPlayer !== oponentPlayer &&
          !games.some(
            (game) =>
              (game.player1.player === currPlayer && game.player2.player === oponentPlayer) ||
              (game.player1.player === oponentPlayer && game.player2.player === currPlayer)
          )
        ) {
          games.push(new Match({ player1: currPlayer, player2: oponentPlayer }))
        }
      })
    })
    this.unplayedMatches = games
  }

  public getUnplayedMatches() {
    return this.unplayedMatches
  }

  public showRound() {
    return this.returnRound
  }

  public setSeed({ date }: { date: string }) {
    return gameUtils.get5DigitSeed({ date })
  }

  private getNewRound() {
    if (this.seed === undefined) {
      throw new Error('Missing seed')
    }
    return new Round({
      unplayedMatches: this.unplayedMatches,
      seed: this.seed,
      players: this.players,
      roundUnfairness: 0,
    })
  }

  private roundNumber() {
    const roundLenght = this.rounds.length
    this.rounds[roundLenght - 1].roundNumber = roundLenght
  }

  private getFirstRound() {
    const newRound = this.getNewRound()
    newRound.getRandomMatches()
    this.rounds.push(newRound)
    this.roundNumber()
  }

  private getNextRoundSameWins() {
    const newRound = this.getNewRound()
    newRound.getPairedMatches()
    this.rounds.push(newRound)
    this.roundNumber()
  }

  private getRoundAfterSwiss() {
    const newRound = this.getNewRound()
    newRound.getRound()
    this.rounds.push(newRound)
    this.roundNumber()
  }

  private filterByPlayedMatch() {
    if (this.rounds.length !== 0) {
      this.unplayedMatches = gameUtils.filterByPlayedMatch({
        unplayedMatches: this.unplayedMatches,
      })
    }
  }

  private checkDraws() {
    return this.players.some((player) => player.draws !== 0)
  }

  public createRound() {
    this.filterByPlayedMatch()
    const roundLength = this.rounds.length
    const draws = this.checkDraws()
    const roundsForSwiss = gameUtils.calculateRoundsForSwiss({
      players: this.players,
    })

    if (roundLength === 0) {
      this.getFirstRound()
    } else if (roundsForSwiss === undefined || roundsForSwiss <= roundLength || draws) {
      this.getRoundAfterSwiss()
    } else if (roundsForSwiss > roundLength || !draws) {
      this.getNextRoundSameWins()
    }
    gameUtils.setPlayedMatchesByRound({
      matches: this.rounds[roundLength].matches,
      unplayedMatches: this.unplayedMatches,
    })
  }

  public restartTournament() {
    this.rounds = []
    this.unplayedMatches = []
    this.players.map((player) => {
      player.buchholz = 0
      player.draws = 0
      player.gameLoss = 0
      player.gameWins = 0
      player.loss = 0
      player.rivals = []
      player.wins = 0
    })
    this.setAllMatchMatrix()
  }

  public createRoundsInDB(round: number, origin_url: string) {
    this.databaseRoundInfo[round-1].match.map((singlematch) => {
      const formData = new FormData()
      formData.append('league_id', this.databaseInfo.leagueID)
      formData.append('tournament_id', this.databaseInfo.touranmentID)
      formData.append('round', round.toString())
      formData.append('player1_id', singlematch.player1_id)
      formData.append('player1_wins', singlematch.player1_wins.toString())
      formData.append('player2_id', singlematch.player2_id)
      formData.append('player2_wins', singlematch.player2_wins.toString())
      formData.append('origin_url', origin_url)
      createGame(formData)
    })
  }

}

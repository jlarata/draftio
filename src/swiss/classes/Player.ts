import { Config } from './Config'

export class Player {
  //Para ir puliendo el fairness se le puede agregar ademas de wins, loss y sets win loss
  public name: string
  public wins: number = 0
  public loss: number = 0
  public draws: number = 0
  public gameWins: number = 0
  public gameLoss: number = 0
  public rivals: Player[] = []
  public buchholz: number = 0
  constructor({
    name,
    wins,
    loss,
    draws,
    gameWins,
    gameLoss,
    rivals,
    buchholz,
  }: {
    name: string
    wins: number
    loss: number
    draws: number
    gameWins: number
    gameLoss: number
    rivals: Player[]
    buchholz: number
  }) {
    this.name = name
    this.wins = wins
    this.loss = loss
    this.draws = draws
    this.gameWins = gameWins
    this.gameLoss = gameLoss
    this.rivals = rivals
    this.buchholz = buchholz
  }
  public addWin() {
    this.wins += 1
  }
  public addLoss() {
    this.loss += 1
  }
  public addDraw() {
    this.draws += 1
  }
  public addGameWin() {
    this.gameWins += 1
  }
  public addGameLoss() {
    this.gameLoss += 1
  }
  public addRival(rival: Player) {
    this.rivals.push(rival)
  }

  public setBuchholz({ config }: { config: Config }) {
    this.buchholz = 0
    this.rivals.map((player) => {
      this.buchholz +=
        player.wins * config.pointsPerMatchWin +
        player.draws * config.pointsPerMatchTie +
        player.gameWins * config.pointsPerGameWin //Falta Byes
    })
  }
}

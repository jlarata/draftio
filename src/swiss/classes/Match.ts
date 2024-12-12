import { Config } from './Config'
import { Player } from './Player'

export class Match {
  public player1: { player: Player }
  public player2: { player: Player }
  public played: Boolean = false
  public unfairness: number = 0
  constructor({ player1, player2 }: { player1: Player; player2: Player }) {
    this.player1 = { player: player1 }
    this.player2 = { player: player2 }
    this.unfairness = Math.abs(player1.wins - player2.wins)
  }

  public setPlayed() {
    this.played = true
  }

  public calculateFairness() {
    this.unfairness = Math.abs(
      this.player1.player.wins * 100 +
        this.player1.player.gameWins -
        this.player2.player.wins * 100 -
        this.player2.player.gameWins
    )
  }

  private updateMatchResult({
    player1GameWins,
    player2GameWins,
  }: {
    player1GameWins: number
    player2GameWins: number
  }) {
    const player1 = this.player1.player
    const player2 = this.player2.player

    player1.gameWins += player1GameWins
    player1.gameLoss += player2GameWins
    player2.gameWins += player2GameWins
    player2.gameLoss += player1GameWins
    player1.addRival(player2)
    player2.addRival(player1)
  }

  private evaluateMatchResult({
    player1GameWins,
    player2GameWins,
  }: {
    player1GameWins: number
    player2GameWins: number
  }) {
    const player1 = this.player1.player
    const player2 = this.player2.player

    if (player1GameWins > player2GameWins) {
      player1.wins += 1
      player2.loss += 1
    } else if (player1GameWins < player2GameWins) {
      player2.wins += 1
      player1.loss += 1
    } else {
      player1.draws += 1
      player2.draws += 1
    }
  }

  private updateBuchholz(config:Config) {
    this.player1.player.setBuchholz({config})
    this.player2.player.setBuchholz({config})
  }

  public setMatchResult({ player1GameWins, player2GameWins, config }: { player1GameWins: number; player2GameWins: number, config:Config }) {
    this.updateMatchResult({ player1GameWins: player1GameWins, player2GameWins: player2GameWins })
    this.evaluateMatchResult({ player1GameWins: player1GameWins, player2GameWins: player2GameWins })
    this.updateBuchholz(config)
  }
}

export class MatchDB {
  public round: number = 0
  public player1_id: string = ''
  public player2_id: string = ''
  public player1_name: string = ''
  public player2_name: string = ''
  public player1_wins: number = 0
  public player2_wins: number = 0

  public saveResults({
    round,
    player1_name,
    player1_id,
    player1_wins,
    player2_name,
    player2_id,
    player2_wins,
  }: {
    round: number
    player1_name: string
    player1_id: string
    player1_wins: number
    player2_name: string
    player2_id: string
    player2_wins: number
  }) {
    this.round = round
    this.player1_name = player1_name
    this.player1_id = player1_id
    this.player1_wins = player1_wins
    this.player2_name = player2_name
    this.player2_id = player2_id
    this.player2_wins = player2_wins
    return this
  }
  
}

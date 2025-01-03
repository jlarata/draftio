import { MatchDB } from "./MatchDB"

export class DatabaseRoundInfo {
    public tournament_id: string = ""
    public round : number = 0
    public match: MatchDB[] = [] //Crear MatchDB, crear PlayerDB alimentar con eso esto y devolver este objeto para que la DB guarde

public addMatch({
    round = 0,
    player1_name = "",
    player1_id = "",
    player1_wins = 0,
    player2_name = "",
    player2_id = "",
    player2_wins = 0,
  }: {
    round?: number
    player1_name?: string
    player1_id?: string
    player1_wins?: number
    player2_name?: string
    player2_id?: string
    player2_wins?: number
  }= {}) {
    this.round = round
    const matchToAdd = new MatchDB().saveResults({
        round,
        player1_name,
        player1_id,
        player1_wins,
        player2_name,
        player2_id,
        player2_wins,
      }) 
    this.match.push(matchToAdd)
} }
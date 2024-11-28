import { sql } from "@vercel/postgres"
import { GameAxis, TournamentAxis } from "../lib/definitions"

const fetchGamesAndTournamentsForChart = async () => {
    // noStore();
    try {
      const gamesDataPromise = await sql<GameAxis>`SELECT * FROM game`
      const tournamentsDataPromise = await sql<TournamentAxis>`SELECT * FROM tournament`
  
      const [games, tournament] = await Promise.all([gamesDataPromise, tournamentsDataPromise])
  
      return {
        games: games.rows,
        tournaments: tournament.rows,
      }
    } catch (error) {
      console.error('Database Error:', error)
      throw new Error('Failed to fetch games and tournaments data.')
    }
}
    export const ChartServices = {
        fetchGamesAndTournamentsForChart
    }
    
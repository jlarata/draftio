import { sql } from "@vercel/postgres"
import { GameAxis, TournamentAxis } from "../lib/definitions"
import { unstable_noStore as noStore } from 'next/cache'


const fetchGamesAndTournamentsForChart = async () => {
    noStore()
    try {
      const {rows : gamesDataPromise} = await sql<GameAxis>`SELECT * FROM game`
      const {rows : tournamentsDataPromise} = await sql<TournamentAxis>`SELECT * FROM tournament`
  
      const [games, tournaments] = await Promise.all([gamesDataPromise ?? 'No games in ddbb', tournamentsDataPromise ?? 'No tournaments in ddbb'])
  
      return {
        games: games,
        tournaments: tournaments,
      }
    } catch (error) {
      console.error('Database Error:', error)
      throw new Error('Failed to fetch games and tournaments data.')
    }
}
    export const ChartServices = {
        fetchGamesAndTournamentsForChart
    }
    
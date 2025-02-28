import { sql } from "@vercel/postgres"
import { GameAxis, TournamentAxis } from "../lib/definitions"
import { unstable_noStore } from 'next/cache'



const fetchGamesAndTournamentsForChart = async (user_email:string) => {
  //unstable_noStore()
    try {
      const {rows : gamesDataPromise} = await sql<GameAxis>`
      SELECT *
      FROM
        game g
      WHERE
      g.tournament_id
      IN
      (
        SELECT t.id
        FROM
          tournament t
        WHERE t.league_id
        IN
        (
          SELECT lu.league_id
          FROM
            league_user lu
          WHERE
            lu.p_user_email = ${user_email}
        )
      )
      `
      const {rows : tournamentsDataPromise} = await sql<TournamentAxis>`
      SELECT *
      FROM
        tournament t
      WHERE t.league_id
      IN
        (
          SELECT lu.league_id
          FROM
            league_user lu
          WHERE
            lu.p_user_email = ${user_email}
        )
      `
      
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
    
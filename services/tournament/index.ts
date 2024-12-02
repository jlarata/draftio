import { sql } from '@vercel/postgres'
import { TournamentForCreateQuery } from '../lib/definitions'

const fetchSelectTournamentData = async ({ league_id }: { league_id: string }) => {
  try {
    const {rows : tournamentsPromise} = await sql<TournamentForCreateQuery>`
      SELECT
      league_id, id, name, TO_CHAR(t.date, 'dd/mm/yyyy') AS date
      
      FROM
      tournament t
      WHERE t.league_id = ${league_id};
      
      `

    const tournaments = tournamentsPromise ?? 'No tournaments in chosen league'
    return {
      tournaments: tournaments,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch selectTournament data.')
  }
}

export const tournamentServices = {
  fetchSelectTournamentData,
}

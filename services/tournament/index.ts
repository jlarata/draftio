import { sql } from '@vercel/postgres'
import { TournamentForCreateQuery } from '../lib/definitions'

const fetchSelectTournamentData = async ({ leagueId }: { leagueId: string }) => {
  try {
    const tournamentsPromise = await sql<TournamentForCreateQuery>`
      SELECT
      leagueid, id, name, TO_CHAR(t.date, 'dd/mm/yyyy') AS date
      
      FROM
      tournaments t
      WHERE t.leagueid = ${leagueId};
      
      `

    const data = await Promise.all([tournamentsPromise])
    const tournaments = data[0].rows ?? 'No tournaments in chosen league'
    return {
      tournaments,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch selectTournament data.')
  }
}

export const tournamentServices = {
  fetchSelectTournamentData,
}

import { sql } from '@vercel/postgres'
import { TournamentForCreateQuery } from '../lib/definitions'

const fetchSelectTournamentData = async ({ leagueId }: { leagueId: string }) => {
  try {
    const {rows : tournamentsPromise} = await sql<TournamentForCreateQuery>`
      SELECT
      leagueid, id, name, TO_CHAR(t.date, 'dd/mm/yyyy') AS date
      
      FROM
      tournaments t
      WHERE t.leagueid = ${leagueId};
      
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

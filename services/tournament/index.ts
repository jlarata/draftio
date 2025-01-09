import { sql } from '@vercel/postgres'
import { Tournament, TournamentForCreateQuery } from '../lib/definitions'

const fetchSelectTournamentData = async ({ league_id }: { league_id: string }) => {
  //console.log("attempting to fetch from league "+league_id)
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

const fetchSelectTournamentDataByLeagueName = async ( league_name : string ) => {
  //console.log("attempting to fetch from league "+league_id)
  try {
    const {rows : tournamentsPromise} = await sql<TournamentForCreateQuery>`
      SELECT
      league_id, id, name, TO_CHAR(t.date, 'dd/mm/yyyy') AS date
      
      FROM
      tournament t
      WHERE t.league_id = (
      SELECT 
      id
      FROM
      league l
      WHERE l.name = ${league_name});
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
/* THIS SHOULD BE THE ONLY TOURNAMENT FETCH METHOD? Im not sure why i created one that fetchs by name. */
 
const fetchTournamentDataByLeagueId = async ( league_id : string ) => {
  try {
    const {rows : tournamentsPromise} = await sql<Tournament>`
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
  fetchSelectTournamentDataByLeagueName,
  fetchTournamentDataByLeagueId,
}

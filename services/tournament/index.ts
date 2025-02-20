import { sql } from '@vercel/postgres'
import { Tournament, TournamentForCreateQuery, TournamentForEdit, TournamentForLeaguesTable } from '../lib/definitions'

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

const fetchTournamentById = async ( tournament_id : string ) => {
  try {
    const {rows : tournamentPromise} = await sql<TournamentForEdit>`
      SELECT
        t.id,
        t.seed,
        t.name,
        t.league_id,
        l.name AS league_name,
        TO_CHAR(t.date, 'dd/mm/yyyy') AS date,
        t.champion_id,
        p.username AS champion_name

      FROM
        tournament t
      LEFT JOIN
        player p
      ON
        p.id = t.champion_id
      LEFT JOIN
        league l
      ON
        t.league_id = l.id


      WHERE t.id = ${tournament_id};
      `

    const tournament = tournamentPromise[0] ?? 'No tournaments in chosen league'
    return {
      tournament: tournament,
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

const fetchTournamentsByUserEmail = async ( user_email : string ) => {
  //console.log(`searching tournaments in leagues for ${user_email}`)
  try {
    const {rows : tournamentsPromise} = await sql<TournamentForLeaguesTable>`
      SELECT
        t.league_id,
        t.id,
        t.name,
        TO_CHAR(t.date, 'dd/mm/yyyy') AS date,
        t.champion_id,
        p.username AS champion_name

      FROM
        tournament t
      LEFT JOIN
        player p
      ON
        p.id = t.champion_id

      WHERE t.league_id
      IN (
        SELECT
          l.id
        FROM
          league l
        WHERE
          l.id
        IN (
          SELECT
            lu.league_id
          FROM
            league_user lu
          WHERE
            user_role = 'admin'
          AND
            p_user_email = ${user_email}
      ))
      `
    const tournaments = tournamentsPromise ?? 'No tournaments for chosen user'
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
  fetchTournamentsByUserEmail,
  fetchTournamentById,
}

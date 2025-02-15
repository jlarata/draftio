import { sql } from "@vercel/postgres"
import { League } from "../lib/definitions"

const fetchSelectLeagueData = async () => {
  try {
    const { rows: leaguesPromise } = await sql<League>`SELECT id, name FROM league;`

    const leagues = leaguesPromise ?? 'No leagues in database'
    return {
      leagues: leagues,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch selectLeague data.')
  }
}

const fetchLeagueByPlayerId = async (id: string) => {
  try {
    const { rows: leaguesPromise } = await sql<League>`
SELECT
  id, name
FROM
  league
WHERE
    id
IN
 (
  SELECT
    league_id
  FROM
    league_player
  WHERE
    player_role = 'admin'
  AND
    player_id =${id}
  )`

    const leagues = leaguesPromise ?? 'No leagues in database'
    return {
      leagues: leagues,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch selectLeague data.')
  }
}

const fetchLeagueById = async (league_id: string) => {
  try {
    const { rows: leaguesPromise } = await sql<League>`
  SELECT
    id, name
  FROM
    league
  WHERE
    id = ${league_id}`


  const leagueName : string = leaguesPromise[0].name

  return {
    leagueName
  }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch selectLeagueById data.')
  }
}

export const leagueServices = {
  fetchSelectLeagueData,
  fetchLeagueByPlayerId,
  fetchLeagueById,

}
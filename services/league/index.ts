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

const fetchLeaguesByUserEmail = async (user_email: string) => {
  //console.log(`searching lagues for ${user_email}`)
  try {
    const { rows: leaguesPromise } = await sql<League>`
SELECT
  l.id, l.name
FROM
  league l
WHERE
    l.id IN (
  SELECT
    lu.league_id
  FROM
    league_user lu
  WHERE
    lu.p_user_email = ${user_email}
  AND
    lu.user_role = 'admin'
  )
`
/*add conditional?
 IF (
  select user_role from league_user where p_user_email = ${id} and league_id = (
    SELECT le.id FROM league le WHERE le.id = ${id} )  )
*/
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
  fetchLeagueById,
  fetchLeaguesByUserEmail,
}
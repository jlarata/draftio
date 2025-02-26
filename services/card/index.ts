import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache';


const fetchCardData = async (user_email : string) =>  {
  //unstable_noStore()
  try {
    const gamesCountPromise = sql`
    SELECT COUNT(*)
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
    const playersCountPromise = sql`SELECT COUNT(*) FROM player p
    WHERE p.league_id
      IN
      (
        SELECT lu.league_id
        FROM
          league_user lu
        WHERE
          lu.p_user_email = ${user_email}
      )
    `
    const leaguesCountPromise = sql`SELECT COUNT(*) FROM league l
    WHERE
      l.id
    IN
      (
        SELECT lu.league_id
        FROM
          league_user lu
        WHERE
          lu.p_user_email = ${user_email}
      )`
    const tournamentsCountPromise = sql`SELECT COUNT(*) FROM tournament t
    WHERE
      t.league_id
    IN
      (
        SELECT lu.league_id
        FROM
          league_user lu
        WHERE
          lu.p_user_email = ${user_email}
      )`

    const data = await Promise.all([
      gamesCountPromise,
      playersCountPromise,
      leaguesCountPromise,
      tournamentsCountPromise,
    ])

    const numberOfGames = Number(data[0].rows[0].count ?? '0')
    const numberOfPlayers = Number(data[1].rows[0].count ?? '0')
    const numberOfLeagues = Number(data[2].rows[0].count ?? '0')
    const numberOfTournaments = Number(data[3].rows[0].count ?? '0')

    return {
      numberOfGames,
      numberOfPlayers,
      numberOfLeagues,
      numberOfTournaments,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}

export const cardServices = {
  fetchCardData,
}

import { sql } from '@vercel/postgres'
import { Player } from '../lib/definitions'

const fetchPlayersByLeague = async (league_id: string) => {
  // noStore();
  try {
    const { rows: players } = await sql<Player>`
    SELECT p.id, p.username
    FROM
      player p
    WHERE
      p.league_id = ${league_id}
    ORDER BY
      p.username
    COLLATE case_insensitive
    
    
    ;`

    /* for this to work i had to run

    CREATE COLLATION case_insensitive (
      provider = icu,
      locale = 'und-u-ks-level2',
      deterministic = false
    );

    in the db.
 */


    return {
      players: players ?? 'No players in database',
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch players data.')
  }
}

const fetchPlayersByLeagueOwner = async (league_id: string) => {
  // noStore();
  try {
    const { rows: players } = await sql<Player>`
    SELECT p.id, p.username
    FROM
      player p
    WHERE
      p.id
    IN
    (
      SELECT
        up.player_id
      FROM
        user_player up
      WHERE
        up.user_email
      IN
      (
        SELECT
          lu.p_user_email
        FROM
          league_user lu
        WHERE
          lu.league_id = ${league_id}
        AND
        user_role = 'admin'
      )
    )
    ORDER BY
      p.username
    COLLATE case_insensitive    
    ;`

    /* for this to work i had to run

    CREATE COLLATION case_insensitive (
      provider = icu,
      locale = 'und-u-ks-level2',
      deterministic = false
    );

    in the db.
 */


    return {
      players: players ?? 'No players in database',
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch players data.')
  }
}

const fetchPlayersByUserEmail = async (user_email: string) => {
  // noStore();
  try {
    const { rows: players } = await sql<Player>`
    SELECT p.id, p.username
    FROM
      player p
    WHERE
      p.id
    IN
    (
      SELECT
        up.player_id
      FROM
        user_player up
      WHERE
        up.user_email = ${user_email}
    )
    ORDER BY
      p.username
    COLLATE case_insensitive
    ;`

    /* for this to work i had to run

    CREATE COLLATION case_insensitive (
      provider = icu,
      locale = 'und-u-ks-level2',
      deterministic = false
    );

    in the db.
 */


    return {
      players: players ?? 'No players in database',
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch players data.')
  }
}

const ITEMS_PER_PAGE = 6

const fetchPlayersPages = async (query: string, user_email:string) => {
  //unstable_noStore()
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM
        player p
      WHERE
      p.league_id
      IN
      (
        SELECT
          lu.league_id
      FROM
        league_user lu
      WHERE
        lu.p_user_email = ${user_email}
      )
      AND
        p.username ILIKE ${`%${query}%`};
  `
    const totalPages = Math.ceil(Number(count.rows[0].count) / (ITEMS_PER_PAGE * 2))
    //console.log("páginas: " +totalPages)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of pages.')
  }
}

export const playerServices = {
  fetchPlayersByLeague,
  fetchPlayersByLeagueOwner,
  fetchPlayersPages,
  fetchPlayersByUserEmail
}

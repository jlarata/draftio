import { sql } from '@vercel/postgres'
import { Player } from '../lib/definitions'

const fetchPlayersByLeague = async (league_id: string) => {
  // noStore();
  try {
    const { rows: players } = await sql<Player>`
    SELECT id, username
    FROM player
    ORDER BY username;`

    return {
      players: players ?? 'No players in database',
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch players data.')
  }
}

const ITEMS_PER_PAGE = 6

const fetchPlayersPages = async (query: string) => {
  //unstable_noStore()
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM player p
      
      WHERE
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
  fetchPlayersPages,
}

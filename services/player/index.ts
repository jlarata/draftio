import { sql } from '@vercel/postgres'
import { Player } from '../lib/definitions'

const fetchPlayersByLeague = async (league_id: string) => {
  // noStore();
  try {
    const { rows: players } = await sql<Player>`SELECT id, nick FROM players;`

    return {
      players: players ?? 'No players in database',
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch players data.')
  }
}

export const playerServices = {
  fetchPlayersByLeague,
}

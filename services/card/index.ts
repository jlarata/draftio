import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache';


const fetchCardData = async () =>  {
  //unstable_noStore()
  try {
    const gamesCountPromise = sql`SELECT COUNT(*) FROM game`
    const playersCountPromise = sql`SELECT COUNT(*) FROM player`
    const leaguesCountPromise = sql`SELECT COUNT(*) FROM league`
    const tournamentsCountPromise = sql`SELECT COUNT(*) FROM tournament`

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

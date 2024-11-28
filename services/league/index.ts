import { sql } from "@vercel/postgres"
import { League } from "../lib/definitions"

const fetchSelectLeagueData = async () => {
    try {
        const leaguesPromise = await sql<League>`SELECT id, name FROM leagues;`
    
        const data = await Promise.all([leaguesPromise])
        const leagues = data[0].rows ?? 'No leagues in database'
        return {
          leagues,
        }
      } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch selectLeague data.')
      }
}

export const leagueServices = {
    fetchSelectLeagueData,
  }
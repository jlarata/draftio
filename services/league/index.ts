import { sql } from "@vercel/postgres"
import { League, LeagueJoinTournament, LeagueWithTournaments, Tournament } from "../lib/definitions"

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

const fetchLeaguesWithTournamentsByUserEmail = async (user_email: string) => {

  /* so, we probably should have a simpler method of fetching leagues
  this is a more complex method that returns an array of a version of the object league
   that has the tournaments associated and also the champion name (so, 3 querys just for presenting the
   dash/leagues component )

   OR i could use this same query for the tournaments component. it took some work but now is very 
   complete.

  */

  try {
    const { rows: leaguesPromise } = await sql<LeagueJoinTournament>`
SELECT
  l.id AS id, l.name AS name, t.id AS tournament_id,
  t.name AS tournament_name, t.date AS tournament_date, t.champion_id AS tournament_champion_id,
  p.username AS tournament_champion_name
FROM
  league l
LEFT JOIN
  tournament t
ON
 t.league_id = l.id
LEFT JOIN
  player p
ON
  t.champion_id = p.id
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
    const leaguesJoinedWithTournaments = leaguesPromise ?? 'No leagues in database'
    //console.log(leaguesJoinedWithTournaments)

    const arrayOfLeaguesWithTournaments = createLeaguesWithTournamentArray(leaguesJoinedWithTournaments)

    return {
      arrayOfLeaguesWithTournaments: arrayOfLeaguesWithTournaments,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch selectLeague data.')
  }
}

const createLeaguesWithTournamentArray = (leaguesJoinedWithTournaments: LeagueJoinTournament[]) => {
  const arrayOfLeaguesWithTournaments: LeagueWithTournaments[] = [];
  leaguesJoinedWithTournaments.map((league, i) => {
    if (arrayOfLeaguesWithTournaments.some(e => e.id == league.id)) {
      const index = arrayOfLeaguesWithTournaments.map(f => f.id).indexOf(league.id);

      if (league.tournament_id != null) {
        const newTournament: Tournament = {
          league_id: league.id,
          id: league.tournament_id,
          name: league.tournament_name,
          date: league.tournament_date,
          champion_id: league.tournament_champion_id,
          champion_name: league.tournament_champion_name
        }
        arrayOfLeaguesWithTournaments[index].tournaments.push(newTournament);
      }
    }
    else {
      const newLeagueWithTournaments: LeagueWithTournaments = {
        id: league.id,
        name: league.name,
        tournaments: []
      }
      if (league.tournament_id != null) {
        const newTournament: Tournament = {
          league_id: league.id,
          id: league.tournament_id,
          name: league.tournament_name,
          date: league.tournament_date,
          champion_id: league.tournament_champion_id,
          champion_name: league.tournament_champion_name
        }
        newLeagueWithTournaments.tournaments.push(newTournament);
      }
      arrayOfLeaguesWithTournaments.push(newLeagueWithTournaments);
    }
  })
  //console.log(arrayOfLeaguesWithTournaments)
  return arrayOfLeaguesWithTournaments
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


    const leagueName: string = leaguesPromise[0].name

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
  fetchLeaguesWithTournamentsByUserEmail,
}
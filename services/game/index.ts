import { sql } from '@vercel/postgres'
import { GameJoinedWith2Players, LatestGames } from '../lib/definitions'
import { unstable_noStore as noStore } from 'next/cache';


const fetchLatestGames = async () =>  {
    noStore();
    try {
      const { rows: latestGames } = await sql<LatestGames>`
      SELECT
      l.name AS league_name,
      t.name AS tournament_name,
      TO_CHAR(t.date, 'dd/mm/yyyy') AS date,
      pg.game_id,
      p.username as Player,
      pg.wins,
      g.round
  
      from game g
      INNER JOIN
      player_game pg
      ON pg.game_id = g.id
      INNER JOIN
      player p
      on pg.player_id = p.id
      INNER JOIN
      tournament t
      on g.tournament_id = t.id
      INNER JOIN
      league l
      on t.league_id = l.id
  
      ORDER BY
      g.id
  
      limit 40;
      `
  
      /* transforms the query results (with two rows each game)
      in a new array with player 1 and player 2 and only one row for game */
  
      let latestGamesJoinedWith2Players: GameJoinedWith2Players[] = []
      let currentGameIndex = 0
      let currentGameJoinedIndex = 0
      let currentGameId = ''
  
      /* this map replaces the commented for loop ahead. apparently nailed at first attempt.  */
      
      latestGames.map((game) => {
        //console.log("testing game "+game.game_id);
        if (currentGameId === game.game_id) {
          //console.log("not new, updating wins and results");
          (latestGamesJoinedWith2Players[currentGameJoinedIndex].player2 = game.player),
          (latestGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins = game.wins),

          latestGamesJoinedWith2Players[currentGameJoinedIndex].player1Wins >
          latestGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins
              ? (latestGamesJoinedWith2Players[currentGameJoinedIndex].result = 1)
              : latestGamesJoinedWith2Players[currentGameJoinedIndex].player1Wins <
                latestGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins
              ? (latestGamesJoinedWith2Players[currentGameJoinedIndex].result = 2)
              : null,
            currentGameJoinedIndex++
        } else {
          //console.log("new game, pushing to the array");
          currentGameId = game.game_id;
          const newGame: GameJoinedWith2Players = {
            league_name: game.league_name,
            tournament_name: game.tournament_name,
            date: game.date,
            game_id: game.game_id,
            player1: game.player,
            player1Wins: game.wins,
            player2: 'string',
            player2Wins: 0,
            result: 0,
            round: game.round,
          }
          latestGamesJoinedWith2Players.push(newGame)
          currentGameIndex++
        }      
      });    
      //console.log(latestGamesJoinedWith2Players.length+" games with 2 players and "+latestGames.length+" games originally fetched");
      return latestGamesJoinedWith2Players
    } catch (error) {
      console.error('Database Error:', error)
      throw new Error('Failed to fetch the latest games.')
    }
  }



export const gameServices = {
  fetchLatestGames,
}

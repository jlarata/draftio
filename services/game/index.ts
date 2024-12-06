import { sql } from '@vercel/postgres'
import { GameJoinedWith2Players, GamesTable, LatestGames } from '../lib/definitions'
import { unstable_noStore } from 'next/cache';
import { gamesByDate } from '../lib/utils';


const fetchLatestGames = async () =>  {
  //unstable_noStore()
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

  const fetchGameById = async (game_id : string) => {
    try {
      /* console.log("trying to fetch "+game_id); */
      const { rows: twoPlayer_Game }  = await sql<GamesTable>`

      SELECT
        l.name AS league_name,
        t.name AS tournament_name,
        TO_CHAR(t.date, 'dd/mm/yyyy') AS date,
        pg.game_id,
        p.username as Player,
        pg.wins,
        g.round
      FROM
        game g
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
      
      WHERE
        pg.game_id
      IN
      (SELECT pg.game_id
        FROM
          game g
        INNER JOIN
          player_game pg
        ON
          pg.game_id = g.id
        INNER JOIN
          player p
        ON
          pg.player_id = p.id

      WHERE
          g.id = ${game_id})

        ORDER BY
        g.id`
  
    /* console.log("fetched: "+twoPlayer_Game); */
    let gameResult : 0 | 1 | 2 = 0;
    twoPlayer_Game[0].wins > twoPlayer_Game[1].wins ?
      gameResult = 1 : 
      twoPlayer_Game[0].wins < twoPlayer_Game[1].wins ?
      gameResult = 2
    : null;

    let oneGameJoinedWith2Players: GameJoinedWith2Players = {
      league_name : twoPlayer_Game[0].league_name,
      tournament_name : twoPlayer_Game[0].tournament_name,
      date : twoPlayer_Game[0].date,
      game_id : twoPlayer_Game[0].game_id,
      player1: twoPlayer_Game[0].player,
      player1Wins : twoPlayer_Game[0].wins,
      player2 : twoPlayer_Game[1].player,
      player2Wins : twoPlayer_Game[1].wins,
      result : gameResult,
      round : twoPlayer_Game[0].round,
    }

    //console.log(oneGameJoinedWith2Players)  
              
      return oneGameJoinedWith2Players;
    } catch (error) {
      throw new Error(`Failed to fetch game id ${game_id}`)
    }
  }

  const ITEMS_PER_PAGE = 6

  const fetchFilteredGames = async (query:string, currentPage:number) => {
    //unstable_noStore()
    const offset = (currentPage - 1) * (ITEMS_PER_PAGE * 2)
    //console.log("current page: "+currentPage+" items per page: "+ITEMS_PER_PAGE+" offset: "+ offset);

    try {
      const { rows: filteredGames }  = await sql<GamesTable>`

      SELECT
        l.name AS league_name,
        t.name AS tournament_name,
        TO_CHAR(t.date, 'dd/mm/yyyy') AS date,
        pg.game_id,
        p.username as Player,
        pg.wins,
        g.round
      FROM
        game g
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
      WHERE
        pg.game_id
      IN
      (SELECT pg.game_id
        FROM
          game g
        INNER JOIN
          player_game pg
        ON
          pg.game_id = g.id
        INNER JOIN
          player p
        ON
          pg.player_id = p.id

      WHERE
          g.id = pg.game_id AND pg.player_id = p.id AND p.username ILIKE ${`%${query}%`})

      ORDER BY
        g.id

      LIMIT ${ITEMS_PER_PAGE * 2} OFFSET ${offset};
    `
      //console.log(filteredGames);

      /* transforms the query results (with two rows each game)
      in a new array with player 1 and player 2 and only one row for game */
      
      //console.log(games);
      let allGamesJoinedWith2Players: GameJoinedWith2Players[] = []
      let currentGameIndex = 0
      let currentGameJoinedIndex = 0
      let currentGameId = ''

      //filteredGames.sort(gamesByDate)

      filteredGames.map((game) => {
        if (currentGameIndex < 13) {
          //console.log("analizing game: "+ game.game_id);
        if (currentGameId === game.game_id) {
          //console.log("game is old, updating");
          allGamesJoinedWith2Players[currentGameJoinedIndex].player2 = game.player
          allGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins = game.wins
  
          allGamesJoinedWith2Players[currentGameJoinedIndex].player1Wins >
          allGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins
            ? (allGamesJoinedWith2Players[currentGameJoinedIndex].result = 1)
            : allGamesJoinedWith2Players[currentGameJoinedIndex].player1Wins <
              allGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins
            ? (allGamesJoinedWith2Players[currentGameJoinedIndex].result = 2)
            : null
          currentGameJoinedIndex++
        } else {
          //console.log("game is new, creating one");
          currentGameId = game.game_id
  
          let newGame: GameJoinedWith2Players = {
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
          allGamesJoinedWith2Players.push(newGame)
          //console.log("allGamesJoinedWith2Players lenght: "+allGamesJoinedWith2Players.length)
        }
        currentGameIndex++
        }})
              
      //console.log(allGamesJoinedWith2Players)

      allGamesJoinedWith2Players.sort(gamesByDate);
      //console.log(filteredGames.length, allGamesJoinedWith2Players.length);
      return allGamesJoinedWith2Players
    } catch (error) {
      //console.error('Database Error:', error)
      throw new Error('Failed to fetch games.')
    }
}

const fetchGamesPages = async (query: string) => {
  //unstable_noStore()
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM game g
      INNER JOIN
        player_game pg
        ON pg.game_id = g.id
        INNER JOIN
        player p
        on pg.player_id = p.id
        INNER JOIN
        tournament t
        ON (g.tournament_id = t.id)
        INNER JOIN
        league l
        ON (t.league_id = l.id)
      WHERE
        (SELECT p.username FROM player p WHERE p.id = pg.player_id) ILIKE ${`%${query}%`};
  `
    const totalPages = Math.ceil(Number(count.rows[0].count) / (ITEMS_PER_PAGE * 2))
    //console.log("páginas: " +totalPages)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of pages.')
  }
}

export const gameServices = {
  fetchLatestGames,
  fetchGameById,
  fetchFilteredGames,
  fetchGamesPages
}

import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import {
  GameJoinedWith2Players,
  GamesTable,
  } from './definitions'
import { gamesByDate } from './utils'

/* Old Methods: to be deleted soon: */

/* export async function fetchGames() {
  // noStore();
  try {
    const { rows: games } = await sql<Game>`SELECT * FROM games`

    //console.log(data.rows)
    return games
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch games data.')
  }
}

export async function fetchTournaments() {
  // noStore();
  try {
    const data = await sql<Tournament>`SELECT * FROM tournaments`
    //console.log(data.rows);
    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch tournaments data.')
  }
} */

export async function fetchCardData() {
  noStore()
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

const ITEMS_PER_PAGE = 6
export async function fetchFilteredGames(query: string, currentPage: number) {
  noStore()
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
        if (currentGameIndex < 7) {
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
        }
      })        
    

    

    //console.log(allGamesJoinedWith2Players)

    allGamesJoinedWith2Players.sort(gamesByDate);
    //console.log(filteredGames.length, allGamesJoinedWith2Players.length);
    return allGamesJoinedWith2Players
  } catch (error) {
    //console.error('Database Error:', error)
    throw new Error('Failed to fetch games.')
  }
}

export async function fetchGamesPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
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

/* export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
} */

/* export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
} */

/* export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
} */

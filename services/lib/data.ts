import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import {
  Game,
  GameAxis,
  GameJoinedWith2Players,
  GamesTable,
  LatestGames,
  League,
  Player,
  Tournament,
  TournamentAxis,
  TournamentForCreateQuery,
} from './definitions'
import { gamesByDate } from './utils'

export async function fetchGamesAndTournamentsForChart() {
  // noStore();
  try {
    const gamesDataPromise = await sql<GameAxis>`SELECT * FROM game`
    const tournamentsDataPromise = await sql<TournamentAxis>`SELECT * FROM tournament`

    const [games, tournament] = await Promise.all([gamesDataPromise, tournamentsDataPromise])

    return {
      games: games.rows,
      tournaments: tournament.rows,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch games and tournaments data.')
  }
}

// export async function fetchSelectTournamentData() {
//   try {
//     const data = await sql<TournamentForCreateQuery>`
//     SELECT id, name, TO_CHAR(t.date, 'dd/mm/yyyy') AS date
//     FROM
//     tournaments t;
//     `;

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch tournaments.');
//   }
// }

export async function fetchSelectLeagueData() {
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

export async function fetchPlayersByLeague(leagueId: string) {
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

export async function fetchCreateGameData() {
  // noStore();
  try {
    const playersPromise = await sql<Player>`SELECT id, nick FROM players;`
    const tournamentsPromise =
      await sql<TournamentForCreateQuery>`SELECT id, name, TO_CHAR(t.date, 'dd/mm/yyyy') AS date FROM tournaments t;`
    const leaguesPromise = await sql<League>`SELECT id, name FROM leagues;`

    const data = await Promise.all([playersPromise, tournamentsPromise, leaguesPromise])

    const players = data[0].rows ?? 'No players in database'
    const tournaments = data[1].rows ?? 'No tournaments in database'
    const leagues = data[2].rows ?? 'No leagues in database'

    return {
      players,
      tournaments,
      leagues,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch createGame data.')
  }
}

export async function fetchGames() {
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

const JlaRata = {
  campeonAnos: [
    { ano: 2019, campeon: 'JLA' },
    { ano: 2020, campeon: 'JLA' },
  ],
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
}

export async function fetchLatestGames() {
  // noStore();
  try {
    const { rows: latestGames } = await sql<LatestGames>`
    SELECT
    l.name AS league_name,
    t.name AS tournament_name,
    TO_CHAR(t.date, 'dd/mm/yyyy') AS date,
    pg.game_id,
    p.username as Player,
    pg.wins

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
      currentGameId === game.game_id
        ? ((latestGamesJoinedWith2Players[currentGameJoinedIndex].player2 = game.player),
          (latestGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins = game.wins),
          latestGamesJoinedWith2Players[currentGameJoinedIndex].player1Wins >
          latestGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins
            ? (latestGamesJoinedWith2Players[currentGameJoinedIndex].result = 1)
            : latestGamesJoinedWith2Players[currentGameJoinedIndex].player1Wins <
              latestGamesJoinedWith2Players[currentGameJoinedIndex].player2Wins
            ? (latestGamesJoinedWith2Players[currentGameJoinedIndex].result = 2)
            : null,
          currentGameJoinedIndex++)
        : (currentGameId = game.game_id)
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
      latestGamesJoinedWith2Players.push(newGame)
      currentGameIndex++
    })

    return latestGamesJoinedWith2Players
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest games.')
  }
}

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

/* export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
} */

// LA ANTERIOR QUERY DE INVOICES TableCellsIcon
// SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

const ITEMS_PER_PAGE = 6

export async function fetchFilteredGames(query: string, currentPage: number) {
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
    })

    //console.log(allGamesJoinedWith2Players)

    allGamesJoinedWith2Players.sort(gamesByDate)
    return allGamesJoinedWith2Players
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch games.')
  }
}

export async function fetchGamesPages(query: string) {
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

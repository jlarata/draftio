import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore} from 'next/cache';
import { formatCurrency } from './utils';
import { Game, Tournament } from './definitions';
import { Revenue, CustomersTableType, LatestGames, LatestInvoice, LatestInvoiceRaw, InvoiceForm, InvoicesTable, CustomerField } from './definitions';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchGamesAndTournaments() {
  noStore();
  try {
    const gamesDataPromise = await sql<Game>`SELECT * FROM games`;
    const tournamentsDataPromise = await sql<Tournament>`SELECT * FROM tournaments`;
  
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    // console.log('Fetching games and tournaments data...');
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await Promise.all([
      gamesDataPromise,
      tournamentsDataPromise,
    ]);

    // console.log('Data fetch completed after 2 seconds.');

    const games = data[0].rows;
    const tournaments = data[1].rows;

    return {
      games,
      tournaments
      }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch games and tournaments data.');
  }

}



export async function fetchGames() {
  noStore();
  try {
    const data = await sql<Game>`SELECT * FROM games`;

    //console.log(data.rows)
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch games data.');
  }
}

export async function fetchTournaments() {
  noStore();
  try {
    const data = await sql<Tournament>`SELECT * FROM tournaments`;
    //console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tournaments data.');
  }
}

export async function fetchLatestGames() {
  noStore();
  try {
    const data = await sql<LatestGames>`
      SELECT

g.id AS id, l.name AS league, t.name AS tournament,

TO_CHAR(t.date, 'dd/mm/yyyy') AS date,

(SELECT p.nick FROM players p WHERE p.id = g.player1)
AS Player1,

(SELECT p.nick FROM players p WHERE p.id = g.player2)
AS Player2,

CASE
WHEN g.match1 = '1' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player1)
WHEN g.match1 = '2' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player2)
WHEN g.match1 = '0' THEN 'Tie'
WHEN g.match1 = null THEN 'nope'
END AS Match1,

CASE
WHEN g.match2 = '1' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player1)
WHEN g.match2 = '2' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player2)
WHEN g.match2 = '0' THEN 'Tie'
WHEN g.match2 = null THEN 'nope'
END AS Match2,

CASE
WHEN g.match3 = '1' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player1)
WHEN g.match3 = '2' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player2)
WHEN g.match3 = '0' THEN 'Tie'
WHEN g.match3 = null THEN 'nope'
END AS Match3,


CASE
WHEN g.result = '1' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player1)
WHEN g.result = '2' THEN
(SELECT p.nick FROM players p WHERE p.id = g.player2)
WHEN g.result = '0' THEN 'Tie'
WHEN g.result = null THEN 'nope'
END AS Result

FROM games g
INNER JOIN
players p
ON (g.player1 = p.id)
INNER JOIN
tournaments t
ON (g.tournamentid = t.id)
INNER JOIN
leagues l
ON (t.leagueid = l.id)

ORDER BY
t.date DESC

limit 10;`;

    const latestGames = data.rows;
    //console.log(data.rows);
    return latestGames;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest games.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    //const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    //const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const gamesCountPromise = sql`SELECT COUNT(*) FROM games`;
    const playersCountPromise = sql`SELECT COUNT(*) FROM players`;
    const leaguesCountPromise = sql`SELECT COUNT(*) FROM leagues`;
    const tournamentsCountPromise = sql`SELECT COUNT(*) FROM tournaments`;

    //const invoiceStatusPromise = sql`SELECT
    //     SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //     SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //     FROM invoices`;

    const data = await Promise.all([
      gamesCountPromise,
      playersCountPromise,
      leaguesCountPromise,
      tournamentsCountPromise
    ]);

    const numberOfGames = Number(data[0].rows[0].count ?? '0');
    const numberOfPlayers = Number(data[1].rows[0].count ?? '0');
    const numberOfLeagues = Number(data[2].rows[0].count ?? '0');
    const numberOfTournaments = Number(data[3].rows[0].count ?? '0');

    //const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    //const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    //const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    //const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfGames,
      numberOfPlayers,
      numberOfLeagues,
      numberOfTournaments,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
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

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
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
}

export async function fetchCustomers() {
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
}

export async function fetchFilteredCustomers(query: string) {
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
}
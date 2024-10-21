export type Player = 
    {
        id : string,
        nick : string,
        password : string
    }

export type League =
    {
        id : string,
        name : string,
        password : string
    }

export type Tournament =
    {
        id : string,
        leagueid : string,
        championid: string | null,
        date: Date,
        name : string
    }

export type Game = 
    {
        id : string,
        tournamentid : string,
        player1 : string,
        player2 : string,
        match1 : 0 | 1 | 2 | null,
        match2 : 0 | 1 | 2 | null,
        match3 : 0 | 1 | 2 | null,
        result : 0 | 1 | 2 | null,
    }

export type LatestGames = {
  id: string;
  league: string;
  tournament: string;
  date: string;
  player1: string;
  player2: string;
  match1 : 0 | 1 | 2 | null,
  match2 : 0 | 1 | 2 | null,
  match3 : 0 | 1 | 2 | null,
  result : 0 | 1 | 2 | null,
};

//eliminar todas estas luego
export type Revenue = {
    month: string;
    revenue: number;
    };

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
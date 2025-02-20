import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, leagues, tournaments, games, player_games, league_players, players } from '../../services/lib/placeholder-data';

const client = await db.connect();

/* async function SeedPlayers() {
   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
   await client.sql`
     CREATE TABLE IF NOT EXISTS player (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       username VARCHAR(255) NOT NULL
     );
   `;
   console.log('player table created');

   const insertedPlayers = await Promise.all(
     players.map(async (player) => {
      return client.sql`
         INSERT INTO player (id, username)
         VALUES (${player.id}, ${player.username})
         ON CONFLICT (id) DO NOTHING;
       `;
     }),
   );
   return insertedPlayers;
 }

 async function SeedUsers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS p_user (
      email VARCHAR(255) PRIMARY KEY,
      player_id UUID,
      name VARCHAR(255) NOT NULL,
      password TEXT NOT NULL
    );
  `;
  console.log('p_user table created');

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
     const hashedPassword = await bcrypt.hash(user.password, 10);
     return client.sql`
        INSERT INTO p_user (email, player_id, name, password)
        VALUES (${user.email}, ${user.player_id}, ${user.name}, ${hashedPassword})
        `;
        
    }),
  );
  return insertedUsers;
}

async function SeedLeagues() {
   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

   await client.sql`
     CREATE TABLE IF NOT EXISTS league (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );
   `;
   console.log('league table created');

   const insertedLeagues = await Promise.all(
     leagues.map(async (league) => {
      return client.sql`
         INSERT INTO league (id, name)
         VALUES (${league.id}, ${league.name})
         ON CONFLICT (id) DO NOTHING;
       `
      })
     );
     return insertedLeagues;
 }

async function SeedTournaments() {
   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
   await client.sql`
     CREATE TABLE IF NOT EXISTS tournament (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      seed VARCHAR(255),
      name VARCHAR(255) NOT NULL,
      league_id UUID NOT NULL REFERENCES league (id) ON DELETE CASCADE,
      champion_id UUID REFERENCES player (id) ON DELETE CASCADE,
      date DATE NOT NULL
     );
   `;

   console.log('tournament table created');

   const insertedTournaments = await Promise.all(
     tournaments.map(
       (tournament) => client.sql`
         INSERT INTO tournament (id, name, league_id, champion_id, date)
         VALUES (${tournament.id}, ${tournament.name}, ${tournament.league_id}, ${tournament.champion_id}, ${tournament.date})
         ON CONFLICT (id) DO NOTHING;
       `,
     ),
   );

   return insertedTournaments;
 }

async function SeedGames() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS game (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tournament_id UUID NOT NULL REFERENCES tournament (id) ON DELETE CASCADE,
    round SMALLINT NOT NULL
     );
   `; 

   console.log('game table created');
   
  const insertedGames = await Promise.all(
     games.map(
       (game) => client.sql`
         INSERT INTO game (id, tournament_id, round)
         VALUES (${game.id}, ${game.tournament_id}, ${game.round})
         ON CONFLICT (id) DO NOTHING;
       `,
     ),
   );
  
   return insertedGames;
 }

 async function seedChampions() {

  const updatedChampions = await client.sql`
    UPDATE tournament
    SET champion_id = '00000000-0000-0000-0000-000000000103'
    WHERE id = '00000000-0000-0000-0000-000000000300';
    `;

  console.log('champions setted');
   return updatedChampions;
 }

 async function SeedPlayer_Games() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS player_game (
    player_id UUID REFERENCES player (id) ON DELETE CASCADE,
    game_id UUID REFERENCES game (id) ON DELETE CASCADE,
    wins SMALLINT NOT NULL,
    PRIMARY KEY (player_id, game_id)
     );
   `; 

   console.log('player_game table created');
   
  const insertedPlayers_Games = await Promise.all(
     player_games.map(
       (player_game) => client.sql`
         INSERT INTO player_game (player_id, game_id, wins)
         VALUES (${player_game.player_id}, ${player_game.game_id}, ${player_game.wins})
       `,
     ),
   ); 
   return insertedPlayers_Games;
 }

 async function SeedLeague_Players() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  console.log('creating ENUM role')
  await client.sql`DROP TYPE IF EXISTS p_role;`;
  await client.sql`CREATE TYPE p_role AS ENUM ('player', 'admin', 'other');`;
  console.log('creating the table with the enum')
  await client.sql`
    CREATE TABLE IF NOT EXISTS league_player (
    league_id UUID NOT NULL REFERENCES league (id) ON DELETE CASCADE,
    player_id UUID NOT NULL REFERENCES player (id) ON DELETE CASCADE,
    player_role p_role DEFAULT 'player',
    PRIMARY KEY (league_id, player_id)
     );
   `; 

  console.log('league_player table created');
   
  const insertedLeague_Players = await Promise.all(
     league_players.map(
      //DEFAULT constraint of player_role is not working as it should. so i'll just constrain it from the backend
       (player_game) => {
        client.sql`
         INSERT INTO league_player (league_id, player_id, player_role)
         VALUES (${player_game.league_id}, ${player_game.player_id},
         ${player_game.player_role === "" ? 'player' : player_game.player_role})
       `
       }  
     ),
   );
   return insertedLeague_Players;
 }
 
 async function dropTables() { 
    
  console.log('dropping table player_game')
    await client.sql`
      drop TABLE IF EXISTS player_game;
      `;
    console.log('dropping table league_player')  
    await client.sql`
      drop TABLE IF EXISTS league_player;
      `;
    console.log('dropping table p_user')
    await client.sql`
      drop TABLE IF EXISTS p_user;
      `;
    console.log('dropping table game')  
    await client.sql`
      drop TABLE IF EXISTS game;
      `;  
    console.log('dropping table player')
    await client.sql`
      drop TABLE IF EXISTS player;
      `;
    console.log('dropping table tournament')
    await client.sql`
      drop TABLE IF EXISTS tournament;
      `; 
    console.log('dropping table league')
    await client.sql`
      drop TABLE IF EXISTS league;
      `;
    
    await client.sql`COMMIT`;
    console.log('7 tables dropped succesfully');
 }

export async function GET() {

   try {     
    await client.sql`BEGIN`;
     await dropTables()
     await SeedPlayers();   
     console.log('player table populated');  
     await SeedUsers();
     console.log('user table populated');  
     await SeedLeagues();
     console.log('league table populated');  
     await SeedTournaments();
     console.log('tournament table populated');  
     await SeedGames();
     console.log('game table populated');  
     await seedChampions();
     console.log('champion_id column of tournament resetted');  
     await SeedPlayer_Games();
     console.log('player_game table populated');  
     await SeedLeague_Players();
     console.log('league_player table populated');  
     await client.sql`COMMIT`; 
     
     return Response.json({ message: 'Database seeded successfully' });
   } catch (error) {
     await client.sql`ROLLBACK`;
     return Response.json({ error }, { status: 500 });
   }
}  */
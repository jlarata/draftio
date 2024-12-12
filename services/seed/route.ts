//import bcryptjs from 'bcryptjs';
import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { players, users, leagues, tournaments, games, player_games, league_players } from '../lib/placeholder-data';

const client = await db.connect();

async function SeedPlayers() {
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
      //const hashedPassword = await bcrypt.hash(player.password, 10);
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
   console.log('leagues table created');

   const insertedLeagues = await Promise.all(
     leagues.map(async (league) => {
      return client.sql`
         INSERT INTO leagues (id, name)
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
      name VARCHAR(255) NOT NULL,
      league_id UUID NOT NULL,
      champion_id UUID,
      date DATE NOT NULL
     );
   `;

   console.log('tournaments table created');

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
    tournament_id UUID NOT NULL,
    round TINYINT NOT NULL
     );
   `; 

   console.log('games  table created');
   
  const insertedGames = await Promise.all(
     games.map(
       (game) => client.sql`
         INSERT INTO game (id, tournamentid,round)
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
    player_id UUID PRIMARY KEY,
    game_id UUID PRIMARY KEY,
    wins TINYINT NOT NULL,
     );
   `; 

   console.log('player_game table created');
   
  const insertedPlayers_Games = await Promise.all(
     player_games.map(
       (player_game) => client.sql`
         INSERT INTO player_game (player_id, game_id, wins)
         VALUES (${player_game.player_id}, ${player_game.game_id}, ${player_game.wins})
         ON CONFLICT (player_id) DO NOTHING;
       `,
     ),
   ); 
   return insertedPlayers_Games;
 }

 async function SeedLeague_Players() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TYPE role as ENUM ('player', 'admin', 'other')`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS league_player (
    league_id UUID PRIMARY KEY,
    player_id UUID PRIMARY KEY,
    player_role role DEFAULT 'player'
     );
   `; 

   console.log('league_playertable created');
   
  const insertedLeague_Players = await Promise.all(
     league_players.map(
       (player_game) => client.sql`
         INSERT INTO player_game (player_id, game_id, wins)
         VALUES (${player_game.league_id}, ${player_game.player_id}, ${player_game.player_role})
         ON CONFLICT (league_id) DO NOTHING;
       `,
     ),
   );
   return insertedLeague_Players;
 }
 

 async function dropTables() { 
  console.log('dropping table 1')
    await client.sql`
      drop TABLE IF EXISTS player;
      `;
    console.log('dropping table 2')
    await client.sql`
      drop TABLE IF EXISTS p_user;
      `;
      console.log('dropping table 3')
    await client.sql`
      drop TABLE IF EXISTS tournament;
      `; 
      console.log('dropping table 4')
    await client.sql`
      drop TABLE IF EXISTS league;
      `;
    console.log('dropping table 5')  
    await client.sql`
      drop TABLE IF EXISTS game;
      `;  
      console.log('dropping table 6')
    await client.sql`
      drop TABLE IF EXISTS player_game;
      `;
      console.log('dropping table 7')  
    await client.sql`
      drop TABLE IF EXISTS league_player;
      `;
      console.log('dropping table 8')  
      await client.sql`COMMIT`;
      
    console.log('8 tables dropped succesfully');
 }

export async function GET() {
  /* return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  }); */
   try {     
    await client.sql`BEGIN`;
     await dropTables()
     await SeedPlayers();   
     console.log('players table populated');  
     await SeedUsers();
     console.log('users table populated');  

     await SeedLeagues();
     await SeedTournaments();
     await SeedGames();
     await seedChampions();
     await SeedPlayer_Games();
     await SeedLeague_Players();
     await client.sql`COMMIT`; 
     
     return Response.json({ message: 'Database seeded successfully' });
   } catch (error) {
     await client.sql`ROLLBACK`;
     return Response.json({ error }, { status: 500 });
   }
}
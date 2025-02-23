'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { User, uuid } from "./definitions";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prefetchDNS } from "react-dom";
import { read } from "fs";
import bcrypt from 'bcrypt';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Oh no i dont believe it, something went wrong';
      }
    }
    throw error;
  }
}

/* export async function getId(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
          default:
            return 'Oh no i dont believe it, something went wrong';
      }
    }
    throw error;
  }
} */

export async function updateGame(id: string, previousPlayer1: string, previousPlayer2: string, formData: FormData) {
  let { tournament_id, round, player1, player1Wins, player2, player2Wins } = ({
    tournament_id: formData.get('tournament_id') as string,
    round: parseInt(formData.get('round') as string),
    player1: formData.get('player1') as string,
    player1Wins: parseInt(formData.get('player1Wins') as string),
    player2: formData.get('player2') as string,
    player2Wins: parseInt(formData.get('player2Wins') as string),
  })

  try {
    //console.log("updating game. id: "+id+" tournament id: "+tournament_id+" round: "+round);
    await sql`
    UPDATE game
    SET tournament_id = ${tournament_id}, round = ${round}
    WHERE id = ${id};`

    // console.log("updating player_game player_id: "+previousPlayer1+" wins: "+player1Wins)

    await sql`
    UPDATE player_game
    SET player_id = ${player1}, wins = ${player1Wins}
    WHERE (player_id = ${previousPlayer1} AND game_id = ${id})`

    // console.log("updating player_game player_id: "+previousPlayer2+" wins: "+player2Wins)

    await sql`
    UPDATE player_game
    SET player_id = ${player2}, wins = ${player2Wins}
    WHERE (player_id = ${previousPlayer2} AND game_id = ${id})`



  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to edit game and player_game.')
  }

  revalidatePath('/dashboard/games');
  redirect('/dashboard/games?gameedited=ok');

}

export async function createGame(
  formData: FormData) {
  let rawFormData: {
    /*data for the new game record*/
    tournament_id: string,
    pre_round: string,
    round: number | null, // 0 to 8?


    /* data for the new player_game records
       game_id is generated in the create game query. */

    player1_id: string,
    pre_player1_wins: string,
    player1_wins: number | null,
    pre_player2_wins: string,
    player2_id: string,
    player2_wins: number | null,
    origin_url: string

  } = {
    tournament_id: formData.get('tournament_id') as string,
    pre_round: formData.get('round') as string,
    round: null,

    player1_id: formData.get('player1_id') as string,
    pre_player1_wins: formData.get('player1_wins') as string,

    player2_id: formData.get('player2_id') as string,
    pre_player2_wins: formData.get('player2_wins') as string,

    player1_wins: null,
    player2_wins: null,
    origin_url: formData.get('origin_url') as string,
  };
  formData.forEach((value, key) => console.log("en action formData", `${key}: ${value}`))

  console.log("rawfromData ", rawFormData);

  //parses matchs data
  if ((rawFormData.pre_round !== null)) {
    rawFormData.round = parseInt(formData.get('round') as string);
  }
  if ((rawFormData.pre_player1_wins !== null)) {
    rawFormData.player1_wins = parseInt(formData.get('player1_wins') as string);
  }
  if ((rawFormData.pre_player2_wins !== null)) {
    rawFormData.player2_wins = parseInt(formData.get('player2_wins') as string);
  }
  console.log("creating game");
  console.log(rawFormData);

  const { uuid } = await createGameAndReturnID(rawFormData.tournament_id, rawFormData.round);

  console.log(uuid)
  const this_game_id = uuid[0].id;
  console.log(this_game_id)

  await sql`
      INSERT INTO player_game (player_id, game_id, wins)
         VALUES (${rawFormData.player1_id}, ${this_game_id}, ${rawFormData.player1_wins});`
  await sql`
      INSERT INTO player_game (player_id, game_id, wins)
         VALUES (${rawFormData.player2_id}, ${this_game_id}, ${rawFormData.player2_wins});
    `;
  revalidatePath(`${rawFormData.origin_url}`);
  redirect(`${rawFormData.origin_url}?gamecreated=ok`)
}

const createGameAndReturnID = async (tournament_id: string, round: number | null) => {
  console.log("Entro a creategameReturnID")
  try {
    console.log("torneo: " + tournament_id + ", ronda: " + round)
    const { rows: uuid } = await sql<uuid>`INSERT INTO game (tournament_id, round)
      VALUES(${tournament_id}, ${round})
      RETURNING id;`;
    return {
      uuid: uuid
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to create game and return the uuid.')
  }
}

export async function deleteGame(id: string) {
  await sql`DELETE FROM game WHERE id = ${id}`;
  revalidatePath('/dashboard/games');
  redirect('/dashboard/games?gamedeleted=ok');
}



export async function createLeague(user_email: string, formData: FormData) {
  let rawFormData: {
    name: string,
  } = {
    name: formData.get('name') as string,
  };

  try {
    /*     console.log(`Creating league named ${rawFormData.name} for user id ${user_id}`) */
    const { rows: uuid } = await sql`INSERT INTO league (name)
      VALUES(${rawFormData.name})
      RETURNING id;`;

    let thisLeagueUUID = uuid[0].id;

    /* console.log(`Creating league_player table with league id = ${thisLeagueUUID}`) */
    await sql`INSERT INTO league_user (league_id, p_user_email, user_role)
        VALUES(${thisLeagueUUID}, ${user_email}, 'admin');`;
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to create league.')
  }
  redirect('/dashboard/leagues?leaguecreated=ok');
}

export async function updateLeague(id: string, formData: FormData) {
  let { name } = ({
    name: formData.get('name') as string,
  }) 
  try {
    await sql`
    UPDATE league
    SET name = ${name}
    WHERE id = ${id};`
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to edit league.')
  }

  revalidatePath('/dashboard/leagues');
  redirect('/dashboard/leagues?leagueedited=ok');
}

export async function deleteLeague(id: string) {
  /* do we even want this function? VERY dangerous */
  /* await sql`DELETE FROM league WHERE id = ${id}`; */
  console.log(`league ${id} would have been eliminated if this was enabled`)
  revalidatePath('/dashboard/leagues');
  redirect('/dashboard/leagues?leaguedeleted=ok');
}

export async function deletePlayer(id: string) {


  /* first: delete all games that are referenced in a player_game record */
  await sql`      
      DELETE FROM game
      WHERE game.id IN
         (
      SELECT
        game_id
      FROM
        player_game pg
      WHERE
      pg.player_id = ${id})
      `

  /* then delete the player: the CASCADE constraint will delete the player_game record*/
  await sql`DELETE FROM player WHERE id = ${id}`;
  revalidatePath('/dashboard/players');
  redirect('/dashboard/players?playerdeleted=ok');
}

export async function updateTournament(formData: FormData) {
  let { id, name,rawDate, champion, league } = ({
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    rawDate: formData.get('date') as string,
    champion: formData.get('champion') as string | null,
    league: formData.get('league') as string,
  }) 

  if (champion === "" ) { champion = null}
  let date = rawDate.toString()
  
  try {
    await sql`
    UPDATE tournament
    SET
     name = ${name},
     date = ${date},
     champion_id = ${champion},
     league_id = ${league}

    WHERE id = ${id};`
  }
  catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to edit tournament.')
  }


  revalidatePath('/dashboard/tournaments');
  redirect('/dashboard/tournaments?tournamentedited=ok');
}

export async function deleteTournament(id: string) {

  /* first: delete all games that references the tournament */
  await sql`      
    DELETE
    FROM game
    WHERE tournament_id = ${id}
    `
  /* then delete the tournament*/

  await sql`DELETE FROM tournament WHERE id = ${id}`;
  revalidatePath('/dashboard/tournament');
  redirect('/dashboard/tournaments?tournamentdeleted=ok');
}

export async function createPlayer(
  formData: FormData) {
  let rawFormData: {
    nickname: string,
    origin_url: string,
  } = {
    nickname: formData.get('nickname') as string,
    origin_url: formData.get('origin_url') as string,
  };
  //console.log(rawFormData); 
  console.log("creating player");
  console.log(rawFormData);

  await sql`
        INSERT INTO player (username)
           VALUES (${rawFormData.nickname});`;

  revalidatePath(`${rawFormData.origin_url}`);
  redirect(`${rawFormData.origin_url}?playercreated=ok`);
}

export async function createTournament(
  formData: FormData) {
  let rawFormData: {
    seed: string | null,
    name: string,
    league_id: string,
    champion_id: string | null,
    date: string | null,
    origin_url: string,
  } = {
    seed: formData.get('seed') as string,
    name: formData.get('name') as string,
    league_id: formData.get('league_id') as string,
    champion_id: formData.get('champion_id') as string,
    date: formData.get('date') as string,
    origin_url: formData.get('origin_url') as string,
  };

  if (rawFormData.seed === "") { rawFormData.seed = null }
  if (rawFormData.champion_id === "") { rawFormData.champion_id = null }

  await sql`
        INSERT INTO tournament (seed, name, league_id, champion_id, date)
          VALUES (${rawFormData.seed}, ${rawFormData.name}, ${rawFormData.league_id}, ${rawFormData.champion_id}, ${rawFormData.date});`;

  revalidatePath(`${rawFormData.origin_url}`);
  redirect(`${rawFormData.origin_url}?tournamentcreated=ok`);
}

export const redirectWithParams = async (params: string) => {
  console.log("redirecting?")
  const param = params;

  redirect(`/dashboard/games/create/${param}`);
}


export async function registerUser(formData : FormData) {
  
    let rawFormData: {
      email : string,
      nickname: string,
      password : string,
    } = {
      email: formData.get('email') as string,
      nickname: formData.get('nickname') as string,
      password: formData.get('password') as string,
    };

    const hashedPassword = await bcrypt.hash(rawFormData.password, 10)
  
    await sql`
        INSERT INTO p_user (email, name, password)
          VALUES (${rawFormData.email}, ${rawFormData.nickname}, ${hashedPassword});`;

  revalidatePath(`/`);
  redirect(`/`);
}


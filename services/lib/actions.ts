'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { uuid } from "./definitions";



export async function createGame(
  formData: FormData) {
    let rawFormData : {
      /*data for the new game record*/
      tournament_id : string,
      pre_round : string,
      round : number | null, // 0 to 8?

      /* data for the new player_game records
         game_id is generated in the create game query. */
      
      player1_id: string,
      pre_player1_wins: string,
      player1_wins: number | null,
      pre_player2_wins: string,
      player2_id: string,
      player2_wins: number | null,

    } = {
        tournament_id: formData.get('tournament_id') as string,
        pre_round: formData.get('round') as string,
        round : null,

        player1_id: formData.get('player1_id') as string,
        pre_player1_wins: formData.get('player1_wins') as string,
      
        player2_id: formData.get('player2_id') as string,
        pre_player2_wins: formData.get('player2_wins') as string,

        player1_wins: null, 
        player2_wins: null
      };
      //console.log(rawFormData); 

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

    revalidatePath('/dashboard/games');
    redirect('/dashboard/games?gamecreated=ok');
  }

  const createGameAndReturnID = async (tournament_id : string, round: number | null)  => {
    try {
      console.log("torneo: "+tournament_id+", ronda: "+round)
      const { rows : uuid } = await sql<uuid>`INSERT INTO game (tournament_id, round)
      VALUES(${tournament_id}, ${round})
      RETURNING id;`;
    return {
        uuid : uuid
      }
    } catch (error) {
      console.error('Database Error:', error)
      throw new Error('Failed to create game and return the uuid.')
    }
  }

  export const redirectWithParams = async (params : string) => {
    console.log("redirecting?")
    const param = params;

    redirect(`/dashboard/games/create/${param}`);
  }

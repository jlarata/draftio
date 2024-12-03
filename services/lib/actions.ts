'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { uuid, uuidField } from "./definitions";
import { unstable_noStore as noStore } from 'next/cache'



/* reformular create game:

  1) crear un game, a) con una nueva id, b) asociado a un tournament id, c) con un n° de round
  no es necesario validar la tournament id xq va a ser preseleccionada en el front

  2) crear dos nuevo player_game a) ambos asociados a un game_id b) cada uno asociado a un player_id c) con wins igual a 0, 1 o 2.
*/

export async function createGame(
  formData: FormData) {
    noStore()
    let rawFormData : {
      /*data for the new game record*/
      tournament_id : string,
      pre_round : string,
      round : number | null, // 0 to 8?

      /*data for the new player_game records*/
      /* game_id <- Este surge del Post game. */
      
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

/*       const returnRandomUUID = async ()  => {
        try {
          const { rows : uuid } = await sql<uuid>`select gen_random_uuid();`;
        return {
            uuid : uuid
          }
        } catch (error) {
          console.error('Database Error:', error)
          throw new Error('Failed to return a random uuid.')
        }
      } */

      const { uuid } = await createGameAndReturnID(rawFormData.tournament_id, rawFormData.round);

      console.log(uuid)
      const this_game_id = uuid[0].id;
      console.log(this_game_id)

 
     /*  await sql`
      INSERT INTO game (tournament_id, round)
      VALUES(${rawFormData.tournament_id}, ${rawFormData.round})
      RETURNUNG id;` */
      
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
    noStore()
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


/* export async function createGame(
  formData: FormData) {
    let rawFormData : {
      leagueid : string,
      tournamentid : string,
      player1id: string,
      player2id: string,
      prematch1: string,
      prematch2: string,
      prematch3: string,
      match1: number | null,
      match2: number | null,
      match3: number | null,

    } = {
        leagueid: formData.get('leagueid') as string,
        tournamentid: formData.get('tournamentid') as string,
        player1id: formData.get('player1id') as string,
        player2id: formData.get('player2id') as string,
        prematch1: formData.get('match1') as string,
        prematch2: formData.get('match2') as string,
        prematch3: formData.get('match3') as string,
        match1: null, 
        match2: null, 
        match3: null, 
      };
      //console.log(rawFormData); 

      //parses matchs data
      if ((rawFormData.prematch1 !== null)) { 
        rawFormData.match1 = parseInt(formData.get('match1') as string);
       }
      if ((rawFormData.prematch2 !== null)) { 
      rawFormData.match2 = parseInt(formData.get('match2') as string);
      }
      if ((rawFormData.prematch3 !== null)) { 
        rawFormData.match3 = parseInt(formData.get('match3') as string);
      }  */
      
      
  //     this conditionals are not needded anymore. 
  //      different playerid is now handled at the front with a disable={p1=p2}
  //      mandatory m1 to select m2, etc */
       
  //     /* if ((rawFormData.player1id) && (rawFormData.player1id === rawFormData.player2id))
  //      { 
  //       const samePlayerErrorURL = "/dashboard/games/create?leagueid="+rawFormData.leagueid+"&tournamentid="+rawFormData.tournamentid+"&player1id="+rawFormData.player1id
  //       redirect(samePlayerErrorURL);        
  //      }
  //     else
  //     if (rawFormData.match2 && (!rawFormData.match1)) {
  //       return console.log("A game cannot have match 2 if does not have match 1")
  //     } else 
  //     if (rawFormData.match3 && ((!rawFormData.match2) || (!rawFormData.match1))) {
  //       return console.log("A game cannot have match 3 if does not have match 1 and 2")
  //     } 
      
  //     const result : number | null = 0;
  //     console.log("creating game");
  //     console.log(rawFormData);

  //     await sql`
  //     INSERT INTO games (tournamentid, player1, player2, match1, match2, match3, result)
  //        VALUES (${rawFormData.tournamentid}, ${rawFormData.player1id}, ${rawFormData.player2id}, ${rawFormData.match1}, ${rawFormData.match2}, ${rawFormData.match3}, ${result});
  //   `;


  //   revalidatePath('/dashboard/games');
  //   redirect('/dashboard/games?gamecreated=ok');
  // }


/* not need it anymore?

export async function selectLeague(formData: FormData) {
  let rawFormData : {
    leagueid : string,
  } = {
      leagueid: formData.get('leagueid') as string,
    };

    console.log(rawFormData);
    const leagueId = rawFormData.leagueid;

  // revalidatePath('/dashboard/games/create');
  //redirect(`/dashboard/games/createStep2?league=${rawFormData.leagueid}`);

} */

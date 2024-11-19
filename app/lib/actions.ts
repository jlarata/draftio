'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export async function createGame(formData: FormData) {
    let rawFormData : {
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
        //leagueid: formData.get('leagueid'),
        tournamentid: formData.get('tournamentid') as string,
        player1id: formData.get('player1id') as string,
        player2id: formData.get('player2id') as string,
        prematch1: formData.get('match1') as string,
        prematch2: formData.get('match2') as string,
        prematch3: formData.get('match3') as string,
        match1: null, 
        match2: null, 
        match3: null, 
        // amount: formData.get('amount'),
        // status: formData.get('status'),
      };
      if ((rawFormData.prematch1 !== null)) { 
        rawFormData.match1 = parseInt(formData.get('match1') as string);
       }
      if ((rawFormData.prematch2 !== null)) { 
      rawFormData.match2 = parseInt(formData.get('match2') as string);
      }
      if ((rawFormData.prematch3 !== null)) { 
        rawFormData.match3 = parseInt(formData.get('match3') as string);
       } 

      if ((rawFormData.player1id) && (rawFormData.player1id === rawFormData.player2id))
        { return console.log("Anyone who plays against themself is a sure looser..") }
      else
      if (rawFormData.match2 && (!rawFormData.match1)) {
        return console.log("A game cannot have match 2 if does not have match 1")
      } else 
      if (rawFormData.match3 && ((!rawFormData.match2) || (!rawFormData.match1))) {
        return console.log("A game cannot have match 3 if does not have match 1 and 2")
      } else {
      const result : number | null = 0;

      console.log(rawFormData);

      await sql`
      INSERT INTO games (tournamentid, player1, player2, match1, match2, match3, result)
         VALUES (${rawFormData.tournamentid}, ${rawFormData.player1id}, ${rawFormData.player2id}, ${rawFormData.match1}, ${rawFormData.match2}, ${rawFormData.match3}, ${result});
    `;

    revalidatePath('/dashboard/games');
    redirect('/dashboard/games');
  }
}

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

}

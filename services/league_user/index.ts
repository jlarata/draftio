'use server';

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { UserField } from "../lib/definitions";



export async function addModToLeague (formData: FormData) {
    let rawFormData: {
      league_id: string,
      mod_user_email: string,
      origin_url: string,
    } = {
      league_id : formData.get('league_id') as string,
      mod_user_email: formData.get('mod_user_email') as string,
      origin_url : formData.get('origin_url') as string,
    };

    let userCount= 0;
    let league_userCount= 0;
  try {

    console.log("starting action addModToLeague. user email: "+rawFormData.mod_user_email+", league_id: "+rawFormData.league_id);
    console.log("wil redirect to "+rawFormData.origin_url)

    const aCount = await sql`
        SELECT COUNT(*)
        FROM
            p_user u
        WHERE
            u.email = ${rawFormData.mod_user_email}
        `
        userCount = aCount.rows[0].count
    
    const bCount = await sql`
        SELECT COUNT(*)
        FROM
            league_user lu
        WHERE
            lu.p_user_email = ${rawFormData.mod_user_email}
        AND lu.league_id = ${rawFormData.league_id}
        `
        league_userCount = bCount.rows[0].count
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to add Mod to league .')
  } finally {
    if (userCount == 0) {
        //non existing user
        revalidatePath(`${rawFormData.origin_url}`);
        redirect(`${rawFormData.origin_url}?modNotFound=ok`)
    } else if (league_userCount == 1 ) {
        //already existing user_league register
        revalidatePath(`${rawFormData.origin_url}`);
        redirect(`${rawFormData.origin_url}?existentLeagueUser=ok`)
    }
  }
}

/* await sql`
          INSERT INTO league_user (league_id, p_user_email, user_role)
             VALUES (${rawFormData.league_id}, ${rawFormData.mod_user_email}, 'mod');
        `;
      revalidatePath(`${rawFormData.origin_url}`);
      redirect(`${rawFormData.origin_url}?modAdded=ok`) */
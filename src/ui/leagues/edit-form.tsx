'use client';

import { LeagueMod, Player,Tournament } from '@/services/lib/definitions';
import {
  ClipboardIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { useState } from 'react';
import { updateLeague } from '@/services/lib/actions';

export default function EditLeagueForm({
  league_id,
  league_name,
  players,
  tournaments,
  mods,
}: {
  league_id: string,
  league_name: string,
  players: Player[],
  tournaments: Tournament[],
  mods : LeagueMod[]
}) {

  /* not using this. but will be needed to prevent duplicate league name */
  const [leagueName, setLeagueName] = useState("");  

  const updateLeagueWithId = updateLeague.bind(null, league_id);

  /* console.log("tournaments", tournaments)
  console.log("players", players) */

  return (
    <form action={updateLeagueWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

          {/* League Name */}
          <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <input
              id="name"
              name="name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={league_name}
            >    
            </input>
              < ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {mods.map((mod, i) => (
          mod.role == 'admin' && mod.league_id == league_id ?
          <div key={i} className="text-xs italic font-thin">Admin:  
          <span>{" "+mod.admin_email}</span>
          </div> :
          
          null
        ))}
      
        {mods.some(e => e.role == "mod" && e.league_id == league_id) ?
        <div className="text-xs italic font-thin">mods: 
        {mods.map((mod, i) => (
          mod.role == 'mod' ? 
          <span>{" "+mod.admin_email+""}</span> :
          null
        ))}
        </div> : null
        }
          
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/leagues"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit League</Button>
      </div>
    </form>
  );
}

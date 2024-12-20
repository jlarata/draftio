'use client';

import { LeagueField } from "@/services/lib/definitions";
import { TableCellsIcon, TrophyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirectWithParams } from "@/services/lib/actions";


export default function SelectLeagueForm({
  leagues
}: {
  leagues: LeagueField[]
}) {

  const redirect = async (params : string) => {
    const fixUrl = "?league_id="+params;
    await redirectWithParams(fixUrl);
  }

  return (
    <form action="">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* League Name */}
        <div className="mb-4">
          <label htmlFor="player 1" className="mb-2 block text-sm font-medium">
            Choose League
          </label>
          <div className="relative">
            <select
              id="league_id"
              name="league_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={(e) => redirect(e.target.value)}
/*               onChange={(e) => setLeague_id(e.target.value)} */
              required
            >
              <option value="" disabled>
                Select league
              </option>
              {leagues.map((league, index) => (
                <option
                 key={league.id+index}
                 value={league.id}
                 >
                  {league.name}
                </option>
              ))}
            </select>
            <TableCellsIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/games"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        {/* <Button type="submit">Select League</Button> */}
      </div>
    </form>
  );
}

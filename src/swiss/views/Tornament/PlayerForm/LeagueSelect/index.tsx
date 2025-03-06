'use client';

import { LeagueField } from "@/services/lib/definitions";
import { TableCellsIcon, TrophyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirectWithParams } from "@/services/lib/actions";
import { useState } from "react";




export default function SelectLeagueSwiss({
  leagues,
  onLeagueChange
}: {
  leagues: LeagueField[],
  onLeagueChange: (leagueID: string) => void
}) 


{
  const [leagueID, setLeagueID] = useState<string>('')
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLeagueID = e.target.value;
    setLeagueID(selectedLeagueID);
    onLeagueChange(selectedLeagueID);
  };

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="league_id" className="mb-2 block text-sm font-medium">
            Choose League
          </label>
          <div className="relative">
            <select
              id="league_id"
              name="league_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>
                Select league
              </option>
              {leagues.map((league, index) => (
                <option key={league.id + index} value={league.id}>
                  {league.name}
                </option>
              ))}
            </select>
            <TableCellsIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
    </form>
  );
}

import { LeagueField, PlayerField, TournamentField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    TableCellsIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

export default function SelectLeagueForm(
    { leagues } :
    { leagues: LeagueField[] })
{

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
              id="leagueid"
              name="leagueid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select league
              </option>
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>
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
        <Button type="submit">Select League</Button>
      </div>
    </form>
  );
}

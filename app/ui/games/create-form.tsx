import { LeagueField, PlayerField, TournamentField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createGame } from '@/app/lib/actions';


export default function CreateForm(
    {leagueId, tournamentId, players } : {leagueId : string, tournamentId : string, players : PlayerField[]})
{
  return (
    <form action={createGame}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Player 1 Nick */}
        <div className="mb-4">
          <label htmlFor="player 1" className="mb-2 block text-sm font-medium">
            Choose Player 1
          </label>
          <div className="relative">
            <select
              id="player1id"
              name="player1id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
              // onChange={(option) => {
              //   setp1(option.target.value);
              // }} acá quise setear las opciones para winner pero no se puede al no ser client component
            >
              <option value="" disabled>
                Select a player
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.nick}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
  

        {/* Player 2 Nick */}
        <div className="mb-4">
          <label htmlFor="player 1" className="mb-2 block text-sm font-medium">
            Choose Player 2
          </label>
          <div className="relative">
            <select
              id="player2id"
              name="player2id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a player
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.nick}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Match 1 */}
        <div className="mb-4">
          <label htmlFor="match 1" className="mb-2 block text-sm font-medium">
            Match 1 result
          </label>
          <div className="relative">
            <select
              id="match1"
              name="match1"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a winner
              </option>      
              <option         
                value="1">Player 1
              </option>
              <option         
                value="2">Player 2
              </option>
              <option value="0">
                Tie!
              </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Match 2 */}
        <div className="mb-4">
          <label htmlFor="match 2" className="mb-2 block text-sm font-medium">
            Match 2 result
          </label>
          <div className="relative">
            <select
              id="match2"
              name="match2"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a winner
              </option>      
              <option         
                value="1">Player 1
              </option>
              <option         
                value="2">Player 2
              </option>
              <option value="0">
                Tie!
              </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Match 3 */}
        <div className="mb-4">
          <label htmlFor="match 3" className="mb-2 block text-sm font-medium">
            Match 3 result
          </label>
          <div className="relative">
            <select
              id="match3"
              name="match3"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a winner
              </option>      
              <option         
                value="1">Player 1
              </option>
              <option         
                value="2">Player 2
              </option>
              <option value="0">
                Tie!
              </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Game</Button>
      </div>
    </form>
  );
}

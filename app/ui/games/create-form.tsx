import { LeagueField, PlayerField, TournamentField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    TrophyIcon,
    TableCellsIcon,
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createGame } from '@/app/lib/actions';


export default function Form(
    { players, tournaments, leagues } :
    { players: PlayerField[], tournaments: TournamentField[], leagues: LeagueField[] })
{

  return (
    <form action={createGame}>
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

        {/* Tournament Name */}
        <div className="mb-4">
          <label htmlFor="player 1" className="mb-2 block text-sm font-medium">
            Choose Tournament
          </label>
          <div className="relative">
            <select
              id="tournamentid"
              name="tournamentid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Tournament
              </option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.date} {tournament.name}
                </option>
              ))}
            </select>
            <TrophyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

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
            Match 1 result?
          </label>
          <div className="relative">
            <select
              id="match1"
              name="match1"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a winner?
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
            Match 1 result?
          </label>
          <div className="relative">
            <select
              id="match2"
              name="match2"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a winner?
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
            Match 1 result?
          </label>
          <div className="relative">
            <select
              id="match3"
              name="match3"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a winner?
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

        
{/* 
        // Invoice Amount 
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        // Invoice Status 
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset> */}
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

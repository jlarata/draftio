'use client';

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
import { useState, useCallback } from 'react';
import { selectLeague } from '@/app/lib/actions';
//import { SelectLeague } from './buttons';


export default function Form(
    { players, tournaments, leagues } :
    { players: PlayerField[], tournaments: TournamentField[], leagues: LeagueField[] })
{

  const [isLeagueSelected, setIsLeagueSelected] = useState(false);
  const [leagueSelected, setLeagueSelected] = useState('');
  const [isTournamentSelected, setIsTournamentSelected] = useState(false);
  const [tournamentSelected, setTournamentSelected] = useState('');


  const setLeague = useCallback((leagueId : string) => {
    setLeagueSelected((leagueSelected) => leagueId);
  }, []);

  const toggleIsLeagueSelected = useCallback(() => {
    setIsLeagueSelected((isLeagueSelected) => !isLeagueSelected);
  }, []);

  const toggleIsTournamentSelected = useCallback(() => {
    setIsTournamentSelected((isTournamentSelected) => !isTournamentSelected);
  }, []);



  return (
    <>
    <button
      onClick={toggleIsLeagueSelected}
    >is league selected? {isLeagueSelected ? leagueSelected : " no"} </button>
    
    {!isLeagueSelected && (
    <form action={toggleIsLeagueSelected}>
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
              onChange={(e) => {
                setLeague(e.target.value);
              }}
      
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
    )}

    {isLeagueSelected && (
      <form action={toggleIsTournamentSelected}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Tournament Name */}
        <div className="mb-4">
          <label htmlFor="player 1" className="mb-2 block text-sm font-medium">
            Choose tournament
          </label>
          <div className="relative">
            <select
              id="tournamentid"
              name="tournamentid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
              onChange={(e) => {
                setLeague(e.target.value);
              }}
      
            >
              <option value="" disabled>
                Select tournament
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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          onClick={toggleIsLeagueSelected}
          >
          Back to Select League
        </button>
        <Button type="submit">Select Tournament</Button>
      </div>
    </form>    )}
    
    
    </>
  );
}

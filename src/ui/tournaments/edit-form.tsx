'use client'

import { League, Player, TournamentForEdit } from '@/services/lib/definitions';
import {
  CalendarDaysIcon,
  CalendarIcon,
  ClipboardIcon,
  TrophyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { useEffect, useState } from 'react';
import { updateTournament } from '@/services/lib/actions';

export default function EditLeagueForm({
  players,
  tournament,
  leagues
}: {
  players: Player[],
  tournament: TournamentForEdit,
  leagues: League[]
}) {

  /* not using this. but will be needed if want to prevent duplicate tournament name */
  const [name, setName] = useState(tournament.name);

  // dd-MM-YYYY to YYYY/nmm/dd (notice also - for /)
  const tournamentDateString = tournament.date.split("/").reverse().join('-') 
  let aTime = new Date(tournamentDateString) 
  let aTimeString = aTime.toDateString() //this particular string format is what database will accept 
  let aTimeToLocale = aTime.toLocaleDateString('en-CA') //DOM form only reads and shows this particular format
  const [isLoading, setIsLoading] = useState(false)

  const [date, setDate] = useState(aTimeString)
  const [champion, setChampion] = useState(tournament.champion_id)
  const [league, setLeague] = useState(tournament.league_id)
  const [id, setId] = useState(tournament.id)

  const handleEditTournament = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', name)
    formData.append('date', date)
    formData.append('champion', champion)
    formData.append('league', league)

    await updateTournament(formData)
    setIsLoading(false)
  }


  //intentos de que en la default se vea el date. no lo conseguí.
  //const [date, setDate] = useState(tournament.date.toString().substring(0,10))
  //const [date, setDate] = useState(tournament.date.toString().split('T')[0])
  //const [date, setDate] = useState(Date.parse(tournament.date))
  //console.log(date)

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* T Name */}
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
                defaultValue={tournament.name}
              >
              </input>
              < ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* T Date */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date
          </label>
          <div className="transparentInput relative">
            <input
              type='date'
              defaultValue={aTimeToLocale}
              id='date'
              name='date'
              className='peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <CalendarDaysIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
        </div>

        {/* T Champion */}
        <div className="mb-4">
          <label htmlFor="champion" className="mb-2 block text-sm font-medium">
            Champion
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="champion"
                name="champion"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={tournament.champion_id}
              >
                {players.map((player, i) => (
                  <option
                    value={player.id}>{player.username}</option>
                ))}

              </select>
              < ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* T League */}
        <div className="mb-4">
          <label htmlFor="league" className="mb-2 block text-sm font-medium">
            League
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="league"
                name="league"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={tournament.league_id}
              >
                {leagues.map((league, i) => (
                  <option
                    value={league.id}>{league.name}</option>
                ))}

              </select>
              < ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tournaments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type='submit'
          disabled={isLoading || name == ''}
          onClick={handleEditTournament}
        >
          {isLoading ? 'Loading...' : 'Edit New Tournament'}
        </Button>
        {/*         <Button type="submit">Edit League</Button> */}
      </div>
    </form>
  );
}

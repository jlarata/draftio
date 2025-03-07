'use client'
import React, { useEffect, useState } from 'react'
import { CalendarDaysIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { createTournament } from '@/services/lib/actions'
//import { Button } from '../button'
import TableCellsIcon from '@heroicons/react/20/solid/TableCellsIcon'
import { usePathname } from 'next/navigation'
import { LeagueWithTournaments } from '@/services/lib/definitions'
import { useTournament } from '@/src/swiss/context/tournament'

export default function CreateTournamentSwiss({
  leaguesWithTournaments,
  onLeagueChange,
}: {
  leaguesWithTournaments: LeagueWithTournaments[]
  onLeagueChange: (leagueID: string, isValid: boolean) => void
}) {
  const { tournament } = useTournament()
  const [leagueID, setLeagueID] = useState<string>('')
  let aTime = new Date()
  let aTimeString = aTime.toDateString() //this particular string format is what database will accept
  let aTimeToLocale = aTime.toLocaleDateString('en-CA') //DOM form only reads and shows this particular format
  const [date, setDate] = useState(aTimeString)
  const pathname = usePathname()

  const [isTournamentValid, setIsTournamentValid] = useState(true)
  const [isLeagueValid, setIsLeagueValid] = useState(true)
  const [isValid, setIsValid] = useState(true)

  const [tournamentName, setTournamentName] = useState<string>('')
  const handleAddTournamentName = () => {
    tournament.databaseInfo.name = tournamentName.trim()
    setIsTournamentValid(false)
  }

  const handleSelectLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLeagueID = e.target.value
    setLeagueID(selectedLeagueID)
    console.log(isTournamentValid, isLeagueValid, isValid)
    setIsLeagueValid(false)

    onLeagueChange(selectedLeagueID, isValid)
    tournament.databaseInfo.leagueID = selectedLeagueID
  }

  useEffect(() => {
    setIsValid(isTournamentValid && isLeagueValid)
  }, [isTournamentValid, isLeagueValid])

  return (
    <>
      <div className='w-full md:mt-6 h-44 md:w-1/2 bg-gray-100 rounded-md'>
        <div className='mt-2 flow-root'>
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full align-middle'>
              <div className='overflow-hidden rounded-md bg-gray-100 p-2 md:pt-0'>
                <form>
                  <div className='rounded-md bg-gray-100 p-4 md:p-6'>
                    <div className='mb-4 visibility: hidden'>
                      <label htmlFor='origin_url' className='mb-2 block text-sm font-medium'>
                        origin_url
                      </label>
                      <div className='relative'>
                        <input
                          id='origin_url'
                          name='origin_url'
                          className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                          defaultValue={pathname}
                        ></input>
                      </div>
                    </div>

                    <div className='mb-2 bg-gray-100'>
                      <label htmlFor='nickname' className='mb-2 block text-sm font-medium'>
                        Name, Date & League
                      </label>
                      <div className='relative '>
                        <input
                          placeholder='Enter new tournament Name (i.e. Ursa Saga in my house)'
                          id='name'
                          name='name'
                          className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                          onChange={(e) => setTournamentName(e.target.value)}
                          onBlur={handleAddTournamentName}
                          required
                        ></input>
                        <TrophyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                      </div>

                      <label htmlFor='date' className='mb-2 block text-sm font-medium'></label>
                      <div className='transparentInput relative '>
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

                    <div className='mb-4'>
                      <div className='relative'>
                        <select
                          id='league_id'
                          name='league_id'
                          defaultValue=''
                          className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                          onChange={handleSelectLeagueChange}
                          required
                        >
                          <option value='' disabled>
                            Choose a league
                          </option>

                          {leaguesWithTournaments.map((leagueWithTournaments, i) => (
                            <option key={i} value={leagueWithTournaments.id}>
                              {leagueWithTournaments.name}
                            </option>
                          ))}
                        </select>
                        <TableCellsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                      </div>
                    </div>
                    <div className='mt-6 flex justify-end gap-4 '></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

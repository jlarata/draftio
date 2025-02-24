'use client'
import { useEffect, useState } from 'react'
import { CalendarDaysIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { createTournament } from '@/services/lib/actions'
import { Button } from '../button'
import TableCellsIcon from '@heroicons/react/20/solid/TableCellsIcon'
import { usePathname } from 'next/navigation'
import { LeagueWithTournaments } from '@/services/lib/definitions'

export default function CreateForm(
  { leaguesWithTournaments }:
    { leaguesWithTournaments : LeagueWithTournaments[] }

) {

  const [isLoading, setIsLoading] = useState(false)
  /* nullable. should we give the user the chance to set this here? i dont think so. */
  const [seed, setSeed] = useState("")
  const [name, setName] = useState("")
  /* obviously to be setted as auti associated with user*/
  const [league_id, setLeague_id] = useState("-1")
  /* nullable. should we give the user the chance to set this here? i dont think so. */
  const [champion_id, setChampion_ud] = useState("")
  let aTime = new Date()
  let aTimeString = aTime.toDateString() //this particular string format is what database will accept 
  let aTimeToLocale = aTime.toLocaleDateString('en-CA') //DOM form only reads and shows this particular format
  const [date, setDate] = useState(aTimeString)
  const pathname = usePathname()

  /* 
  DO WE WANT TO VALIDATE TOURNAMENT NAME? DONT THINK SO
  const isPlayerNameValid = (name: string): boolean => {
    const normalizedOptions = options.map((player) => player.toLowerCase())
    return name.trim() !== '' && !normalizedOptions.includes(name.toLowerCase())
  } */

  const handleCreateTournament = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setIsLoading(true)
    const formData = new FormData()
    formData.append('seed', seed)
    formData.append('name', name)
    formData.append('league_id', league_id)
    formData.append('champion_id', champion_id)
    formData.append('date', date)
    formData.append('origin_url', pathname)
    await createTournament(formData)
    setIsLoading(false)
  }

  /* useEffect(() => {
    handleAddOption()
  }, [fetchedPlayers]) */

  return (
    <>
      <div className='w-full md:mt-6 h-44 md:w-1/2 bg-gray-100 rounded-md'>
        <div className='mt-2 flow-root'>
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full align-middle'>
              <div className='overflow-hidden rounded-md bg-gray-100 p-2 md:pt-0'>
                {/* <form action={createTournament}> */}
                <form>
                  <div className='rounded-md bg-gray-100 p-4 md:p-6'>
                    <div className='mb-4 visibility: hidden'>
                      {/* hidden input with originUrl. */}
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
                          onChange={(e) => setName(e.target.value)}
                          required
                        ></input>
                        <TrophyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                      </div>


                      <label htmlFor='date' className='mb-2 block text-sm font-medium'>
                      </label>
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
                      {/* <label htmlFor='league_id' className='mb-2 block text-sm font-medium'>
                        Choose a league
                      </label> */}
                      <div className='relative'>
                        <select
                          id='league_id'
                          name='league_id'
                          defaultValue=''
                          className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                          /* peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500' */
                          onChange={(e) => setLeague_id(e.target.value)}
                          required
                        >
                          <option value='' disabled>
                            Choose a league
                          </option>
                          {/* <option hidden value={-1} key={-1} disabled>Choose a League</option> */}
                          {leaguesWithTournaments.map((leagueWithTournaments, i) =>
                            <option key={i}
                              value={leagueWithTournaments.id}
                            >{leagueWithTournaments.name}</option>

                          )}
                        </select>
                        <TableCellsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                      </div>
                    </div>
                    <div className='mt-6 flex justify-end gap-4 '>
                      <Button
                        type='submit'
                        disabled={isLoading || league_id == "-1" || name == ''}
                        onClick={handleCreateTournament}
                      >
                        {isLoading ? 'Loading...' : 'Create New Tournament'}
                      </Button>
                    </div>
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

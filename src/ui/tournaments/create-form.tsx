'use client'
import { useEffect, useState } from 'react'
import { CalendarDaysIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { createTournament } from '@/services/lib/actions' 
import { Button } from '../button'
import TableCellsIcon from '@heroicons/react/20/solid/TableCellsIcon'
import { usePathname } from 'next/navigation'

export default function CreateForm() {

  const [isLoading, setIsLoading] = useState(false)
  /* nullable. should we give the user the chance to set this here? i dont think so. */ 
  const [seed, setSeed] = useState("")
  const [name, setName] = useState("")
  /* obviously to be setted as auti associated with user*/ 
  const [league_id, setLeague_id] = useState("00000000-0000-0000-0000-000000000000")
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
      <div className='w-full h-44 md:w-1/2 bg-gray-200'>
        <div className='mt-6 flow-root'>
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full align-middle'>
              <div className='overflow-hidden rounded-md bg-gray-200 p-2 md:pt-0'>
                {/* <form action={createTournament}> */}
                <form>
                  <div className='rounded-md bg-gray-200 p-4 md:p-6'>
                    <div className='mb-4 visibility: hidden'>
                      {/* hidden input with league. not using it for now */}
                      <label htmlFor='league_id' className='mb-2 block text-sm font-medium'>
                        League
                      </label>
                      <div className='relative'>
                        <select
                          id='league_id'
                          name='league_id'
                          className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                          defaultValue=''
                        ></select>
                        <TableCellsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                      </div>
                    </div>
                    <div className='mb-4 visibility: hidden'>
                      {/* hidden input with originUrl. */}
                      <label htmlFor='origin_url' className='mb-2 block text-sm font-medium'>
                        origin_url
                      </label>
                      <div className='relative'>
                        <input
                          id='origin_url'
                          name='origin_url'
                          className = 'peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                          defaultValue={pathname}
                        ></input>
                      </div>
                    </div>

                    <div className='mb-4 bg-gray-200'>
                      <label htmlFor='nickname' className='mb-2 block text-sm font-medium'>
                        Create New Tournament
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
                    <div className='mt-6 flex justify-end gap-4 '>
                      <Button
                        type='submit'
                        disabled={isLoading}
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

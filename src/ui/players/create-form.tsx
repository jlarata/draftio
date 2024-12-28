"use client";
import { useEffect, useState } from "react";
import {
  UserIcon,
} from "@heroicons/react/24/outline";
import { createPlayer } from "@/services/lib/actions";
import { Button } from "../button";
import TableCellsIcon from "@heroicons/react/20/solid/TableCellsIcon";
import { Player } from "@/services/lib/definitions";
import { usePathname } from 'next/navigation'


export default function CreateForm(
  {fetchedPlayers} : {fetchedPlayers : Player[]}
  
  //{
  /* league_id, */
  //}: {
  /* league_id: string; */
  //  }
  ) {

  const fetchedPlayersArray = fetchedPlayers.map((fetchedPlayer) => {
    return fetchedPlayer.username
  })
  const [options, setOptions] = useState<string[]>(fetchedPlayersArray)
  const [newOption, setNewOption] = useState<string>('')
  const pathname = usePathname()

  const isPlayerNameValid = (name: string): boolean => {
    const normalizedOptions = options.map((player) => player.toLowerCase())
    return name.trim() !== '' && !normalizedOptions.includes(name.toLowerCase())
  }

  const handleAddOption = () => { 
    if (isPlayerNameValid(newOption))
      {
      setOptions((prevPlayers) => [...prevPlayers, newOption])
      setNewOption('')
    }
  }

  useEffect(() => {
    handleAddOption();
  },[fetchedPlayers]);

  //console.log(fetchedPlayersArray)
  return (
    <>
    <div className="w-full h-44 md:w-1/2 bg-gray-200">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-200 p-2 md:pt-0">
              {/* <form action={createPlayer}> */}
              <form>
                <div className="rounded-md bg-gray-200 p-4 md:p-6">
                    <div className="mb-4 visibility: hidden">
                        {/* hidden input with league. not using it for now */}
                        <label
                            htmlFor="league_id"
                            className="mb-2 block text-sm font-medium"
                        >
                        League
                        </label>
                        <div className="relative">
                        <select
                        id="league_id"
                        name="league_id"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        >
                        </select>
                        <TableCellsIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4 visibility: hidden">
                        {/* hidden input with originUrl. */}
                        <label
                            htmlFor="origin_url"
                            className="mb-2 block text-sm font-medium"
                        >
                        origin_url
                        </label>
                        <div className="relative">
                        <input
                        id="origin_url"
                        name="origin_url"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={pathname}
                        //value={"/dashboard/players"}
                        >
                        </input>
                        
                        </div>
                    </div>

                    <div className="mb-4 bg-gray-200">
                        <label
                        htmlFor="nickname"
                        className="mb-2 block text-sm font-medium"
                        >
                        Create New Player
                        </label>
                        <div className="relative ">
                        <input
                            placeholder="Enter new player nickname"
                            id="nickname"
                            name="nickname"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            /* defaultValue="" */
                            onChange={(e) => setNewOption(e.target.value)}
                            value={newOption}                  
                            /* onChange={(e) => setNickname(e.target.value)} */
                            required
                        >
                        </input>
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4 ">
                      <Button
                        type="submit"
                        formAction={createPlayer} disabled={!isPlayerNameValid(newOption)}>Create New Player</Button>
                    </div>
                </div>
        
      </form>
      </div>
      </div>
      </div>
      </div>
      </div>
    
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import { createLeague } from "@/services/lib/actions";
import { Button } from "../button";
import TableCellsIcon from "@heroicons/react/20/solid/TableCellsIcon";
import { Player } from "@/services/lib/definitions";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

export default function CreateForm(

  {user_id, user_email} : {user_id : string, user_email: string}

  /* {fetchedPlayers} : {fetchedPlayers : Player[]}
  esto es para validar nombres */
  
  ) {

  const [newOption, setNewOption] = useState<string>('')

  /* const isPlayerNameValid = (name: string): boolean => {
    const normalizedOptions = options.map((player) => player.toLowerCase())
    return name.trim() !== '' && !normalizedOptions.includes(name.toLowerCase())
  } */

/*   const handleAddOption = () => {  
      setOptions((prevPlayers) => [...prevPlayers, newOption])
      setNewOption('')
  } */
  /* useEffect(() => {
    handleAddOption();
  },[fetchedPlayers]); 
  esto es para validar nombres*/

  //console.log(fetchedPlayersArray)

  const createLeagueWithEmail = createLeague.bind(null, user_email)

  return (
    <>
    <div className="mt-6 w-full md:w-5/6 ">
      <div className="mt-6 flow-root ">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle content-center ">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <form>
                <div className="rounded-md bg-gray-50 p-4 md:p-6"> 
                    <div className="mb-4">
                        <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                        >
                        Create New League
                        </label>
                        <div className="relative">
                        <input
                            placeholder="Enter new league name"
                            name="name"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            /* onChange={(e) => setNewOption(e.target.value)}
                            value={newOption} */                  
                            required
                        >
                        </input>
                        <PlusCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                      <Button
                        type="submit"
                        formAction={createLeagueWithEmail} /* disabled={!isPlayerNameValid(newOption)} */>Create New Player</Button>
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

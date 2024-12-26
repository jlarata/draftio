"use client";
import { useState } from "react";
import {
  UserIcon,
} from "@heroicons/react/24/outline";
import { createPlayer } from "@/services/lib/actions";
import { Button } from "../button";
import TableCellsIcon from "@heroicons/react/20/solid/TableCellsIcon";

export default function CreateForm({
  /* league_id, */
}: {
  /* league_id: string; */
}) {

  const [nickname, setNickname] = useState("");

  return (
    <>
    <div className="w-full md:w-1/2">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <form action={createPlayer}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <div className="mb-4 visibility: hidden">
                        {/* hidden input with league. not using it for now */}
                        <label
                            htmlFor="player 1"
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

                    <div className="mb-4">
                        <label
                        htmlFor="nickname"
                        className="mb-2 block text-sm font-medium"
                        >
                        Create New Player
                        </label>
                        <div className="relative">
                        <input
                            placeholder="Enter new player nickname"
                            id="nickname"
                            name="nickname"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        >
                        </input>
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Create New Player</Button>
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

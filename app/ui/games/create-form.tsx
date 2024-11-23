'use client'
import { showSwal } from "@/app/lib/alerts";
import { useState, useCallback } from "react";

import { PlayerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    TableCellsIcon,
    TrophyIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createGame } from '@/app/lib/actions';



export default function CreateForm(
    {leagueId, tournamentId, players } : {leagueId : string, tournamentId : string, players : PlayerField[]})
{

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [match1, setMatch1] = useState("z");
  const [match2, setMatch2] = useState("z");
  const [match3, setMatch3] = useState("z");

  const setThisPlayer = (playerName:string, playerPos:number) => {
    if (playerPos === 1) {
      setPlayer1(playerName)
    } else {
      setPlayer2(playerName)
    }}

    const setThisMatch = (playerWinner : string, matchNumber : number) => {
      switch (matchNumber) {
        case 1:
          setMatch1(playerWinner)
          break;
        case 2:
          setMatch2(playerWinner)
          break;
        case 3: 
          setMatch3(playerWinner)
      }
    }

  return (
    <>
    <form action={createGame}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* League */}
        <div className="mb-4 visibility: hidden">
          <label htmlFor="player 1" className="mb-2 block text-sm font-medium">
            League
          </label>
          <div className="relative">
            <select
              id="leagueid"
              name="leagueid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option key={leagueId} value={leagueId}>
                  {leagueId}
              </option>
              
            </select>
            <TableCellsIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      

        {/* Tournament  */}
        <div className="mb-4 visibility: hidden">
          <label htmlFor="player 1" className="mb-2 block text-sm font-medium">
            Choose Tournament
          </label>
          <div className="relative">
          <div className="relative">
            <select
              id="tournamentid"
              name="tournamentid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option key={tournamentId} value={tournamentId}>
                  {tournamentId}
              </option>
            </select>
            <TrophyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        </div>


        {/* Player 1 */}
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
            onChange={e => setThisPlayer(e.target.value, 1)}
            required
            >
              <option value="" disabled>
              Select a player
              </option>
            {players.map((player) => (
              <option disabled={player.id===player2} key={player.id} value={player.id}>
                {player.nick}
              </option>
            ))}
            </select>            
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
  
        {/* Player 2 */}
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
              onChange={e => setThisPlayer(e.target.value, 2)}
              required
            >
              <option value="" disabled>
                Select a player
              </option>
              {players.map((player) => (
                <option disabled={player.id===player1} key={player.id} value={player.id}>
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
              onChange={e => setThisMatch(e.target.value, 1)}
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
              onChange={e => setThisMatch(e.target.value, 2)}
              disabled={match1==="z"}
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
              onChange={e => setThisMatch(e.target.value, 3)}
              /* user cant set n3 in case m2 is not yet setted. also in case same player win m1 and m2 (but not if double tie) */
              disabled={match2==="z" || ((match1 === match2) && (match1 !== "0"))}
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
          href="/dashboard/games"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Game</Button>
      </div>
    </form>
    </>
  );
}

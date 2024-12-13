"use client";
import { useState } from "react";
import { PlayerField } from "@/services/lib/definitions";
import Link from "next/link";
import {
  TableCellsIcon,
  TrophyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { createGame } from "@/services/lib/actions";
import { Button } from "../button";

export default function CreateForm({
  league_id,
  tournament_id,
  players,
}: {
  league_id: string;
  tournament_id: string;
  players: PlayerField[];
}) {
  const [round, setRound] = useState("0")
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [p1Wins, setP1Wins] = useState("0");
  const [p2Wins, setP2Wins] = useState("0");


  const setThisPlayer = (playerName: string, playerPos: number) => {
    if (playerPos === 1) {
      setPlayer1(playerName);
    } else {
      setPlayer2(playerName);
    }
  };

  return (
    <>
      <form action={createGame}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">


          {/* League */}
          <div className="mb-4 visibility: hidden">
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
                <option key={league_id} value={league_id}>
                  {league_id}
                </option>
              </select>
              <TableCellsIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Tournament  */}
          <div className="mb-4 visibility: hidden">
            <label
              htmlFor="player 1"
              className="mb-2 block text-sm font-medium"
            >
              Choose Tournament
            </label>
            <div className="relative">
              <div className="relative">
                <select
                  id="tournament_id"
                  name="tournament_id"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                >
                  <option key={tournament_id} value={tournament_id}>
                    {tournament_id}
                  </option>
                </select>
                <TrophyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Round */}
          <div className="mb-4">
            <label
              htmlFor="round"
              className="mb-2 block text-sm font-medium"
            >
              Choose Tournament Round
            </label>
            <div className="relative">
              <select
                id="round"
                name="round"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                onChange={(e) => setRound(e.target.value)}
                required
              >
                <option value="" disabled>Set Round</option>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>  
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Player 1 */}
          <div className="mb-4">
            <label
              htmlFor="player 1"
              className="mb-2 block text-sm font-medium"
            >
              Choose Player 1
            </label>
            <div className="relative">
              <select
                id="player1_id"
                name="player1_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                onChange={(e) => setThisPlayer(e.target.value, 1)}
                required
                disabled={round===""}
              >
                <option value="" disabled>
                  Select a player
                </option>
                {players.map((player) => (
                  <option
                    disabled={player.id === player2}
                    key={player.id}
                    value={player.id}
                  >
                    {player.username}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* p1w */}
          <div className="mb-4">
            <label htmlFor="p1wins" className="mb-2 block text-sm font-normal">
              
              { player1 ? 
              players.map((player) => (
                player.id === player1 ?
                player.username +' Wins' : null
              )) : 'Player Wins'}
              
            </label>
            <div className="relative">
              <select
                id="player1_wins"
                name="player1_wins"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue="0"
                onChange={(e) => setP1Wins(e.target.value)}
                disabled={player1 === ""}
              >
                <option value="" disabled>
                  matchs
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>



          {/* Player 2 */}
          <div className="mb-4">
            <label
              htmlFor="player 2"
              className="mb-2 block text-sm font-medium"
            >
              Choose Player 2
            </label>
            <div className="relative">
              <select
                id="player2_id"
                name="player2_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                onChange={(e) => setThisPlayer(e.target.value, 2)}
                disabled={player1 === ""}
                required
              >
                <option value="" disabled>
                  Select a player
                </option>
                {players.map((player) => (
                  <option
                    disabled={player.id === player1}
                    key={player.id}
                    value={player.id}
                  >
                    {player.username}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* p2w */}
          <div className="mb-4">
            <label htmlFor="p2wins" className="mb-2 block text-sm font-normal">
              
              { player2 ? 
              players.map((player) => (
                player.id === player2 ?
                player.username +' Wins' : null
              )) : 'Player Wins'}
              
            </label>
            <div className="relative">
              <select
                id="player2_wins"
                name="player2_wins"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue="0"
                onChange={(e) => setP2Wins(e.target.value)}
                disabled={player2 === ""}
              >
                <option value="" disabled>
                  matchs
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2" disabled={p1Wins=== "2" }>2</option>
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

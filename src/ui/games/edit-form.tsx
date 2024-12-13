'use client';

import { CustomerField, GameForm, InvoiceForm, LeagueField, PlayerField, TournamentField } from '@/services/lib/definitions';
import {
  ClipboardIcon,
  TrophyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { useEffect, useState } from 'react';
import { updateGame } from '@/services/lib/actions';

export default function EditGameForm({
  game,
  leagues,
  tournaments,
  players
}: {
  game: GameForm
  leagues: LeagueField[];
  tournaments : TournamentField[];
  players : PlayerField[];
}) {

  const [player1, setPlayer1] = useState(game.player1);
  const [previousPlayer1, setPreviousPlayer1] = useState("");  
  const [player1_id, setPlayer1_id] = useState("");
  const [player1Wins, setPlayer1Wins] = useState(game.player1Wins.toString());
  const [player2, setPlayer2] = useState(game.player2);
  const [previousPlayer2, setPreviousPlayer2] = useState("");  
  const [player2_id, setPlayer2_id] = useState(game.player2);
  const [player2Wins, setPlayer2Wins] = useState(game.player2Wins.toString());
 

  useEffect(() => {
    players.map((player) => {
      if (player.username === player1 ) {
        setPreviousPlayer1(player.id);
      }
      if (player.username === player2 ) {
        setPreviousPlayer2(player.id);
      }
    })
 },[])

  const setThisPlayer = (player_id : string, player : number) => {
    
    if (player === 1) {
      players.map((player, i) => (
        player.id === player_id ? 
        (setPlayer1(player.username),
        setPlayer1_id(player.id)) : null
      ))  
    }
    if (player === 2) {
      players.map((player, i) => (
        player.id === player_id ? 
        (setPlayer2(player.username),
        setPlayer2_id(player.id)) : null
      ))
    } 

  }

  const updateGameWithId = updateGame.bind(null, game.game_id, previousPlayer1, previousPlayer2);

  //console.log("previous player 1 id: "+previousPlayer1+" previous player 2 id: "+ previousPlayer2)

  return (
    <form action={updateGameWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

          {/* Tournament */}
          <div className="mb-4">
          <label htmlFor="tournament_id" className="mb-2 block text-sm font-medium">
            Tournament
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <select
              id="tournament_id"
              name="tournament_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={game.tournament_name}
            >
              <option value="" disabled>
                Select Player 1
              </option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}, {tournament.date}
                </option>
              ))}
                </select>
              < ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

          {/* Round */}
          <div className="mb-4">
          <label htmlFor="round" className="mb-2 block text-sm font-medium">
            Round
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <select
              id="round"
              name="round"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={game.round}
            >
              <option value="" disabled>
                Select round
              </option>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>  
                </select>
              < ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* Player 1 */}
        <div className="mb-4">
          <label htmlFor="player1" className="mb-2 block text-sm font-medium">
            Player 1
          </label>
          <div className="relative">
            <select
              id="player1"
              name="player1"
              /* defaultValue="Bajtinovich" */
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={(e) => setThisPlayer(e.target.value, 1)}
            >
              <option value="" disabled>
                Select Player 1
              </option>
              {/* <option value="">{player1}</option> */}
              {players.map((player, i) => (
                <option key={player.id} value={player.id} selected={player.username === player1} disabled={player.id===player2_id}>
                  {player.username}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* p1wins */}
        <div className="mb-4">
          <label htmlFor="player1Wins" className="mb-2 block text-sm font-medium">
          {player1} Wins
          </label>
          <div className="relative">
            <select
              id="player1Wins"
              name="player1Wins"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={(e) => setPlayer1Wins(e.target.value)}

            >
              <option value="" disabled>
                Player 1 Wins
              </option>
              <option key={0} value={"0"} selected={game.player1Wins===0}>0</option>
              <option key={1} value={"1"} selected={game.player1Wins===1}>1</option>
              <option key={2} value={"2"} disabled={player2Wins==="2"} selected={game.player1Wins===2}>2</option>
            </select>
            <TrophyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Player 2 */}
        <div className="mb-4">
          <label htmlFor="player2" className="mb-2 block text-sm font-medium">
            Player 2
          </label>
          <div className="relative">
            <select
              id="player2"
              name="player2"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={(e) => setThisPlayer(e.target.value, 2)}
            >
              <option value="" disabled>
                Select Player 2
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id} selected={player.username === player2} disabled={player.id===player1_id}>
                  {player.username}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* p2wins */}
        <div className="mb-4">
          <label htmlFor="player2Wins" className="mb-2 block text-sm font-medium">
          {player2} Wins
          </label>
          <div className="relative">
            <select
              id="player2Wins"
              name="player2Wins"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={game.player2Wins}
              onChange={(e) => setPlayer2Wins(e.target.value)}

            >
              <option value="" disabled>
                Player 2 Wins
              </option>
              <option key={0} value={"0"} selected={game.player2Wins===0}>0</option>
              <option key={1} value={"1"} selected={game.player2Wins===1}>1</option>
              <option key={2} value={"2"} disabled={player1Wins === "2"} selected={game.player2Wins===2}>2</option>
            </select>
            <TrophyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>



        {/* Invoice Status */}
       {/*  <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/games"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Game</Button>
      </div>
    </form>
  );
}

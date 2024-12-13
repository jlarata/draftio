'use client';

import { useEffect, useState } from 'react'

import Button from '@/src/swiss/components/Button'
import cssInput from './Input/style.module.css'
import PlayerInputField from './Input'
import { useRouter } from 'next/navigation'
import RandomSeatStep from '../RandomSeat'
import { randomSeatsUtils } from '../RandomSeat/utils'
import { playerServices } from '@/services/player';
import { FetchedPlayer, Player } from '@/services/lib/definitions';

type Props = { submitPlayers: (players: string[]) => void, fetchedPlayers : Player[] }

const PlayerForm = ({ submitPlayers, fetchedPlayers }: Props ) => {

  const router = useRouter()
  const [players, setPlayers] = useState<string[]>(['J1', 'J2',"J3","J4"])
  const [showRandomSeatStep, setShowRandomSeatStep] = useState(false)
  const [disablePlayerForm, setDisablePlayerForm] = useState(false)

  const handlePlayerNameChange = ({ name, index }: { name: string; index: number }) => {
    if (name === '') return
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player, playerIndex) => {
        if (playerIndex === index) {
          return name
        }
        return player
      })
    })
  }

  const removePlayer = (index: number) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.filter((_, playerIndex) => playerIndex !== index)
    })
  }

  const handleAddPlayer = () => {
    setPlayers((prevPlayers) => {
      return [...prevPlayers, '']
    })
  }

  const handleStartTournament = () => {
    if (players.length >= 2 && new Set(players).size === players.length) {
      console.log('Entro start Tournament Handler')
      setDisablePlayerForm(true)
      setShowRandomSeatStep(true)
    }
  }

  return (
    <div>
      <div>
        <h1>hola lauti esto ya funca:</h1>
        <select>
          {fetchedPlayers.map((fetchedPlayer, i) => {
            return (
              <option 
              key={fetchedPlayer.id+i}
              value={fetchedPlayer.id}>
                {fetchedPlayer.username}
              </option>
            )})
          }
        </select>
      </div>
      <div>

        <p className='mb-2 font-bold text-lg'>Players Management</p>
      </div>
      <div>
        {players.map((player, i) => {
          const isDuplicated =
            players.lastIndexOf(player) !== i || players.indexOf(player) !== players.lastIndexOf(player)
          return (
            <PlayerInputField
              key={`${player}${i}`}
              index={i}
              inputValue={player}
              handlePlayerNameChange={handlePlayerNameChange}
              removePlayer={removePlayer}
              inputProps={{disabled: disablePlayerForm, className: isDuplicated ? cssInput.inputDuplicate : ''}}
            />
          )
        })}
      </div>
      <div>
        <Button
          disabled={players.length > 7}
          label={'Add Player'}
          onClick={handleAddPlayer}
          className='ml-1 mt-1 bg-transparent hover:bg-green-300 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded'  
          //className='button-primary'
        />
        <Button
          label={'Get draft positions'}
          disabled={players.length < 2 || new Set(players).size !== players.length}
          onClick={handleStartTournament}
          className='ml-1 mt-1 bg-transparent hover:bg-green-300 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded'  
        />
        {/* Esto esta mal, pero no se como hacerlo */}
        {showRandomSeatStep && <RandomSeatStep players={players} randomPlayers={randomSeatsUtils.getRandomPlayers(players)} />}
        <Button
          label={'Get first Round'}
          disabled={players.length < 2 || new Set(players).size !== players.length}
          onClick={() => (submitPlayers(players), router.push('./swiss/rounds'))}
          className='ml-1 mt-1 mr-1 bg-transparent hover:bg-green-300 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded' 
        />
      </div>
    </div>
  )
}

export default PlayerForm

'use client'

import { useEffect, useState } from 'react'
import Button from '@/src/swiss/components/Button'
import { useRouter } from 'next/navigation'
import RandomSeatStep from '../RandomSeat'
import { randomSeatsUtils } from '../RandomSeat/utils'
import { Player } from '@/services/lib/definitions'
import PlayerSelectField from './PlayerSelect'
import Input from '@/src/swiss/components/Input'
import CreateForm from '@/src/ui/players/create-form'


type Props = { submitPlayers: (players: string[]) => void; fetchedPlayers: Player[] }

const PlayerForm = ({ submitPlayers, fetchedPlayers }: Props) => {
  const router = useRouter()
  const fetchedPlayersArray = fetchedPlayers.map((fetchedPlayer) => {
    return fetchedPlayer.username
  })

  const [players, setPlayers] = useState<string[]>(['', ''])
  const [showRandomSeatStep, setShowRandomSeatStep] = useState(false)
  const [disablePlayerForm, setDisablePlayerForm] = useState(false)
  const [options, setOptions] = useState<string[]>(fetchedPlayersArray)

  const handleRefreshOptions = () => {
    setOptions(fetchedPlayersArray)
  }

  const handlePlayerNameChange = ({ name, index }: { name: string; index: number }) => {   
    setPlayers((prevPlayers) => 
      prevPlayers.map((player, i) => (i === index ? name : player))
    );  
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
      setDisablePlayerForm(true)
      setShowRandomSeatStep(true)
    }
  }

  useEffect(() => {
    handleRefreshOptions();
  },[fetchedPlayers]);

  return (
    <div>
      <div>        
        <CreateForm fetchedPlayers={fetchedPlayers} ></CreateForm>        

        {players.map((player, i) => {
          return (
            <PlayerSelectField
              key={i}
              index={i}
              fetchedPlayers={options}
              inputValue={player}
              removePlayer={removePlayer}
              handlePlayerNameChange={(name) => handlePlayerNameChange(name)}
              selectedPlayers={players}
            />
          )
        })}

        <p className='mb-2 font-bold text-lg'>Players Management</p>
      </div>

      <div>
        <Button
          disabled={players.length > 7}
          label={'Add Player'}
          onClick={handleAddPlayer}
        />
        <Button
          label={'Get draft positions'}
          disabled={players.length < 2 || new Set(players).size !== players.length}
          onClick={handleStartTournament}
        />
        {showRandomSeatStep && (
          <RandomSeatStep players={players} randomPlayers={randomSeatsUtils.getRandomPlayers(players)} />
        )}
        <Button
          label={'Get first Round'}
          disabled={players.length < 2 || new Set(players).size !== players.length}
          onClick={() => (submitPlayers(players), router.push('./swiss/rounds'))}
        />
      </div>
    </div>
  )
}

export default PlayerForm

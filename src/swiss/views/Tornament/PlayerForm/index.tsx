'use client'

import { useEffect, useState } from 'react'
import Button from '@/src/swiss/components/Button'
import { usePathname, useRouter } from 'next/navigation'
import RandomSeatStep from '../RandomSeat'
import { randomSeatsUtils } from '../RandomSeat/utils'
import { Player } from '@/services/lib/definitions'
import PlayerSelectField from './PlayerSelect'
import Input from '@/src/swiss/components/Input'
import CreateForm from '@/src/ui/players/create-form'
import { createTournament } from '@/services/lib/actions'
import { useTournament } from '@/src/swiss/context/tournament'

import { useTournament } from '@/src/swiss/context/tournament'
import { createTournamentSwiss } from '@/services/lib/actions'


type Props = { submitPlayers: (players: string[]) => void; fetchedPlayers: Player[], user_email: string }

const PlayerForm = ({ submitPlayers, fetchedPlayers, user_email }: Props) => {
  const router = useRouter()
  const fetchedPlayersArray = fetchedPlayers.map((fetchedPlayer) => {
    return fetchedPlayer.username
  })
  const { tournament } = useTournament()
  const [tournamentSeed, setTournamentSeed] = useState<string>('')
  const [players, setPlayers] = useState<string[]>(['', ''])
  const [showRandomSeatStep, setShowRandomSeatStep] = useState(false)
  const [disablePlayerForm, setDisablePlayerForm] = useState(false)
  const [options, setOptions] = useState<string[]>(fetchedPlayersArray)
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

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



  const handleStartTournament = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleStartTournament se ejecutó")
    if (players.length >= 2 && new Set(players).size === players.length) {
      setDisablePlayerForm(true)
      setShowRandomSeatStep(true)      
    }


  }
  
  const handleCreateTournament = async () => {
    console.log("entro en handleCreateTournament")
    
    setTournamentSeed((tournament?.seed?? "no seed").toString())
    setIsLoading(true)
    const formData = new FormData()
    formData.append('seed', tournamentSeed)
    formData.append('name', tournament.databaseInfo.name)
    formData.append('league_id', tournament.databaseInfo.leagueID)
    formData.append('champion_id', tournament.databaseInfo.ChampionUuid)
    formData.append('date', tournament.databaseInfo.date)
    formData.append('origin_url', pathname)
    await createTournament(formData)
    setIsLoading(false)
  }

  const handleCreateTournament = async () => {


    setIsLoading(true)
    const formData = new FormData()
    formData.append('seed', tournament.seed) //Revisar que pasa con el seed
    formData.append('name', tournament.databaseInfo.name)
    formData.append('league_id', tournament.databaseInfo.leagueID)
    formData.append('champion_id', tournament.databaseInfo.ChampionUuid)
    formData.append('date', tournament.databaseInfo.date)
    console.log(formData)
    const tournamentID = await createTournamentSwiss(formData)
    console.log(tournamentID.rows[0].id) //esta mal definida 
    tournament.databaseInfo.touranmentID = tournamentID.rows[0].id
    setIsLoading(false)
  }

  useEffect(() => {
    handleRefreshOptions();
  }, [fetchedPlayers]);

  return (
    <div>
      <div>
        <CreateForm fetchedPlayers={fetchedPlayers} user_email={user_email} ></CreateForm>

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
          onClick={() => {
            submitPlayers(players);
            handleCreateTournament();
            router.push('./swiss/rounds');
          }}
        />
      </div>
    </div>
  )
}

export default PlayerForm

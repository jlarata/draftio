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
import { createTournamentAndReturnId } from '@/services/lib/actions'


type Props = { submitPlayers: (players: Player[]) => void; fetchedPlayers: Player[], user_email: string }

const PlayerForm = ({ submitPlayers, fetchedPlayers, user_email }: Props) => {
  const router = useRouter()
  const { tournament } = useTournament()
  const [tournamentSeed, setTournamentSeed] = useState<string>('')
  const [selectedPlayers, setSelectedPlayers] = useState<(Player | undefined)[]>([undefined, undefined])
  const [playersAmount, setPlayersAmount] = useState(2)
  const [showRandomSeatStep, setShowRandomSeatStep] = useState(false)
  const [disablePlayerForm, setDisablePlayerForm] = useState(false)
  const [options, setOptions] = useState<Player[]>(fetchedPlayers)
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  const handleRefreshOptions = () => {
    setOptions(fetchedPlayers)
  }

  console.log(selectedPlayers);

  const handlePlayerNameChange = ({ player, index }: { player: Player; index: number }) => {
    setSelectedPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers]
      newPlayers[index] =  player


      
      /* if (prevPlayers.length === 0) {
        return [player]
      } else {
        const newPlayers = [...prevPlayers] 
        
        if (prevPlayers[index]) {
          newPlayers[index] =  player
        }

        return [newPlayers]
      } */
     return newPlayers
    }
      /* prevPlayers.map((player, i) => (i === index ? player : player)) */
    );
    //console.log("handleplayernamechange player name: " +player.username+ ", index: "+ index)
  }

  const removePlayer = (index: number) => {
    setSelectedPlayers((prevPlayers) => {
      return prevPlayers.filter((_, playerIndex) => playerIndex !== index)
    })
    setPlayersAmount((prev) => {
      return (prev - 1)
    })
  }

  const handleAddPlayer = () => {
    setPlayersAmount((prev) => {
      return (prev + 1)
    })
  }

  const handleStartTournament = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleStartTournament se ejecutó")
    if (selectedPlayers.length >= 2 && new Set(selectedPlayers).size === selectedPlayers.length) {
      setDisablePlayerForm(true)
      setShowRandomSeatStep(true)
    }
  }

  const handleCreateTournament = async () => {

    setIsLoading(true)
    const formData = new FormData()
    tournament.seed ?
      formData.append('seed', tournament.seed.toString())
      :
      formData.append('seed', "undefined")

    formData.append('name', tournament.databaseInfo.name)
    formData.append('league_id', tournament.databaseInfo.leagueID)
    formData.append('champion_id', tournament.databaseInfo.ChampionUuid)
    formData.append('date', tournament.databaseInfo.date)
    console.log(formData)
    const tournamentID = await createTournamentAndReturnId(formData)
    console.log(tournamentID)
    tournament.databaseInfo.touranmentID = tournamentID
    setIsLoading(false)
  }

  useEffect(() => {
    handleRefreshOptions();
  }, [fetchedPlayers]);

  return (
    <div>
      <div>
        <CreateForm fetchedPlayers={fetchedPlayers} user_email={user_email} ></CreateForm>

        {[...Array(playersAmount)].map((player, i) => {
          return (
            <PlayerSelectField
              key={i}
              index={i}
              fetchedPlayers={options}
              inputValue={ selectedPlayers[i] ? selectedPlayers[i].id : undefined }
              removePlayer={removePlayer}
              handlePlayerNameChange={({ player: playerId, index }) => handlePlayerNameChange({ player: playerId, index })}
              selectedPlayers={selectedPlayers}
            />
          )
        })}



        {/*         {selectedPlayers.map((player, i) => {
          return (
            <PlayerSelectField
              key={i}
              index={i}
              fetchedPlayers={options}
              inputValue={player.id}
              removePlayer={removePlayer}
              handlePlayerNameChange={(name) => handlePlayerNameChange(name)}
              selectedPlayers={selectedPlayers}
            />
          )
        })} */}

        <p className='mb-2 font-bold text-lg'>Players Management</p>
      </div>

      <div>
        <Button
          disabled={selectedPlayers.length > 7}
          label={'Add Player'}
          onClick={handleAddPlayer}
        />
        <Button
          label={'Get draft positions'}
          disabled={selectedPlayers.length < 2 || new Set(selectedPlayers).size !== selectedPlayers.length}
          onClick={handleStartTournament}
        />
        {/* {showRandomSeatStep && (
          <RandomSeatStep players={selectedPlayers} randomPlayers={randomSeatsUtils.getRandomPlayers(selectedPlayers)} />
        )} */}
        <Button
          label={'Get first Round'}
          disabled={selectedPlayers.length < 2 || new Set(selectedPlayers).size !== selectedPlayers.length}
          onClick={() => {
            submitPlayers(selectedPlayers);
            handleCreateTournament();
            router.push('./swiss/rounds');
          }}
        />
      </div>
    </div>
  )
}

export default PlayerForm

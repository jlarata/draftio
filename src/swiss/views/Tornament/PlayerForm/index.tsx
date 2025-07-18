'use client'

import { useEffect, useState } from 'react'
import Button from '@/src/swiss/components/Button'
import { usePathname, useRouter } from 'next/navigation'
import RandomSeatStep from '../RandomSeat'
import { randomSeatsUtils } from '../RandomSeat/utils'
import { Player } from '@/services/lib/definitions'
import PlayerSelectField from './PlayerSelect'
import CreateForm from '@/src/ui/players/create-form'
import { useTournament } from '@/src/swiss/context/tournament'
import { createTournamentAndReturnId } from '@/services/lib/actions'

type Props = { submitPlayers: (players: Player[]) => void; fetchedPlayers: Player[]; user_email: string; validLeagueTournament: boolean, validLeague: boolean; validTournament: boolean }

const PlayerForm = ({ submitPlayers, fetchedPlayers, user_email, validLeagueTournament, validLeague, validTournament }: Props) => {
  const router = useRouter()
  const { tournament } = useTournament()
  // const [tournamentSeed, setTournamentSeed] = useState<string>('')
  const [selectedPlayers, setSelectedPlayers] = useState<(Player | undefined)[]>([undefined, undefined])
  const [showRandomSeatStep, setShowRandomSeatStep] = useState(false)
  const [disablePlayerForm, setDisablePlayerForm] = useState(false)
  const [options, setOptions] = useState<Player[]>(fetchedPlayers)
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  const [selectedLeagueID, setSelectedLeagueID] = useState('')

  const handleRefreshOptions = () => {
    setOptions(fetchedPlayers)
    setSelectedLeagueID(tournament.databaseInfo.leagueID)
  }

  const handlePlayerNameChange = ({ player, index }: { player: Player; index: number }) => {
    setSelectedPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers]
      newPlayers[index] = player

      return newPlayers
    })
  }

  const removePlayer = (index: number) => {
    setSelectedPlayers((prevPlayers) => {
      return prevPlayers.filter((_, playerIndex) => playerIndex !== index)
    })
  }

  const handleAddPlayer = () => {
    setSelectedPlayers((prevPlayers) => {
      return [...prevPlayers, undefined]
    })
  }

  const handleStartTournament = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedPlayers.length >= 2 && new Set(selectedPlayers).size === selectedPlayers.length) {
      setDisablePlayerForm(true)
      setShowRandomSeatStep(true)
    }
  }

  const handleCreateTournament = async () => {
    setIsLoading(true)
    const formData = new FormData()
    tournament.seed ? formData.append('seed', tournament.seed.toString()) : formData.append('seed', 'undefined')

    formData.append('name', tournament.databaseInfo.name)

    /** in anonymous mode, create form doesn handle select league ID so we can just hardcode it here */
    if (user_email === "d3c.draftio@gmail.com") {
      formData.append('league_id', "085ac8cf-8c12-4d74-909b-c55ca03b4cc2")
    } else {
      formData.append('league_id', tournament.databaseInfo.leagueID)
    }
    formData.append('champion_id', tournament.databaseInfo.ChampionUuid)
    formData.append('date', tournament.databaseInfo.date)

    const tournamentID = await createTournamentAndReturnId(formData)

    tournament.databaseInfo.touranmentID = tournamentID

    //debug: console.log("creando tournament con esta data "+tournament.databaseInfo.leagueID)
    setIsLoading(false)
  }
  /** for validation purpouse */
  const esUndefined = (player: any) => player === undefined;


  useEffect(() => {
    handleRefreshOptions()
  }, [fetchedPlayers, tournament.databaseInfo.leagueID])

  return (
    <div>
      <div className='flex flex-col gap-4 bg-gray-100 rounded-md p-4 mr-4 ml-4 border border-gray-600'>

        <p className='text-2xl mt-4'>Select &/or add players</p>

        <Button
          disabled={selectedPlayers.length > 7} label={'Add Player'} onClick={handleAddPlayer} />

        {selectedPlayers.map((player, i) => {
          return (
            <PlayerSelectField
              key={'playerSelectedField' + i}
              index={i}
              fetchedPlayers={options}
              inputValue={selectedPlayers[i] ? selectedPlayers[i].id : undefined}
              removePlayer={removePlayer}
              handlePlayerNameChange={({ player: playerId, index }) =>
                handlePlayerNameChange({ player: playerId, index })
              }
              selectedPlayers={selectedPlayers}
            />
          )
        })}
        <div className='-mt-2 -mb-2 rounded border-b border-t border-gray-600
        md:mb-0'>
          <div className='-mt-4 
          md:mb-0'>
          <CreateForm fetchedPlayers={fetchedPlayers} user_email={user_email}></CreateForm>
          </div>
          
        </div>
        <div className='flex flex-row justify-around'>
          <Button
            label={'Get draft positions'}
            disabled={selectedPlayers.length < 2 || new Set(selectedPlayers).size !== selectedPlayers.length}
            onClick={handleStartTournament}
          />
          {showRandomSeatStep && (
            <RandomSeatStep
              players={selectedPlayers}
              randomPlayers={randomSeatsUtils.getRandomPlayers(selectedPlayers)}
            />
          )}


          {/* case user is anonymous wont use leaguevalidation: */}
          {user_email === "d3c.draftio@gmail.com" ?
            <Button
              label={'Start the Draft!'}
              disabled={selectedPlayers.length < 2 || new Set(selectedPlayers).size !== selectedPlayers.length
                || selectedPlayers.some(esUndefined)
                || !validTournament
              }
              onClick={() => {
                submitPlayers(selectedPlayers.filter(Boolean) as Player[])
                handleCreateTournament()
                router.push('./swiss/rounds')
              }}
            /> :
            /* case user is logged: */
            <Button
              label={'Start the Draft!'}
              disabled={selectedPlayers.length < 2 || new Set(selectedPlayers).size !== selectedPlayers.length
                || selectedPlayers.some(esUndefined)
                || !validLeague
                || !validTournament
              }
              onClick={() => {
                submitPlayers(selectedPlayers.filter(Boolean) as Player[])
                handleCreateTournament()
                router.push('./swiss/rounds')
              }}
            />
          }
        </div>
      </div>


    </div>
  )
}

export default PlayerForm

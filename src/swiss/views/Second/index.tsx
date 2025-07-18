'use client'

import { Match } from '@/src/swiss/classes/Match'
import Button from '@/src/swiss/components/Button'
import { useTournament } from '@/src/swiss/context/tournament'
import PlayerScoreDiv from '@/src/swiss/views/PlayerRound'
import React, { useEffect, useState } from 'react'
import css from './styles.module.css'
import RoundInput from '../PlayerRound/Round'
import { usePathname, useRouter } from 'next/navigation'
import { FetchedPlayer, Player } from '@/services/lib/definitions'
import { DatabaseRoundInfo } from '../../classes/classesDb/DatabaseRoundInfo'

type Props = { fetchedPlayers: Player[] }

const Second = ({ fetchedPlayers }: Props) => {
  const { tournament } = useTournament()
  const router = useRouter()
  const [visibleRounds, setVisibleRounds] = useState<number[]>([])
  const [currentRoundMatches, setCurrentRoundMatches] = useState<Match[]>([])
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})
  const [roundConfirmed, setRoundConfirmed] = useState<Record<number, boolean>>({})
  const [refreshScore, setRefreshScore] = useState(false)
  const urlPathname = usePathname()

  useEffect(() => {
    // Esto no es escalable
    Object.entries(fetchedPlayers).forEach(([playerKey, player]) =>
      Object.entries(tournament.players).forEach(([tournamentPlayerKey, playerInTournament]) => {
        if (playerInTournament.name === player.username) {
          playerInTournament.uuid = player.id
        }
      })
    )

    if (tournament.rounds.length === 0) {
      tournament.createRound()
    }
    setVisibleRounds([0])
    setCurrentRoundMatches(tournament.rounds[0].matches)
  }, [])

  const handleSelectChange = (key: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleConfirmChange = (round: number, isConfirm: boolean) => {
    setRoundConfirmed((prev) => ({
      ...prev,
      [round]: isConfirm,
    }))
  }

  const isButtonDisabled = (): boolean => {
    const roundsLength = tournament.rounds.length
    const playersLength = tournament.players.length

    const allRoundsConfirmed = visibleRounds.every((round) => roundConfirmed[round])

    return roundsLength >= playersLength - 1 || !allRoundsConfirmed
  }

  const tournamentConfig = tournament.config[0]

  const logValue = () => {
    const roundNumber = tournament.rounds.length
    tournament.databaseRoundInfo.push(new DatabaseRoundInfo())
    Object.values(currentRoundMatches).forEach((match) => {
      const { player1, player2 } = match;
      const { name: player1name, uuid: player1uuid } = player1.player
      const { name: player2name, uuid: player2uuid } = player2.player

      const player1GameWins = Number(selectedValues[player1name]) || 0
      const player2GameWins = Number(selectedValues[player2name]) || 0

      match.setMatchResult({
        player1GameWins: player1GameWins,
        player2GameWins: player2GameWins,
        config: tournamentConfig,
      })
      tournament.databaseRoundInfo[roundNumber - 1].addMatch({
        round: roundNumber,
        player1_id: player1uuid,
        player1_wins: player1GameWins,
        player1_name: player1name,
        player2_id: player2uuid,
        player2_name: player2name,
        player2_wins: player2GameWins,
      })
    })

    tournament.createRoundsInDB(roundNumber, urlPathname)

    tournament.createRound()
    console.log('Crea ronda en Log value')
    const nextRoundIndex = tournament.rounds.length - 1 //next 7 lines are add for reset the selectValues to avoid using a previous values in the next round
    const nextRoundMatches = tournament.rounds[nextRoundIndex].matches
    const newSelectedValues: Record<string, string> = {}
    nextRoundMatches.forEach((match) => {
      newSelectedValues[match.player1.player.name] = '0'
      newSelectedValues[match.player2.player.name] = '0'
    })

    setSelectedValues(newSelectedValues)
    setVisibleRounds((prev) => [...prev, nextRoundIndex])
    setCurrentRoundMatches(nextRoundMatches)
  }

  const finishSwiss = () => {
    if (Object.keys(roundConfirmed).length < tournament.rounds.length) {
      router.push('./results')
    } else {
      const roundNumber = tournament.rounds.length
      tournament.databaseRoundInfo.push(new DatabaseRoundInfo())

      Object.values(currentRoundMatches).forEach((match) => {
        const { player1, player2 } = match;
        const { name: player1name, uuid: player1uuid } = player1.player
        const { name: player2name, uuid: player2uuid } = player2.player

        const player1GameWins = Number(selectedValues[player1name]) || 0
        const player2GameWins = Number(selectedValues[player2name]) || 0

        match.setMatchResult({
          player1GameWins: player1GameWins,
          player2GameWins: player2GameWins,
          config: tournamentConfig,
        })
        tournament.databaseRoundInfo[roundNumber - 1].addMatch({
          round: roundNumber,
          player1_id: player1uuid,
          player1_wins: player1GameWins,
          player1_name: player1name,
          player2_id: player2uuid,
          player2_name: player2name,
          player2_wins: player2GameWins,
        })
      })

      tournament.createRoundsInDB(roundNumber, urlPathname)

      setRefreshScore((prev) => !prev)
      router.push('./results')
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col mt-6 gap-4 mr-4 ml-4
       md:flex-row md:justify-items-stretch md:ml-4 md:mr-4 md:gap-4'>
        <div className='md:w-1/2'>
          <PlayerScoreDiv containerClassName={css.scoreTableContainer} refreshScore={refreshScore} />
        </div>
        <div className='md:w-1/2 rounded-xl bg-gray-50 p-4'>
          {visibleRounds.map((round) => (
            <RoundInput
              key={round}
              onSelectChange={handleSelectChange}
              round={round}
              onConfirmChange={(isConfirmed) => handleConfirmChange(round, isConfirmed)}
            />
          ))}
        </div>
      </div>
      <Button
        label={'Get Next round'}
        onClick={() => logValue()}
        className='button-primary'
        disabled={isButtonDisabled()}
      />
      <Button label={'Finish Swiss phase'} onClick={() => finishSwiss()} className='button-primary' />
    </div>
  )
}

export default Second

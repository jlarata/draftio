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
  tournament.databaseInfo.touranmentID = "00000000-0000-0000-0000-000000000301" //Este es el qeu hay que fetchear
 

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
    Object.entries(currentRoundMatches).forEach(([tournamentPlayerKey, match]) => {
      var player1name = match.player1.player.name
      var player1uuid = match.player1.player.uuid
      var player2name = match.player2.player.name
      var player2uuid = match.player2.player.uuid

      var player1GameWins = Number(selectedValues[match.player1.player.name]) || 0
      var player2GameWins = Number(selectedValues[match.player2.player.name]) || 0
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
    
    tournament.createRoundsInDB(roundNumber,urlPathname)

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
      Object.entries(currentRoundMatches).forEach(([tournamentPlayerKey, match]) => {
        var player1name = match.player1.player.name
        var player1uuid = match.player1.player.uuid
        var player2name = match.player2.player.name
        var player2uuid = match.player2.player.uuid
  
        var player1GameWins = Number(selectedValues[match.player1.player.name]) || 0
        var player2GameWins = Number(selectedValues[match.player2.player.name]) || 0
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
      
      tournament.createRoundsInDB(roundNumber,urlPathname)

      setRefreshScore((prev) => !prev)
      router.push('./results')
    }
  }

  return (
    <div className={css.container}>
      <div className={css.matches}>
        {visibleRounds.map((round) => (
          <RoundInput
            key={round}
            onSelectChange={handleSelectChange}
            round={round}
            onConfirmChange={(isConfirmed) => handleConfirmChange(round, isConfirmed)}
          />
        ))}
      </div>
      <PlayerScoreDiv containerClassName={css.scoreTableContainer} refreshScore={refreshScore} />
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

import { Match } from '@/src/classes/Match'
import Button from '@/src/components/Button'
import { useTournament } from '@/src/context/tournament'
import PlayerScoreDiv from '@/src/views/PlayerRound'
import React, { useEffect, useState } from 'react'
import css from './styles.module.css'
import RoundInput from '../PlayerRound/Round'
import { useRouter } from 'next/router'

const Second = () => {
  const { tournament } = useTournament()
  const router = useRouter()
  const [visibleRounds, setVisibleRounds] = useState<number[]>([])
  const [currentRoundMatches, setCurrentRoundMatches] = useState<Match[]>([])
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})
  const [roundConfirmed, setRoundConfirmed] = useState<Record<number, boolean>>({})
  const [refreshScore, setRefreshScore] = useState(false)

  useEffect(() => {
    console.log('tournament.createRound()')
    tournament.createRound()
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
    Object.entries(currentRoundMatches).forEach(([tournamentPlayerKey, match]) => {
      var player1GameWins = Number(selectedValues[match.player1.player.name]) || 0
      var player2GameWins = Number(selectedValues[match.player2.player.name]) || 0

      match.setMatchResult({
        player1GameWins: player1GameWins,
        player2GameWins: player2GameWins,
        config: tournamentConfig,
      })
    })
    tournament.createRound()
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
      Object.entries(currentRoundMatches).forEach(([tournamentPlayerKey, match]) => {
        var player1GameWins = Number(selectedValues[match.player1.player.name]) || 0
        var player2GameWins = Number(selectedValues[match.player2.player.name]) || 0

        match.setMatchResult({
          player1GameWins: player1GameWins,
          player2GameWins: player2GameWins,
          config: tournamentConfig,
        })
      })

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

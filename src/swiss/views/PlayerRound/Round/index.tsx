'use client';

import { useTournament } from '@/src/swiss/context/tournament'
import MatchInput from '../Match'
import { useEffect, useState } from 'react'
import { Match } from '@/src/swiss/classes/Match'

type Props = {
  round: number
  onSelectChange: (key: string, value: string) => void
  onConfirmChange: (isConfirmed: boolean) => void
}

const RoundInput = ({ round, onSelectChange, onConfirmChange }: Props) => {
  const { tournament } = useTournament()   
  const [matches, setMatches] = useState<Match[]>([])
 
  useEffect(() => {
    setTimeout(() => {
      setMatches(tournament.rounds[round].matches)
    })


  
}, [round, tournament.rounds]) //ojo esto que no le entiendo

  return (
    <div className=' w-full'>
      <div>
        <p className='text-2xl mt-4'>Round {`${round+1}`}</p>
      </div>
      <div>
        <MatchInput key={`round-${round}`} matches={matches} onSelectChange={onSelectChange} onConfirmChange={onConfirmChange} />
      </div>
    </div>
  )
}

export default RoundInput

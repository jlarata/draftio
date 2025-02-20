'use client'

import Button from '@/src/swiss/components/Button'
import Input from '@/src/swiss/components/Input'
import { useState } from 'react'
import { useTournament } from '@/src/swiss/context/tournament'

type Props = {}

const TournamentName = () => {
    const { tournament } = useTournament()
    const [tournamentName, setTournamentName] = useState<string>("")
    const handleAddTournamentName = () => {
        tournament.databaseInfo.name = tournamentName.trim()
    }

    return (
        // Move this 2 css style o use the J method
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> 
            <p>Touranment Name</p>
        <Input
        placeholder={'Insert Tournament Name'}
        onChange={(e) => setTournamentName(e.target.value)}
        onBlur={handleAddTournamentName}
        value={tournamentName}
      />
      </div>
    )
}

export default TournamentName
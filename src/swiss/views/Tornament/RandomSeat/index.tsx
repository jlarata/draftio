'use client'

import { Player } from '@/services/lib/definitions'
import React, { useState } from 'react'

type Props = { players: (Player | undefined)[]; randomPlayers: Player[] }

const RandomSeatStep = ({ players, randomPlayers }: Props) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
        <div>Modify Positions</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {randomPlayers.map((player, index) => {
          return (
            <select key={index} disabled={!isChecked} defaultValue={player.id}>
              {players.map((playerOption, optionIndex) => {
                if (playerOption) {
                  return (
                    <option key={optionIndex} value={playerOption.id}>
                      {playerOption.username}
                    </option>
                  )
                }
              })}
            </select>
          )
        })}
      </div>
    </div>
  )
}

export default RandomSeatStep

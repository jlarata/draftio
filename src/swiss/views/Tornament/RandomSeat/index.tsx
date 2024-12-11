import React, { useState } from 'react'

type Props = { players: string[]; randomPlayers: string[] }

const RandomSeatStep = ({ players, randomPlayers }: Props) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
        <div>Modificar Posiciones</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {randomPlayers.map((player, index) => {
          return (
            <select key={index} disabled={!isChecked} defaultValue={player}>
              {players.map((playerOption, optionIndex) => {
                return (
                  <option key={optionIndex} value={playerOption}>
                    {playerOption}
                  </option>
                )
              })}
            </select>
          )
        })}
      </div>
    </div>
  )
}

export default RandomSeatStep

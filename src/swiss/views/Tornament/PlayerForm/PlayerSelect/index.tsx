import Icon from '@/src/swiss/components/Icon'
import css from './style.module.css'
import { useState } from 'react'

type Props = {
  index: number
  inputValue: string
  removePlayer: (index: number) => void
  fetchedPlayers: string[]
  handlePlayerNameChange: ({ name, index }: { name: string; index: number }) => void
  selectedPlayers: string[]
}

const PlayerSelectField = ({
  inputValue,
  index,
  removePlayer,
  fetchedPlayers,
  handlePlayerNameChange,
  selectedPlayers,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div key={`${inputValue}${index}`}>
      <select
        id='custom-select'
        value={inputValue || ''}
        onChange={(e) => (setSelectedOption(e.target.value), handlePlayerNameChange({ name: e.target.value, index }))}
      >
        <option value='' disabled>
          Choose a player
        </option>
        {fetchedPlayers.map((player, idx) => (
          <option key={idx} value={player} disabled={selectedPlayers.includes(player)}>
            {player}
          </option>
        ))}
      </select>

      <Icon
        name='Close'
        className={css.icon}
        onClick={() => {
          removePlayer(index)
        }}
      />
    </div>
  )
}

export default PlayerSelectField

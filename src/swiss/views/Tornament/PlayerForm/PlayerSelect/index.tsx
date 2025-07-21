import Icon from '@/src/swiss/components/Icon'
import css from './style.module.css'
import { useState } from 'react'
import { Player } from '@/services/lib/definitions'

type Props = {
  index: number
  inputValue?: string
  removePlayer: (index: number) => void
  fetchedPlayers: Player[]
  handlePlayerNameChange: ({ player, index }: { player: Player; index: number }) => void
  selectedPlayers: (Player | undefined)[]
}

const PlayerSelectField = ({
  inputValue = '',
  index,
  removePlayer,
  fetchedPlayers,
  handlePlayerNameChange,
  selectedPlayers,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div className='flex flex-row items-center gap-2' key={`${inputValue}${index}`}>
      <select
        id='custom-select'
        value={inputValue}
        onChange={(e) => (setSelectedOption(e.target.value), handlePlayerNameChange({ player: fetchedPlayers.find((currPlayer) => currPlayer.id === e.target.value)!, index }))}
      >
        <option value='' disabled>
          Select a player
        </option>
        {fetchedPlayers.map((player, idx) => (
          <option key={idx} value={player.id} disabled={selectedPlayers.some((currSelectedPlayer) => {
            if (currSelectedPlayer) {
              return currSelectedPlayer.id === player.id
            }
          })}>
            {player.username}
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

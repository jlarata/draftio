import Icon from '@/src/swiss/components/Icon'
import Input from '@/src/swiss/components/Input'
import css from './style.module.css'
import { useState } from 'react'
import { Player } from '@/services/lib/definitions'

type Props = {
  index: number
  inputValue: string
  removePlayer: (index: number) => void
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  fetchedPlayers : string[]
  handlePlayerNameChange: ({ name, index }: { name: string; index: number }) => void;
  selectedPlayers: string[]
}


const PlayerSelectField = ({ inputValue, index, removePlayer, inputProps, fetchedPlayers, handlePlayerNameChange, selectedPlayers }: Props) => {

  const fetchedPlayersArray = fetchedPlayers.map((fetchedPlayer) => {return fetchedPlayer})
  const [options, setOptions] = useState<string[]>(fetchedPlayersArray)
  const [selectedOption,setSelectedOption] = useState<string | null>(null)
  const [newOption, setNewOption] = useState<string>("")

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption)) {
      setOptions((prev) => [...prev, newOption]);
      setSelectedOption(newOption);
      setNewOption("");
  }}

  return (
    <div key={`${inputValue}${index}`}>
              <select
              
        id="custom-select"
        value={inputValue || ""}
        onChange={(e) => (setSelectedOption(e.target.value), handlePlayerNameChange({ name: e.target.value, index }))}
      >
        <option value="" disabled>
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

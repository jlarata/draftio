import Icon from '@/src/components/Icon'
import Input from '@/src/components/Input'
import css from './style.module.css'

type Props = {
  index: number
  inputValue: string
  handlePlayerNameChange: ({ name, index }: { name: string; index: number }) => void
  removePlayer: (index: number) => void
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const PlayerInputField = ({ inputValue, index, handlePlayerNameChange, removePlayer, inputProps }: Props) => {
  return (
    <div key={`${inputValue}${index}`}>
      <Input
        type='text'
        placeholder='Player name...'
        initialValue={inputValue}
        disabled={inputProps?.disabled}
        className={inputProps?.className}
        onBlur={(e) => {
          const newValue = e.target.value.trim()
          handlePlayerNameChange({ name: newValue, index })
        }}
      />
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

export default PlayerInputField

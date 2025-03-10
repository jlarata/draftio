import { ChangeEvent } from 'react'
import classNames from 'classnames'
import css from './select.module.css'

type Props = {
  index: number
  selectOption: number[] | string[] 
  onChange: (value: string, index: number) => void
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>

const Select = ({ index, selectOption, onChange, className, ...props }: Props) => {
  
  return (
    <select
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value, index)}
      className={classNames(css.select, className)}
      {...props}
      key={index}
    >
      {selectOption.map((playerOption, optionIndex) => {
        return (
          <option
            key={optionIndex}
            value={playerOption}
            defaultValue={playerOption === selectOption[0] ? playerOption : undefined}
          >
            {playerOption}
          </option>
        )
      })}
    </select>
  )
}

export default Select

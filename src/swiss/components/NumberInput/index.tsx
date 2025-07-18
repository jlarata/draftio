import css from './input.module.css'
import { useState } from 'react'
import classNames from 'classnames'

type Props = {
  initialValue?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ initialValue, className, onChange, ...props }: Props) => {

  const [value, setValue] = useState(initialValue)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || !isNaN(Number(e.target.value))) {
      setValue(e.target.value)
      if (onChange) onChange(e)
    }

  }

  return (
    <input
      type='text'
      onChange={handleOnChange}
      className={classNames(css.input, className)}
      value={value}
      {...props}
    />
  )
}

export default Input

import { ReactNode } from 'react'
import classNames from 'classnames'
import css from './button.module.css'

type Props = {
  label: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ label, className, ...props }: Props) => {
  return (
    <button className={classNames(css.button, className)} {...props}>
      {typeof label === 'string' ? <span className='text-[1em]'>{label}</span> : label}
    </button>
  )
}

export default Button

import { ReactNode } from 'react'
import classNames from 'classnames'
import css from './button.module.css'

type Props = {
  label: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ label, className, ...props }: Props) => {
  return (
    <button className='ml-1 mt-1 bg-transparent hover:bg-green-300 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed' {...props}>
      {typeof label === 'string' ? <span className='text-[1em]'>{label}</span> : label}
    </button>
  )
}

export default Button

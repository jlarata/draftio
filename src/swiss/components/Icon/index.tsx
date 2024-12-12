import css from './icon.module.css'
import classNames from 'classnames'
import { FunctionComponent, SVGProps } from 'react'

const iconsMap = {
  Close: (props: IconProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' className={props.className} viewBox='0 0 24 24' {...props}>
      <path d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'></path>
    </svg>
  ),
} as const

export type IconsMap = typeof iconsMap
export type IconsNames = keyof IconsMap

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconsNames
  clickable?: boolean
  onClick?: () => void
  className?: string
  svgProps?: SVGProps<SVGSVGElement>
}

const Icon = (props: IconProps) => {
  const IconToRender = iconsMap[props.name]

  if (!IconToRender) return null

  return (
    <IconToRender
      {...props}
      style={{ cursor: props.onClick ? 'pointer' : 'default' }}
      className={classNames(css.icon, props.className)}
      onClick={props.onClick}
    />
  )
}
export default Icon

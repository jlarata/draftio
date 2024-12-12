import classNames from 'classnames'
import css from './style.module.css'

//This is not arranged => also need to add loss and draws in the scores
type Props = {
  containerClassName?: string
  playerName: string
  playerWins: string | number
  playerLoss: string | number
  playerDraws: string | number
  playerSetWins: string | number
  playerSetLoss: string | number
  tieBraker: string | number  
}

const PlayerRoundRow = ({ containerClassName, playerName, playerWins,playerLoss,playerDraws, playerSetWins, playerSetLoss, tieBraker }: Props) => {
  return (
    <div className={classNames(css.container, containerClassName)}>
      <p className={css.playerName}>{playerName}</p>
      <p>{playerWins}-{playerLoss}-{playerDraws}</p>
      <p>{playerSetWins}-{playerSetLoss}</p>
      <p>{tieBraker}</p>
    </div>
  )
}

export default PlayerRoundRow

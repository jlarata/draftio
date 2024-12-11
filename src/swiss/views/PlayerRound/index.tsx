import { useTournament } from '@/src/context/tournament'
import classNames from 'classnames'
import css from './style.module.css'
import PlayerRoundRow from './PlayerRoundRow'

type Props = {
  containerClassName?: string
  refreshScore?: boolean
}

const WINS_WEIGHT = 100

const PlayerScoreDiv = ({ containerClassName }: Props) => {
  const { tournament } = useTournament()
  const { players } = tournament

  const sortedPlayers = [...players.sort((a, b) => {
    const aScore = a.wins * WINS_WEIGHT + a.buchholz -a.gameLoss
    const bScore = b.wins * WINS_WEIGHT + b.buchholz -b.gameLoss
    return bScore - aScore
  })]

  return (
    <div className={classNames(containerClassName, css.container)}>
      <h3 className={css.title}>Tabla de posiciones</h3>
      <>
        <PlayerRoundRow
          containerClassName={classNames(css.playerRowContainer, css.playerRowHeader)}
          playerName={'Player Name'}
          playerWins={'W'}
          playerLoss={"L"}
          playerDraws={"D"}
          playerSetWins={'GW'}
          playerSetLoss={'GL'}
          tieBraker={"TieBraker"}
        />
        {sortedPlayers.map((player, playerIndex) => {
          const { name, wins, loss,draws, gameWins, gameLoss, buchholz } = player
          return (
            <PlayerRoundRow
              containerClassName={css.playerRowContainer}
              key={playerIndex}
              playerName={name}
              playerWins={wins}
              playerLoss={loss}
              playerDraws={draws}
              playerSetWins={gameWins}
              playerSetLoss={gameLoss}
              tieBraker={buchholz}
            />
          )
        })}
      </>
    </div>
  )
}

export default PlayerScoreDiv

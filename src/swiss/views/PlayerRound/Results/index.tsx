import { useTournament } from '@/src/swiss/context/tournament'
import css from './style.module.css'
import PlayerScoreDiv from '@/src/swiss/views/PlayerRound'

const Result = () => {
  //const { tournament } = useTournament()  

  return (
    <>
      <div className={css.container}>
      <PlayerScoreDiv containerClassName={css.scoreTableContainer} />
      </div>
    </>
  )
}

export default Result

import { useTournament } from '@/src/context/tournament'
import css from './style.module.css'
import PlayerScoreDiv from '@/src/views/PlayerRound'

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

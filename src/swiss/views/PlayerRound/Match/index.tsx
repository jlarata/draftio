import Select from '@/src/components/Select'
import css from './style.module.css'
import { Match } from '@/src/classes/Match'
import { useTournament } from '@/src/context/tournament'
import { useState } from 'react'

type Props = {
  matches: Match[]
  onSelectChange: (key: string, value: string) => void
  onConfirmChange: (isConfirmed: boolean) => void 
}


const MatchInput = ({ matches, onSelectChange, onConfirmChange }: Props) => {
  const { tournament } = useTournament() 
  const selectOptionNumber = tournament.config[0].bo
  const createOddArray = (n: number): number[] => {
  return Array.from({ length: (n-Math.floor(n/2)+1) }, (_, i) => i ); //pasar a utils ? 
};

const selectOption = createOddArray(selectOptionNumber)
const[isConfirm, setIsConfirm] = useState(false)

const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const checked = e.target.checked
  setIsConfirm(checked)
  onConfirmChange(checked)
}


  return (
    <><div>
      {matches.map((match, matchIndex) => {
        return (
          <div className={css.matchRoundContainer} key={matchIndex}>
            <div className={css.playerGroup}>
              <p className={css.selectLabel}>{match.player1.player.name}</p>
              <Select
                index={matchIndex}
                key={`${matchIndex}-player1`}
                onChange={(value) => onSelectChange(`${match.player1.player.name}`, value)}
                selectOption={selectOption}
                disabled = {isConfirm}
              />
            </div>
            <div className={css.playerGroup}>
              <p className={css.selectLabel}>{match.player2.player.name}</p>
              <Select
                index={matchIndex}
                key={`${matchIndex}-player2`}
                onChange={(value) => onSelectChange(`${match.player2.player.name}`, value)}
                selectOption={selectOption}
                disabled = {isConfirm}
              />
            </div>
          </div>
        )
      })}
      </div>
      <div><p>Confirmar ronda</p> <input onChange={handleCheckboxChange} type="checkbox"  defaultChecked={false} /> </div>
    </>
  )
}

export default MatchInput

import { Config } from '@/src/classes/Config'
import NumberInput from '@/src/components/NumberInput'
import { ChangeEvent, useState } from 'react'

type Props = {
  config: Config
  onConfigChange: (key: string, value: string) => void
}

const TournamentConfig = ({ config, onConfigChange }: Props) => {
  const tournamentConfig = config

  const handleNumberInputChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    switch (key) {
      case 'Bo':
        tournamentConfig.setBoValue(value)
        break
      case 'win':
        tournamentConfig.setPointsPerMatchWin(value)
        break
      case 'draw':
        tournamentConfig.setPointsPerMatchTie(value)
        break
      case 'gameWin':
        tournamentConfig.setPointsPerGameWin(value)
        break
      case 'bye':
        tournamentConfig.setPointsperBye(value)
        break
      default:
        console.warn(`Unrecognized key: ${key}`)
    }

    onConfigChange(key, e.target.value)
  }
  // Esto tambien creo que se puede cambiar para que sea un map ?
  return (
    <>
      <div>
        <label>Bo</label>
        <NumberInput min={1} max={7} step={2} defaultValue={3} onChange={handleNumberInputChange('Bo')} />
      </div>
      <div>
        <label>Points per match win</label>
        <NumberInput min={0} max={100} step={1} defaultValue={3} onChange={handleNumberInputChange('win')} />
      </div>
      <div>
        <label>Points per match draw</label>
        <NumberInput min={0} max={100} step={1} defaultValue={1} onChange={handleNumberInputChange('draw')} />
      </div>
      <div>
        <label>Points per game/set win</label>
        <NumberInput min={0} max={100} step={1} defaultValue={0} onChange={handleNumberInputChange('gameWin')} />
      </div>
      <div>
        <label>Points per bye</label>
        <NumberInput min={0} max={100} step={1} defaultValue={0} onChange={handleNumberInputChange('bye')} />
      </div>
    </>
  )
}

export default TournamentConfig

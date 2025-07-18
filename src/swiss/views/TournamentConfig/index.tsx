import { Config } from '@/src/swiss/classes/Config'
import NumberInput from '@/src/swiss/components/NumberInput'
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
    <div className='flex flex-col gap-4 bg-gray-100 rounded-md p-4 mr-4 ml-4 border border-gray-600'>
      <div>
        <p className='text-2xl mt-4'>Tournament Configuration</p>
      </div>
      <div className='flex flex-col gap-4 md:items-end md:gap-2'>
        <div className='flex items-center gap-2 flex-col md:flex-row'>
          <label>Best of...</label>
          <NumberInput min={1} max={7} step={2} defaultValue={3} onChange={handleNumberInputChange('Bo')} 
          className='md:w-16'/>
        </div>
        <div className='flex items-center gap-2 flex-col md:flex-row'>
          <label>Points per match win</label>
          <NumberInput min={0} max={100} step={1} defaultValue={3} onChange={handleNumberInputChange('win')} />
        </div>
        <div className='flex items-center gap-2 flex-col md:flex-row'>
          <label>Points per match draw</label>
          <NumberInput min={0} max={100} step={1} defaultValue={1} onChange={handleNumberInputChange('draw')} />
        </div>
        <div className='flex items-center gap-2 flex-col md:flex-row'>
          <label>Points per game/set win</label>
          <NumberInput min={0} max={100} step={1} defaultValue={0} onChange={handleNumberInputChange('gameWin')} />
        </div>
        <div className='flex items-center gap-2 flex-col md:flex-row'>
          <label>Points per bye</label>
          <NumberInput min={0} max={100} step={1} defaultValue={0} onChange={handleNumberInputChange('bye')} />
        </div>
      </div>
      </div>
    </>
  )
}

export default TournamentConfig

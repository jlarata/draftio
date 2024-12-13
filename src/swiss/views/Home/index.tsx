'use client';

import PlayerForm from '../Tornament/PlayerForm'
import css from './style.module.css'
import TournamentConfig from '../TournamentConfig'
import { useState } from 'react'
import { useTournament } from '../../context/tournament'
import { Config } from '../../classes/Config'
import { Player } from '@/services/lib/definitions';

const Home = (
  {fetchedPlayers} : {fetchedPlayers : Player[]}
) => {
  const { tournament } = useTournament()

  const submitPlayers = (players: string[]) => {
    const date = '2016-07-19T20:23:01.804Z'
    tournament.startTournament({ playersNames: players, date: date, config: config })
    console.log('Start Tournament: ', tournament)
  }

  const [config, setConfig] = useState<Config>(
    new Config({
      bo: 3,
      pointsPerMatchWin: 3,
      pointsPerMatchTie: 1,
      pointsPerGameWin: 0,
      pointsPerBye: 0,
    })
  );

  const handleConfigChange = (key: string, value: string) => { //pasar a utils o algo asi el switch ? 
    setConfig((prevConfig) => {
      const updatedConfig = new Config({
        ...prevConfig, 
      });
      switch (key) {
        case 'Bo':
          updatedConfig.setBoValue(Number(value));
          break;
        case 'win':
          updatedConfig.setPointsPerMatchWin(Number(value));
          break;
        case 'draw':
          updatedConfig.setPointsPerMatchTie(Number(value));
          break;
        case 'gameWin':
          updatedConfig.setPointsPerGameWin(Number(value));
          break;
        case 'bye':
          updatedConfig.setPointsperBye(Number(value));
          break;
        default:
          break;
      }
      return updatedConfig;
    });
  };

  return (
    <>
      <div className={css.container}>
        <div>
          <PlayerForm submitPlayers={submitPlayers} fetchedPlayers={fetchedPlayers} />
        </div>
        <div>
          <TournamentConfig config={config} onConfigChange={handleConfigChange}/>
        </div>
      </div>
    </>
  )
}

export default Home

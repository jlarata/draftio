'use client';

import PlayerForm from '../Tornament/PlayerForm'
import css from './style.module.css'
import TournamentConfig from '../TournamentConfig'
import TournamentName from '../Tornament/TournamentName'
import { useState } from 'react'
import { useTournament } from '../../context/tournament'
import { Config } from '../../classes/Config'
import { LeagueWithTournaments, Player } from '@/services/lib/definitions';
import SelectLeagueSwiss from '../Tornament/PlayerForm/LeagueSelect';
import CreateTournamentSwiss from '../Tornament/PlayerForm/CreateTournamentSwiss/create-form';

const Home = (
  { fetchedPlayers, user_email, leagueArrayId }: { fetchedPlayers: Player[], user_email: string, leagueArrayId: LeagueWithTournaments[] }
) => {
  const { tournament } = useTournament()
  console.log(tournament.databaseInfo.leagueID)
  tournament.databaseInfo.userEmail = user_email
  const handleLeagueChange = (leagueID: string) => { //este bloque se puede sacar, esta para test
    console.log(tournament)
  };

  const submitPlayers = (players: string[]) => {
    const date = new Date().toISOString()
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
          <CreateTournamentSwiss leaguesWithTournaments={leagueArrayId} onLeagueChange={handleLeagueChange} />
       
          <PlayerForm user_email={user_email} submitPlayers={submitPlayers} fetchedPlayers={fetchedPlayers} />
        </div>
        <div>
          <TournamentConfig config={config} onConfigChange={handleConfigChange} />
        </div>

      </div>
    </>
  )
}

export default Home


import Breadcrumbs from '@/app/ui/games/breadcrumbs';
import SelectLeagueForm from '@/app/ui/games/select-league-form';
import SelectTournamentForm from '@/app/ui/games/select-tournament-form';
import CreateForm from '@/app/ui/games/create-form';

import { fetchCreateGameData, fetchPlayersByLeague, fetchSelectLeagueData, fetchSelectTournamentData } from '@/app/lib/data';
import { Button } from '@/app/ui/button';

 

export default async function Page(props: {
  searchParams?: Promise<{
    leagueid?: string;
    tournamentid?: string;
  }>;})
   {
/*   const {
    players,
    tournaments,
    leagues
  } = await fetchCreateGameData(); */

  const {leagues} = await fetchSelectLeagueData();
  const leagueSearchParams = await props.searchParams;
  const tournamentSearchParams = await props.searchParams;
  const leagueId = leagueSearchParams?.leagueid || '';
  const tournamentId = tournamentSearchParams?.tournamentid || '';
  
  const {players} = await fetchPlayersByLeague("here should go the leagueId")

  
  
  //const tournaments = await fetchSelectTournamentData();
 // const {tournaments} = await fetchSelectTournamentData();


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Games', href: '/dashboard/games' },
          {
            label: 'Create Game',
            href: '/dashboard/games/create',
            active: true,
          },
        ]}
      />

      {leagueId && (<div>League id: {leagueId}</div>)}
      {tournamentId && (
        
        <div>Tournament id: {tournamentId}</div>
        
      )}

      {!leagueId && (<SelectLeagueForm leagues={leagues}/>)}

      {leagueId && (
        <>
        {!tournamentId && (
          <SelectTournamentForm leagueId={leagueId} />  
        )}
        
        </>
      )}

      {tournamentId && (
        <>
        <CreateForm leagueId={leagueId} tournamentId={tournamentId} players={players} />
        
        </>
      )}

      {/* <Form leagues={leagues} /> */}
      {/* <Form players={players} tournaments={tournaments} leagues={leagues} /> */}
    </main>
  );
}
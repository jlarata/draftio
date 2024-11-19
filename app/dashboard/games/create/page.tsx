//import Form from '@/app/ui/games/create-form';
import Form from '@/app/ui/games/create-game-form';
import Breadcrumbs from '@/app/ui/games/breadcrumbs';
import SelectLeagueForm from '@/app/ui/games/select-league-form';

import { fetchCreateGameData, fetchSelectLeagueData, fetchSelectTournamentData } from '@/app/lib/data';
import { Button } from '@/app/ui/button';
import SelectTournamentForm from '@/app/ui/games/select-tournament-form';

 

export default async function Page(props: {
  searchParams?: Promise<{
    leagueid?: string;
  }>;})
   {
/*   const {
    players,
    tournaments,
    leagues
  } = await fetchCreateGameData(); */
  const {leagues} = await fetchSelectLeagueData();
  const searchParams = await props.searchParams;
  const leagueId = searchParams?.leagueid || '';


  
  
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

      {!leagueId && (<SelectLeagueForm leagues={leagues}/>)}

      {leagueId && (
        <>
        <SelectTournamentForm leagueId={leagueId} />
        <div>League id: {leagueId}</div>
        </>
      )}
      {/* <Form leagues={leagues} /> */}
      {/* <Form players={players} tournaments={tournaments} leagues={leagues} /> */}
    </main>
  );
}
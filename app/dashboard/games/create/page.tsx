//import Form from '@/app/ui/games/create-form';
import Form from '@/app/ui/games/create-game-form';
import Breadcrumbs from '@/app/ui/games/breadcrumbs';
import { fetchCreateGameData, fetchSelectLeagueData } from '@/app/lib/data';
 
export default async function Page() {

/*   const {
    players,
    tournaments,
    leagues
  } = await fetchCreateGameData(); */
  const leagues = fetchSelectLeagueData;



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
      <Form players={players} tournaments={tournaments} leagues={leagues} />
      {/* <Form players={players} tournaments={tournaments} leagues={leagues} /> */}
    </main>
  );
}
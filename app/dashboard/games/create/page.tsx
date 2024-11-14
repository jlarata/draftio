import Form from '@/app/ui/games/create-form';
import Breadcrumbs from '@/app/ui/games/breadcrumbs';
import { fetchCreateGameData } from '@/app/lib/data';
 
export default async function Page() {

  const {
    players,
    tournaments,
    leagues
  } = await fetchCreateGameData();



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
    </main>
  );
}
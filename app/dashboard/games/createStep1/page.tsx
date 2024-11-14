import Form from '@/app/ui/games/select-league-form'
import Breadcrumbs from '@/app/ui/games/breadcrumbs';
import { fetchSelectLeagueData } from '@/app/lib/data';
 
export default async function Page() {

  const {
        leagues
  } = await fetchSelectLeagueData();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Games', href: '/dashboard/games' },
          {
            label: 'Select League',
            href: '/dashboard/games/selectLeague',
            active: true,
          },
        ]}
      />
      <Form leagues={leagues} />
    </main>
  );
}
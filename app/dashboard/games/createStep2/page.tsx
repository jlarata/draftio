'use client'
import { useSearchParams } from 'next/navigation'

// import Form from '@/app/ui/games/select-league-form'
import Breadcrumbs from '@/app/ui/games/breadcrumbs';
import { fetchSelectTournamentData } from '@/app/lib/data';
 
export default function Page() {

  const tournaments = fetchSelectTournamentData();

  const selectedLeague = useSearchParams().get('league')

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Games', href: '/dashboard/games' },
          {
            label: 'Select Tournament',
            href: '/dashboard/games/createStep1',
            active: true,
          },
        ]}
      />
      <p>${selectedLeague}</p>
      {/* <Form leagues={leagues} /> */}
    </main>
  );
}
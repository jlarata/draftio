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
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form players={players} tournaments={tournaments} leagues={leagues} />
    </main>
  );
}
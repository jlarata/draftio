'use client'
import { useSearchParams } from 'next/navigation'

// import Form from '@/app/ui/games/select-league-form'
import Breadcrumbs from '@/app/ui/games/breadcrumbs';
import { fetchSelectTournamentData } from '@/app/lib/data';
 
export default function Page() {

  const tournaments = fetchSelectTournamentData();

  //BUENO ESTE SISTEMA NO ESTÁ FUNCIONANDO
  //AL HACER USE CLIENT A ESTE COMPONENTE TODOS LOS ASYNC AWAIT NO ANDAN
  //ENTONCES EN EL CREATESETP1 TENGO QUE VER OTRO MODO DE PASAR LA VARIABLE LEAGUE AL STEP 2
  //SE PUEDE PASAR VARIABLE CON UNA SERVER ACTION?
  //SE PUEDE NO USAR SERVER ACTION SINO MODIFICAR EL FORMULARIO EN EL STEP 1?

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
import { gameServices } from "@/services/game";
import { leagueServices } from "@/services/league";
import { playerServices } from "@/services/player";
import { tournamentServices } from "@/services/tournament";
import Breadcrumbs from "@/src/ui/games/breadcrumbs";
import Form from '@/src/ui/games/edit-form'


 
export default async function Page(props: { params : Promise<{ id:string}>}) {
    const params = await props.params;
    const game_id = params.id;

    const { fetchGameById } = gameServices;
    
    const game = await fetchGameById(game_id);

    const { fetchSelectLeagueData } = leagueServices
    const {leagues} = await fetchSelectLeagueData();

    const { fetchSelectTournamentDataByLeagueName } = tournamentServices;
    const {tournaments} = await fetchSelectTournamentDataByLeagueName(game.league_name);

    const { fetchPlayersByLeague } = playerServices;
    const {players} = await fetchPlayersByLeague("eventually, a league id string");

/* 
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]) */

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Games', href: '/dashboard/games' },
          {
            label: 'Edit Game',
            href: `/dashboard/games/${game_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form game={game} leagues={leagues} tournaments={tournaments} players={players} />
    </main>
  );
}
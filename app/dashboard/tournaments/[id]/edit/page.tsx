import { leagueServices } from "@/services/league";
import { playerServices } from "@/services/player";
import { tournamentServices } from "@/services/tournament";
import Breadcrumbs from "@/src/ui/games/breadcrumbs";
import Form from '@/src/ui/tournaments/edit-form';
import { auth } from "@/auth";


 
export default async function Page(props: { params : Promise<{ id:string}>}) {
    const params = await props.params;
    const tournament_id = params.id;  
    const session = await auth();
    const user_email : string = session?.user?.email!

    const { fetchTournamentById } = tournamentServices
    const { tournament } = await fetchTournamentById(tournament_id); 

    const { fetchLeaguesWithTournamentsByUserEmail } = leagueServices
    const leaguesWithTournaments = (await fetchLeaguesWithTournamentsByUserEmail(user_email)).arrayOfLeaguesWithTournaments
    
    /* probably would be neccesary to create a new query that fetchs players who
     are in player_game tables with tournament_id = tournament_id*/

    const { fetchPlayersByLeague } = playerServices;
    const players = await fetchPlayersByLeague(tournament.league_id)
    
    
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tournaments', href: '/dashboard/tournaments' },
          {
            label: 'Edit Tournament',
            href: `/dashboard/leagues/${tournament_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form tournament={tournament} players={players.players} leagues={leaguesWithTournaments}/>
    </main>
  );
}
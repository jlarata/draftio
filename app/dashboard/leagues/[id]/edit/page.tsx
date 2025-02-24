import { auth } from "@/auth";
import { leagueServices } from "@/services/league";
import { playerServices } from "@/services/player";
import { tournamentServices } from "@/services/tournament";
import AlertsPage, { WrongPage } from "@/src/ui/alerts/alerts";
import Breadcrumbs from "@/src/ui/games/breadcrumbs";
import Form from '@/src/ui/leagues/edit-form';

export default async function Page(props: {
  params: Promise<{ id: string }>,
  searchParams?: Promise<{
    modNotFound?: string;
    existentLeagueUser?:string;
    modAdded?:string;
  }>;
}) {

  const searchParams = await props.searchParams;

  let modNotFoundMessage = searchParams?.modNotFound || "";
  let existentLeagueUserMessage = searchParams?.existentLeagueUser || "";
  let modAddedMessage = searchParams?.modAdded || "";

  const session = await auth();
  const user_email = session?.user?.email

  const params = await props.params;
  const league_id = params.id;


  const { fetchLeagueById } = leagueServices;

  const league = await fetchLeagueById(league_id);

  const { fetchLeagueMods } = leagueServices;
  const mods = await fetchLeagueMods(league_id);


  const { fetchTournamentDataByLeagueId } = tournamentServices
  const { tournaments } = await fetchTournamentDataByLeagueId(league_id);

  /* should the user be able to edit the players associated with a league in this screen? im guessing so */
  const { fetchPlayersByLeague } = playerServices;

  /* this method has to be fixed: now it does nothing with the param league_id
  but i think is the same method used in the dashboasrd/players component so i think i better fix it later */
  const { players } = await fetchPlayersByLeague(league_id);

  return (

    <main>
      {modNotFoundMessage && (
        <WrongPage someText={'There is no user with that email'} originalPath={`/dashboard/leagues/${league_id}/edit`}></WrongPage>
      )}
      {existentLeagueUserMessage && (
        <WrongPage someText={'Selected user is already admin of this League'} originalPath={`/dashboard/leagues/${league_id}/edit`}></WrongPage>
      )}
      {modAddedMessage && (
        <AlertsPage someText={'User was successfully added as mod to this League'} originalPath={`/dashboard/leagues/${league_id}/edit`}></AlertsPage>
      )}



      <Breadcrumbs
        breadcrumbs={[
          { label: 'Leagues', href: '/dashboard/leagues' },
          {
            label: 'Edit League',
            href: `/dashboard/leagues/${league_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form league_id={league_id} league_name={league.leagueName} players={players} tournaments={tournaments} mods={mods.leagueMods} user_email={user_email!}/* players={players} */ />
    </main>
  );
}
import { auth } from '@/auth'
import { leagueServices } from '@/services/league'
import { playerServices } from '@/services/player'
import { tournamentServices } from '@/services/tournament'
import Breadcrumbs from '@/src/ui/games/breadcrumbs'
import CreateForm from '@/src/ui/games/create-form'
import SelectLeagueForm from '@/src/ui/games/select-league-form'
import SelectTournamentForm from '@/src/ui/games/select-tournament-form'

export default async function Page(props: {
  searchParams?: Promise<{
    league_id?: string
    tournament_id?: string
    player1id?: string
  }>
}) {

  const session = await auth();
  const user_email: string = session?.user?.email!

  const { fetchLeaguesWithTournamentsByUserEmail } = leagueServices;
  const leaguesWithTournaments = await fetchLeaguesWithTournamentsByUserEmail(user_email);
  
  const { fetchPlayersByLeagueOwner } = playerServices;
  //const { players } = await fetchPlayersByUserEmail(user_email)


  const { fetchTournamentDataByLeagueId } = tournamentServices;

  
  const leagueSearchParams = await props.searchParams
  const tournamentSearchParams = await props.searchParams
  const league_id = leagueSearchParams?.league_id || ''
  const tournament_id = tournamentSearchParams?.tournament_id || ''
  
  
  const setTournaments = async (league_id : string) => {
    const tournaments = await fetchTournamentDataByLeagueId(league_id);
    return tournaments;
  }

  const setPlayers = async (league_id : string) => {
    const players = await fetchPlayersByLeagueOwner(league_id);
    return players;
  }
  

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

      {!league_id && <SelectLeagueForm leagues={leaguesWithTournaments.arrayOfLeaguesWithTournaments} />}

      {league_id && <>
        {!tournament_id && <SelectTournamentForm league_id={league_id} tournaments={(await setTournaments(league_id)).tournaments} />}
        </>
      }

      {tournament_id && (
        <>
          <CreateForm league_id={league_id} tournament_id={tournament_id} players={(await setPlayers(league_id)).players} />
        </>
      )}
    </main>
  )
}

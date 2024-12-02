import { leagueServices } from '@/services/league'
import { playerServices } from '@/services/player'
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

  const { fetchSelectLeagueData } = leagueServices;
  const { fetchPlayersByLeague } = playerServices;

  const { leagues } = await fetchSelectLeagueData();

  const leagueSearchParams = await props.searchParams
  const tournamentSearchParams = await props.searchParams
  const league_id = leagueSearchParams?.league_id || ''
  const tournament_id = tournamentSearchParams?.tournament_id || ''

  const { players } = await fetchPlayersByLeague('here should go the league_id eventually')

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

      {!league_id && <SelectLeagueForm leagues={leagues} />}

      {league_id && <>
        {!tournament_id && <SelectTournamentForm league_id={league_id} />}
        </>
      }

      {tournament_id && (
        <>
          <CreateForm league_id={league_id} tournament_id={tournament_id} players={players} />
        </>
      )}
    </main>
  )
}

import { fetchPlayersByLeague, fetchSelectLeagueData } from '@/services/lib/data'
import Breadcrumbs from '@/src/ui/games/breadcrumbs'
import CreateForm from '@/src/ui/games/create-form'
import SelectLeagueForm from '@/src/ui/games/select-league-form'
import SelectTournamentForm from '@/src/ui/games/select-tournament-form'

export default async function Page(props: {
  searchParams?: Promise<{
    leagueid?: string
    tournamentid?: string
    player1id?: string
  }>
}) {
  const { leagues } = await fetchSelectLeagueData()
  const leagueSearchParams = await props.searchParams
  const tournamentSearchParams = await props.searchParams
  const leagueId = leagueSearchParams?.leagueid || ''
  const tournamentId = tournamentSearchParams?.tournamentid || ''
  const player1Id = tournamentSearchParams?.player1id || ''

  const { players } = await fetchPlayersByLeague('here should go the leagueId eventually')

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

      {/* for debugging purposes {leagueId && (<div>League id: {leagueId}</div>)}
      {tournamentId && (
        
        <div>Tournament id: {tournamentId}</div>
        
      )}
      {player1Id && (
        
        <div>Player1 id: {player1Id}</div>
        
      )} */}

      {!leagueId && <SelectLeagueForm leagues={leagues} />}

      {leagueId && <>{!tournamentId && <SelectTournamentForm leagueId={leagueId} />}</>}

      {tournamentId && (
        <>
          <CreateForm leagueId={leagueId} tournamentId={tournamentId} players={players} />
        </>
      )}
    </main>
  )
}

import { auth } from '@/auth'
import { leagueServices } from '@/services/league'
import { players } from '@/services/lib/placeholder-data'
import { playerServices } from '@/services/player'
import { tournamentServices } from '@/services/tournament'
import Breadcrumbs from '@/src/ui/games/breadcrumbs'
import CreateForm from '@/src/ui/games/create-form'
import SelectLeagueForm from '@/src/ui/games/select-league-form'
import SelectTournamentForm from '@/src/ui/games/select-tournament-form'
import Link from 'next/link'

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
  
  const { fetchPlayersByLeagueOwner, fetchPlayersByUserEmail } = playerServices;
  //const { players } = await fetchPlayersByUserEmail(user_email)
  const playersOfUser = (await fetchPlayersByUserEmail(user_email)).players

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

      {leaguesWithTournaments.arrayOfLeaguesWithTournaments.length == 0 && (
          <div className='my-2 p-2 flex flex-row items-center gap-2 rounded-md border-2 border-red-400  text-red-400'>
             <div className='text-black font-bold'>x</div>
             <div>You have no leagues & tournaments associated with your account. Please
             <Link
                href={"/dashboard/leagues"} className='text-blue-600'> create leagues </Link>
                and tounaments to insert games</div>
             </div>
      )}

      {playersOfUser.length == 0 && (
        <div className='my-2 p-2 flex flex-row items-center gap-2 rounded-md border-2 border-red-400  text-red-400'>
          <div className='text-black font-bold'>x</div>
          <div>
          Warning: there are no players associated with your user. You wont be able to create games for the leagues you own. Please 
          <Link
          href={"/dashboard/players"} className='text-blue-600'> create players </Link>
            </div>
            <div>first.</div>
          </div>
      )}


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

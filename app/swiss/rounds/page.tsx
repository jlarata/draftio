import { TournamentProvider } from '@/src/swiss/providers/tournament'
import Second from '@/src/swiss/views/Second'
import { playerServices } from '@/services/player';
import Home from '@/src/swiss/views/Home'



export default async function RoundsPage() {
  const { fetchPlayersByLeague } = playerServices;
  /*clearly have to change this*/ 
  const a_league_id = "00000000-0000-0000-0000-000000000000"
  const fetchedPlayers = await fetchPlayersByLeague(a_league_id)
  return (
    <>
      <Second fetchedPlayers={fetchedPlayers.players} />
    </>
  )
}

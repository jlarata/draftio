import { TournamentProvider } from '@/src/swiss/providers/tournament'
import Second from '@/src/swiss/views/Second'
import { playerServices } from '@/services/player';
import Home from '@/src/swiss/views/Home'



export default async function RoundsPage() {
  const { fetchPlayersByLeague } = playerServices;
  const fetchedPlayers = await fetchPlayersByLeague("here should go a league id")
  return (
    <>
      <Second fetchedPlayers={fetchedPlayers.players} />
    </>
  )
}

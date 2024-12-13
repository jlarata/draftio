
import { League, PlayersTableType, Player } from '@/services/lib/definitions';
import { playerServices } from '@/services/player';

export default async function PlayersTable({
  //league,
}: {
  //league: League;
}) {

  /* the games component uses query and currentpage for displaying the games.
  is this necessary on the players component? is not preferable a simple, albeit long list?

  const games = await fetchFilteredGames(query, currentPage);*/

  const { fetchPlayersByLeague } = playerServices;
  const players : Player[] = (await fetchPlayersByLeague("someLeagueId-> thats where the props leaguefield is going")).players;
  
  return (
    <div>
        <h1>hola lauti esto ya funca:</h1>
        <select>
          {players.map((players, i) => {
            return (
              <option 
              key={players.id+i}
              value={players.id}>
                {players.username}
              </option>
            )})
          }
        </select>
      </div>
  );
}





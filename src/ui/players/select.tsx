
import { auth } from '@/auth';
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

  const session = await auth();
  const user_email: string = session?.user?.email!
  const { fetchPlayersByLeague } = playerServices;
  const players: Player[] = (await fetchPlayersByLeague(user_email)).players;

  return (
    <div>
      <h1>hola lauti reemplacé el método hardcodeado y ahora hay uno que toma los players de la sesion guardada en cookies. si no ves nada es que no estás logueado:</h1>
      <select>
        {players.map((players, i) => {
          return (
            <option
              key={players.id + i}
              value={players.id}>
              {players.username}
            </option>
          )
        })
        }
      </select>
    </div>
  );
}





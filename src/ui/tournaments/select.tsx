
import { auth } from '@/auth';
import { League, PlayersTableType, Player } from '@/services/lib/definitions';
import { playerServices } from '@/services/player';

export default async function PlayersTable({
  //league,
}: {
  //league: League;
}) {

  const session = await auth();
  const user_email: string = session?.user?.email!

  const { fetchPlayersByUserEmail } = playerServices;
  const players : Player[] = (await fetchPlayersByUserEmail(user_email)).players;
  
  return (
    <div>
        <h1>hola lauti reemplacé el método hardcodeado y ahora hay uno que toma los players de la sesion guardada en cookies. si no ves nada es que no está slogueado:</h1>
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





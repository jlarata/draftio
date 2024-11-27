import { UpdateGame, DeleteGame } from '@/source/ui/games/buttons';
import { fetchFilteredGames } from '@/services/lib/data';

export default async function GamesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const games = await fetchFilteredGames(query, currentPage);


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {games?.map((game) => (
              <div
                key={game.game_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{game.league_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{game.tournament_name}</p>
                  </div>
                  {/* <InvoiceStatus status={invoice.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium"> {game.date}
                      {/* {formatCurrency(invoice.amount)} */}
                    </p>
                    <p>
                        Player 1: {game.player1}
                    </p>
                    <p>
                        Wins: {game.player1Wins}
                    </p>
                    <p>
                        Player 2: {game.player2}
                    </p>
                    <p>
                        Wins: {game.player2Wins}
                    </p>
                    <p>
                        Round: {game.round}
                    </p>

                    {game.result === 1 ? 
                      <p>
                      {game.player1} Won
                    </p>
                    : 
                      game.result === 2 ?
                      <p>
                        {game.player2} Won
                      </p>
                    :
                    <p>
                      Tie
                    </p>
                    }


                    
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateGame id={game.game_id} />
                    <UpdateGame id={game.game_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  League
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tournament
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Player 1
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Wins
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Player 2
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Wins
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Round 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Result
                </th>
                
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {games?.map((game) => (
                <tr
                  key={game.game_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{game.league_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {game.tournament_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatCurrency(invoice.amount)} */}
                    {game.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {game.player1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {game.player1Wins}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {game.player2}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {game.player2Wins}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {game.round}
                  </td>
                  
                  {game.result === 1 ? 
                      <td className="whitespace-nowrap px-3 py-3">
                      {game.player1} won
                      </td>
                    : 
                      game.result === 2 ?
                      <td className="whitespace-nowrap px-3 py-3">
                        {game.player2} won
                      </td>
                    :
                    <td>
                      Tie
                    </td>
                    }
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateGame id={game.game_id} />
                      <UpdateGame id={game.game_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

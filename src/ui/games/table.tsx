import { GameJoinedWith2Players } from "@/services/lib/definitions";
import { DeleteGame, UpdateGame } from "./buttons";


export default async function GamesTable({
  query,
  currentPage,
  games,
}: {
  query: string;
  currentPage: number;
  games: GameJoinedWith2Players[];
}) {

  /* console.log(query);
  console.log(currentPage);
  console.log(games.length); */

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {games?.map((game, index) => (
              <div
                key={`${game.game_id}_${index}`}
                className="mb-2 w-full rounded-md bg-white p-4"
              >

                <div className="flex w-full items-center justify-between pt-4">
                  <div>



                    {game.result === 1 ? (
                      <p className="text-xl font-medium">
                        <span className="font-bold"> {game.player1} </span>{game.player1Wins} vs <span className="font-light"> {game.player2} </span>{game.player2Wins}
                      </p>
                    ) : game.result === 2 ? (
                      <p className="text-xl font-medium">
                        <span className="font-light"> {game.player1} </span> {game.player1Wins} vs <span className="font-bold"> {game.player2} </span>{game.player2Wins}
                      </p>
                    ) : (
                      <p className="text-xl font-medium">
                        <span className=""> {game.player1} </span> {game.player1Wins} vs <span className=""> {game.player2} </span>{game.player2Wins} <span className="font-bold"> | Tie</span>
                      </p>
                    )}

                    <p>Round: {game.round}</p>
                    <p>Tournament: {game.tournament_name} | {game.date}</p>
                    <p>League: {game.league_name}</p>

                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateGame game_id={game.game_id} />
                    <DeleteGame game_id={game.game_id} />
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
              {games?.map((game, index) => (
                <tr
                  key={`${game.game_id}_${index}`}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p className="truncate max-w-48">{game.league_name}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                  <p className="truncate max-w-48">{game.tournament_name}</p>
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
                  <td className="whitespace-nowrap px-3 py-3">{game.round}</td>

                  {game.result === 1 ? (
                    <td className="whitespace-nowrap px-3 py-3">
                      {game.player1} won
                    </td>
                  ) : game.result === 2 ? (
                    <td className="whitespace-nowrap px-3 py-3">
                      {game.player2} won
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-3 py-3">Tie</td>
                  )}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateGame game_id={game.game_id} />
                      <DeleteGame game_id={game.game_id} />
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

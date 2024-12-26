

import { League, PlayersTableType, Player } from '@/services/lib/definitions';
import Search from '../search';
import { playerServices } from '@/services/player';

export default async function PlayersTable({
  //league,
  query, currentPage
}: {
  //league: League;
  query: string;
  currentPage: number;
}) {

  /* the games component uses query and currentpage for displaying the games.
  is this necessary on the players component? is not preferable a simple, albeit long list?

  const games = await fetchFilteredGames(query, currentPage);*/

  const { fetchPlayersByLeague } = playerServices;
  const players : Player[] = (await fetchPlayersByLeague("someLeagueId-> thats where the props leaguefield is going")).players;
  
  return (
    <>
    <div className="w-full md:w-1/2">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {players.map((player, i) => (
                  <div
                    key={player.id+i}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            {/* we could have an Avatar for each player maybe
                             <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            /> */}
                            <p>{player.username}</p>
                          </div>
                        </div>
                        {/*
                        WIP: add role <p className="text-sm text-gray-500">
                          {player.role}
                        </p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    {/* WIP add role 
                    <th scope="col" className="px-3 py-5 font-medium">
                      Role
                    </th> */}
                    {/* <th scope="col" className="px-3 py-5 font-medium">
                      Total Invoices
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th> */}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {players.map((player, i) => (
                    <tr key={player.id+i} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                         {/*  <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                          <p>{player.username}</p>
                        </div>
                      </td>
                      {/* WIP ADD role 
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {player.role}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}



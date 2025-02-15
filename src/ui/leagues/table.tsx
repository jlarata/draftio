

import { League } from '@/services/lib/definitions';
import Search from '../search';
import { leagueServices } from '@/services/league';
import { DeleteLeague, UpdateLeague } from './buttons';
import { tournamentServices } from '@/services/tournament';

export default async function LeaguesTable({
  user_id,
  query, currentPage
}: {
  user_id: string;
  query: string;
  currentPage: number;
}) {

  /* the leagues component uses query and currentpage for displaying the leagues.
  is this necessary on the leagues component? dont think so
  const games = await fetchFilteredGames(query, currentPage);*/

  //const { fetchSelectLeagueData } = leagueServices;
  const { fetchLeagueByPlayerId } = leagueServices
  const leagues: League[] = ((await fetchLeagueByPlayerId(user_id)).leagues)

  const { fetchTournamentDataByLeagueId } = tournamentServices
  /* aca probablemente: meter un for loop que construya un array de tournaments por liga. 
  const { tournaments } = await fetchTournamentDataByLeagueId(league_id); */


  return (
    <>
      <div className="w-full md:w-1/2">
        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                  {leagues.map((league, i) => (
                    <div
                      key={league.id + i}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="mb-2 flex items-center">
                            <div className="flex items-center gap-3">
                              {/* we could have an Avatar for each league?
                             <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            /> */}
                              <p>{league.name}</p>
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
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-gray-900">
                    {leagues.map((league, i) => (
                      <tr key={league.id + i} className="group">
                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                          <div className="flex items-center justify-between gap-3">
                            {/*  <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                            <p>{league.name}</p>
                            <div className='flex items-center gap-2'>
                              <UpdateLeague league_id={league.id} />
                              <DeleteLeague id={league.id} />
                            </div>
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



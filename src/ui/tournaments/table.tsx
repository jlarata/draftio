

import { Tournament } from '@/services/lib/definitions';
import { tournamentServices } from '@/services/tournament';
import { DeleteTournament } from './buttons';

export default async function TournamentsTable({
  //league,
  query, currentPage
}: {
  //league: League;
  query: string;
  currentPage: number;
}) {

  /* the games component uses query and currentpage for displaying the games.
  is this necessary on the tournaments component? is not preferable a simple, albeit long list?

  const games = await fetchFilteredGames(query, currentPage);*/

  const { fetchTournamentDataByLeagueId } = tournamentServices;
  const tournaments : Tournament[] = (await fetchTournamentDataByLeagueId("00000000-0000-0000-0000-000000000000")).tournaments;
  

  
  return (
    <>
    <div className="w-full md:w-1/2">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {tournaments.map((tournament, i) => (
                  <div
                    key={tournament.id+i}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{tournament.name} | {tournament.date.toString()}</p>
                            <DeleteTournament id={tournament.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name & Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {tournaments.map((tournament, i) => (
                    <tr key={tournament.id+i} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center justify-between ">
                         {/*  <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                          <p>{tournament.name} | {tournament.date.toString()}</p>
                          {/* <UpdateTournament tournament_id={tournament.id} /> */}
                          <DeleteTournament id={tournament.id} />
                        </div>
                      </td>
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



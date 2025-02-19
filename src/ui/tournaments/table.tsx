

import { League, TournamentForLeaguesTable } from '@/services/lib/definitions';
import { DeleteTournament, UpdateTournament } from './buttons';

export default async function TournamentsTable({
  //league,
  query, currentPage,
  tournaments, leagues
}: {
  //league: League;
  query: string;
  currentPage: number;
  tournaments: TournamentForLeaguesTable[];
  leagues: League[]
}) {

  return (
    <>
      <div className="w-full md:w-1/2">
        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-md bg-gray-200 p-2 md:pt-0">
                <div className="md:hidden">
                  {tournaments.map((tournament, i) => (
                    <div
                      key={tournament.id + i}
                      className="mb-2 mt-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-around rounded-md border-l border-b pl-2">
                        <div>
                          <div className="mb-2 flex flex-col items-center">
                            <div className="flex gap-3">
                              <p className='text-xl'>{tournament.name} | <span className='text-sm'>{tournament.date.toString()}</span></p>
                              <DeleteTournament id={tournament.id} />
                            </div>
                            {leagues.map((league, i) => (
                              league.id == tournament.league_id ?
                                <div>
                                  <p className='text-xs'>League : {league.name}</p>
                                </div>
                                :
                                null
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <table className="hidden border-separate border-spacing-4 min-w-full rounded-md bg-gray-200 text-gray-900 md:table">
                  {/* <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                    <tr>
                      <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                        Name & Date
                      </th>
                    </tr>
                  </thead> */}

                  <tbody className="divide-y divide-gray-200 text-gray-900">
                    {tournaments.map((tournament, i) => (
                      <tr key={tournament.id + i} className="group">
                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-xl text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                          <div className="flex items-center justify-between ">
                            {/*  <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                            <p>{tournament.name} | <span className='text-base'>{tournament.date.toString()}</span></p>
                            <div className='flex flex-row items-center'>
                              <UpdateTournament id={tournament.id} />
                              <DeleteTournament id={tournament.id} />
                            </div>

                          </div>
                          {leagues.map((league, i) => (
                            league.id == tournament.league_id ?
                              <div>
                                <p className='indent-8 text-xs'>League : {league.name}</p>
                              </div>
                              :
                              null
                          ))}
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





import { LeagueWithTournaments } from '@/services/lib/definitions';
import { DeleteTournament, UpdateTournament } from './buttons';

export default async function TournamentsTable({
  query, currentPage,
  leaguesWithTournaments
}: {
  query: string;
  currentPage: number;
  leaguesWithTournaments: LeagueWithTournaments[]
}) {

  return (
    <>
      <div className="w-full md:w-1/2">
        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="rounded-md bg-gray-200 p-1 md:pt-0">

                {/*  mobile */}
                <div className="md:hidden">
                  {leaguesWithTournaments.map((leagueWithTournaments, i) => (
                    <div
                      key={leagueWithTournaments.id + i}
                      className="mb-px mt-px w-full rounded-md bg-white p-3"
                    >
                      {leagueWithTournaments.tournaments.map((tournament, i) => (
                        <div className="flex items-center p-1 mb-2 mt-2 justify-around rounded-md border-l border-b pl-2">
                          <div>
                            <div className="mb-2 flex flex-col items-center">
                              <div className="flex gap-3 items-center">
                                <p className='text-xl'>{tournament.name} | <span className='text-sm'>{tournament.date.toLocaleDateString('en-CA')}</span></p>
                                <div className='flex flex-row items-center'>

                                <UpdateTournament id={tournament.id} />
                                <DeleteTournament id={tournament.id} />
                                </div>
                              </div>
                              <div>
                                <p className='text-xs'>League : {leagueWithTournaments.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

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

                  <tbody className="flex flex-col divide-y-4 divide-gray-200 text-gray-900">
                    {leaguesWithTournaments.map((leagueWithTournaments, i) => (
                      <tr key={leagueWithTournaments.id + i} className='flex flex-col divide-y-4 divide-gray-200 '>
                        {/*  <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                        {leagueWithTournaments.tournaments.map((tournament, i) => (
                          <td className="bg-white py-5 pl-4 pr-3 text-xl text-black rounded-md sm:pl-6">
                            <div className="flex items-center justify-between ">
                              <p>{tournament.name} | <span className='text-base'>{tournament.date.toLocaleDateString('en-CA')}</span></p>
                              <div className='flex flex-row items-center'>
                                <UpdateTournament id={tournament.id} />
                                <DeleteTournament id={tournament.id} />
                              </div>

                            </div>
                            <div>
                              <p className='indent-8 text-xs'>League : {leagueWithTournaments.name}</p>
                            </div>
                          </td>

                        ))}
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



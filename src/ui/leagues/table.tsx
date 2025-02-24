

import { LeagueWithTournaments } from '@/services/lib/definitions';
import Search from '../search';
import { DeleteLeague, UpdateLeague } from './buttons';
import { inter } from '../fonts';

export default async function LeaguesTable({
  user_email,
  leagues,
  query, currentPage
}: {
  user_email: string;
  leagues: LeagueWithTournaments[];
  query: string;
  currentPage: number;
}) {

  /* the leagues component uses query and currentpage for displaying the leagues.
  is this necessary on the leagues component? dont think so
  const games = await fetchFilteredGames(query, currentPage);*/
  //console.log(leagues)

  return (
    <>
      <div className="w-full">
        {leagues.length == 0 ?
          <div className="flex w-full items-center justify-between">
            <h4 className={`${inter.className} text-2xl`}>There are no leagues yet. Create one!</h4>
          </div>
          :
          <div className="flex w-full items-center justify-between">
            <h1 className={`${inter.className} text-2xl`}>Your leagues</h1>
          </div>
        }

        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-md bg-gray-100 p-2 md:pt-0">
                <div className="md:hidden">
                  {leagues.map((league, i) => (
                    <div
                      key={league.id + i}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div className="text-2xl flex items-center gap-3">
                          <p>{league.name}</p>
                        </div>

                        {league.league_admin == user_email ?
                          <div className='flex gap-2'>
                            <UpdateLeague league_id={league.id} />
                            <DeleteLeague id={league.id} />
                          </div>
                          :
                          null
                        }
                      </div>
                      {league.tournaments.length == 0 ?
                        <div>
                          <p className='indent-3'>
                            No tournaments yet.
                          </p>
                        </div>
                        :
                        <div>
                          <p className='indent-3'>
                            Tournaments:
                          </p>
                          {league.tournaments.map((tournament, i) => (
                            <p key={tournament.id + i} className='text-sm indent-8 whitespace-nowrap'>
                              {tournament.name} | {tournament.date.toLocaleDateString('en-CA')}
                              {tournament.champion_id && (" | Champion: " + tournament.champion_name)}
                            </p>
                          ))}
                        </div>
                      }
                    </div>
                  ))}
                </div>
                <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                  <thead className="rounded-md bg-gray-100 text-left text-sm font-normal">
                    <tr>
                      <th scope="col" className="px-4 py-1 font-medium sm:pl-6">
                        {/* better if no tag? Name */}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y-4 divide-gray-100 text-gray-900">
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
                            <p className="text-2xl">{league.name}</p>
                            {league.league_admin == user_email ?
                              <div className='flex items-center gap-2'>
                                <UpdateLeague league_id={league.id} />
                                <DeleteLeague id={league.id} />
                              </div>
                              :
                              null
                            }
                          </div>
                          {league.league_admin == user_email ?
                            <p className="text-xs italic font-thin">admin: you</p>
                            :
                            <p className="text-xs italic font-thin">admin: {league.league_admin}</p>
                          }



                          {league.tournaments.length == 0 ?
                            <p className='text-lg indent-6'>No tournaments yet</p>
                            :
                            <div>
                              <p className='text-lg indent-3'>
                                {league.tournaments.length} Tournaments:
                              </p>
                              {league.tournaments.map((tournament, i) => (

                                <p key={tournament.id + i} className='indent-8'>
                                  {tournament.name} | {tournament.date.toLocaleDateString('en-CA')}
                                  {tournament.champion_id && " | Champion: " + tournament.champion_name}
                                </p>

                              ))}
                            </div>
                          }
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



import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { inter } from '../fonts';
import { gamesByDate } from '@/services/lib/utils';
import { gameServices } from '@/services/game';



const { fetchLatestGames } = gameServices;
const latestGames = await fetchLatestGames();
latestGames.sort(gamesByDate)


export default async function LatestGames() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Latest Games
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {latestGames.map((game, i) => {
             
               
            return (
              <div
                key={`${game.game_id}_${i}`}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {game.league_name} <span className=' font-normal'>| {game.tournament_name} ({game.date})</span>
                    </p>
                    {game.result === 1 ? 
                      <p className="hidden text-sm text-gray-700 sm:block">
                      <span className='font-bold'>{game.player1} ({game.player1Wins})</span> vs {game.player2} ({game.player2Wins})
                    </p>
                    : 
                      game.result === 2 ?
                      <p className="hidden text-sm text-gray-700 sm:block">
                      {game.player1} ({game.player1Wins}) vs <span className='font-bold'>{game.player2} ({game.player2Wins})</span>
                    </p>
                    :
                      <p className="hidden text-sm text-gray-700 sm:block">
                      {game.player1} ({game.player1Wins}) vs {game.player2} ({game.player2Wins})<span className='font-bold'> (tie)</span>
                      </p>
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
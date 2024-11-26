import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { inter } from '@/app/ui/fonts';
import { fetchLatestGames } from '@/app/lib/data';

const latestGames = await fetchLatestGames();
function GamesByDate(a: { date: string; }, b: { date: string; }){
  if (a.date < b.date)
  {return -1;}
  if (a.date > b.date)
  {return +1;}
  return 0;
}
latestGames.sort(GamesByDate);
//console.log(latestGames);


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
                key={game.game_id}
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
                    <p className="hidden text-sm text-gray-700 sm:block">
                      {game.player1} ({game.player1Wins}) vs {game.player2} ({game.player2Wins})
                    </p>
                    {/* <p className="hidden text-sm text-gray-700 sm:block">
                      m1: {game.match1} | m2: {game.match2} | m3: {game.match3} 
                    </p> */}
                  </div>
                </div>
                {/* <p
                  className={`${inter.className} text-center text-sm font-medium md:text-base`}
                >
                  Winner: {game.result}
                </p> */}
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
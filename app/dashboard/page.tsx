import { Card } from '@/app/ui/dashboard/cards';
import { inter } from '@/app/ui/fonts';
//import GamesChart from '@/app/ui/dashboard/games-chart';
//import LatestGames from '@/app/ui/dashboard/latestGames';
import { fetchCardData } from '@/app/lib/data';
 
/*const {
  numberOfGames,
  numberOfLeagues,
  numberOfPlayers,
  numberOfTournaments
} = await fetchCardData();*/

export default async function Page() {
  

  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Leagues" value={numberOfLeagues} type="leagues" />
        <Card title="Tournaments" value={numberOfTournaments} type="tournaments" />
        <Card title="Total Players" value={numberOfPlayers} type="players" />
        <Card title="Total Games" value={numberOfGames} type="games" /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
{/*         <GamesChart />
        <LatestGames /> */}
      </div>
    </main>
  );
}
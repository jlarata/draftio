
import { inter } from '@/source/ui/fonts';
import CardWrapper from '@/source/ui/dashboard/cards';
import GamesChart from '@/source/ui/dashboard/games-chart';
import LatestGames from '@/source/ui/dashboard/latest-games';
import { Suspense } from 'react';
import { GamesChartSkeleton, LatestGamesSkeleton,CardSkeleton } from '@/source/ui/skeletons';

export default async function Page() {
  
  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">       
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
       <Suspense fallback={<GamesChartSkeleton />}>
        <GamesChart />
       </Suspense>
       <Suspense fallback={<LatestGamesSkeleton />}>
        <LatestGames />
       </Suspense>
      </div>
    </main>
  );
}
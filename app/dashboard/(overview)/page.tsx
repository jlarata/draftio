import { auth } from "@/auth";
import CardWrapper from "@/src/ui/dashboard/cards";
import GamesChart from "@/src/ui/dashboard/games-chart";
import LatestGames from "@/src/ui/dashboard/latest-games";
import { inter } from "@/src/ui/fonts";
import { CardSkeleton, GamesChartSkeleton, LatestGamesSkeleton } from "@/src/ui/skeletons";
import { Suspense } from "react";

export default async function Page() {

  const session = await auth()
  console.log("hola, ", session?.user?.id, session?.user?.email, session?.user?.name)

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

import { fetchGamesPages } from "@/services/lib/data";
import AlertsPage from "@/src/ui/alerts/alerts";
import { inter } from "@/src/ui/fonts";
import { CreateGame } from "@/src/ui/games/buttons";
import Pagination from "@/src/ui/games/pagination";
import GamesTable from "@/src/ui/games/table";
import Search from "@/src/ui/search";
import { GamesTableSkeleton } from "@/src/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Games | Draftio Dashboard",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    gamecreated?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchGamesPages(query);
  const gameCreatedMessage = searchParams?.gamecreated || "";

  return (
    <>
       {gameCreatedMessage && (
        <AlertsPage someText={"Game successfully created"}></AlertsPage> 
      )}

      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${inter.className} text-2xl`}>All games</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search games with one of the playes named like..." />
          <CreateGame />
        </div>
        <Suspense key={query + currentPage} fallback={<GamesTableSkeleton />}>
          <GamesTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}

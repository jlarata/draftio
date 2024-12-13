import { playerServices } from "@/services/player";
import AlertsPage from "@/src/ui/alerts/alerts";
import { inter } from "@/src/ui/fonts";
import Pagination from "@/src/ui/games/pagination";
import PlayersTable from "@/src/ui/players/table";
import Search from "@/src/ui/search";
import { GamesTableSkeleton } from "@/src/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Players | Draftio Dashboard",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    playercreated?: string;
    playeredited?: string;
  }>;
}) {



  const { fetchPlayersPages } = playerServices

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPlayersPages(query);

  let playerCreatedMessage = searchParams?.playercreated || "";
  let playerEditedMeesage = searchParams?.playeredited || "";


  return (
    <>
    
      {playerCreatedMessage && (
        <AlertsPage someText={'Game succesfully created'}></AlertsPage> 
      )} 

      {playerEditedMeesage && (
        <AlertsPage someText={'Game succesfully edited!'}></AlertsPage> 
      )} 

      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${inter.className} text-2xl`}>All players</h1>
        </div>
       {/*
         WIP add search bar functionality for players component
       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search players named like..." />

           //<CreatePlayer />
       
        </div> */}
        <Suspense key={query + currentPage} fallback={<GamesTableSkeleton />}>
           <PlayersTable query={query} currentPage={currentPage}></PlayersTable>
        </Suspense>
        {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div> */}
      </div>
    </>
  );
}

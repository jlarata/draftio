import { auth } from "@/auth";
import { playerServices } from "@/services/player";
import AlertsPage from "@/src/ui/alerts/alerts";
import { inter } from "@/src/ui/fonts";
import Pagination from "@/src/ui/games/pagination";
import CreateForm from "@/src/ui/players/create-form";
import PlayersTable from "@/src/ui/players/table";
import Search from "@/src/ui/search";
import DashboardSkeleton, { GamesTableSkeleton, LatestGamesSkeleton } from "@/src/ui/skeletons";
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
    playerdeleted?:string;
  }>;
}) {

  const session = await auth();
  const user_email: string = session?.user?.email!

  const { fetchPlayersPages } = playerServices
  const { fetchPlayersByUserEmail } = playerServices;

  const fetchedPlayers = await fetchPlayersByUserEmail(user_email)

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPlayersPages(query, user_email);

  let playerCreatedMessage = searchParams?.playercreated || "";
  let playerEditedMessage = searchParams?.playeredited || "";
  let playerDeletedMessage = searchParams?.playerdeleted || "";

  return (
    <>
    
      {playerCreatedMessage && (
        <AlertsPage someText={'Player succesfully created'} originalPath="/dashboard/players"></AlertsPage> 
      )} 

      {playerEditedMessage && (
        <AlertsPage someText={'Player succesfully edited!'} originalPath="/dashboard/players"></AlertsPage> 
      )} 

      {playerDeletedMessage && (
        <AlertsPage someText={'Player succesfully deleted!'} originalPath="/dashboard/players"></AlertsPage> 
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
        <div className="flex flex-row gap-4">
        <Suspense key={query + currentPage} fallback={<LatestGamesSkeleton />}>
           <PlayersTable query={query} currentPage={currentPage} user_email={user_email}></PlayersTable>
           <CreateForm fetchedPlayers={fetchedPlayers.players} user_email={user_email}></CreateForm>
        </Suspense>
        </div>
        
        {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div> */}
      </div>
    </>
  );
}

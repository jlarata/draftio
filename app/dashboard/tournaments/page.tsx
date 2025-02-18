import { tournamentServices } from "@/services/tournament";
import TournamentsTable from "@/src/ui/tournaments/table";


import AlertsPage from "@/src/ui/alerts/alerts";
import { inter } from "@/src/ui/fonts";
//import Pagination from "@/src/ui/games/pagination";
//import CreateForm from "@/src/ui/players/create-form";
import Search from "@/src/ui/search";
import { LatestGamesSkeleton } from "@/src/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";
import CreateForm from "@/src/ui/tournaments/create-form";
import { auth } from "@/auth";
import { leagueServices } from "@/services/league";

export const metadata: Metadata = {
  title: "Tournaments | Draftio Dashboard",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    tournamentcreated?: string;
    tournamentedited?: string;
    tournamentdeleted?: string;
  }>;
}) {

  const session = await auth();
  const user_email: string = session?.user?.email!

  const { fetchTournamentsByUserEmail } = tournamentServices
  const tournaments = await fetchTournamentsByUserEmail(user_email)

  const { fetchLeaguesByUserEmail } = leagueServices
  const leagues = await fetchLeaguesByUserEmail(user_email)

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  let tournamentCreatedMessage = searchParams?.tournamentcreated || "";
  let tournamentEditedMessage = searchParams?.tournamentedited || "";
  let tournamentDeletedMessage = searchParams?.tournamentdeleted || "";

  return (
    <>

      {tournamentCreatedMessage && (
        <AlertsPage someText={'Tournament succesfully created'} originalPath="/dashboard/tournaments"></AlertsPage>
      )}

      {tournamentEditedMessage && (
        <AlertsPage someText={'Tournament succesfully edited!'} originalPath="/dashboard/tournaments"></AlertsPage>
      )}

      {tournamentDeletedMessage && (
        <AlertsPage someText={'Tournament succesfully deleted!'} originalPath="/dashboard/tournaments"></AlertsPage>
      )}

      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${inter.className} text-2xl`}>Your Tournaments</h1>
        </div>
        {/*
         WIP add search bar functionality for tournaments component??
       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search tournaments named like..." />

        </div> */}
        <div className="flex flex-col gap-4 md:flex-row">
          <Suspense key={query + currentPage} fallback={<LatestGamesSkeleton />}>
            <TournamentsTable tournaments={tournaments.tournaments} leagues={leagues.leagues} query={query} currentPage={currentPage}></TournamentsTable>
            <CreateForm leagues={leagues.leagues}></CreateForm>
          </Suspense>
        </div>

        {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div> */}
      </div>
    </>
  );
}

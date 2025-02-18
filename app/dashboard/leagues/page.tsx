import { auth } from "@/auth";
import { leagueServices } from "@/services/league";
import AlertsPage, { WrongPage } from "@/src/ui/alerts/alerts";
import Pagination from "@/src/ui/games/pagination";
import LeaguesTable from "@/src/ui/leagues/table";
import CreateForm from "@/src/ui/leagues/create-form";
import Search from "@/src/ui/search";
import { LatestGamesSkeleton } from "@/src/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Leagues | Draftio Dashboard",
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        leaguecreated?: string;
        leagueedited?: string;
        leaguedeleted?: string;
    }>;
}) {

    const session = await auth();
    const user_id : string = session?.user?.id!
    const user_email : string = session?.user?.email!

    const { fetchSelectLeagueData } = leagueServices
    
    const fetchedLeagues = await fetchSelectLeagueData()

    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    let leagueCreatedMessage = searchParams?.leaguecreated || "";
    let leagueEditedMessage = searchParams?.leagueedited || "";
    let leagueDeletedMessage = searchParams?.leaguedeleted || "";

    return (
        <>

            {leagueCreatedMessage && (
                <AlertsPage someText={'League succesfully created'} originalPath="/dashboard/leagues"></AlertsPage>
            )}

            {leagueEditedMessage && (
                <AlertsPage someText={'League succesfully edited!'} originalPath="/dashboard/leagues"></AlertsPage>
            )}

            {leagueDeletedMessage && (
                <WrongPage someText={'You have great power but not great responsability!'} originalPath="/dashboard/leagues"></WrongPage>
            )}

            <div className="w-full">
                

                <div className="flex w-full gap-4">
                    <Suspense key={query + currentPage} fallback={<LatestGamesSkeleton />}>
                        <LeaguesTable user_id={user_id} user_email={user_email} query={query} currentPage={currentPage}></LeaguesTable>
                    </Suspense>
                </div>
                <div className="flex flex-row gap-4 justify-center">
                    <Suspense key={query + currentPage} fallback={<LatestGamesSkeleton />}>
                        <CreateForm user_id={user_id} user_email={user_email}  /* fetchedPlayers={fetchedPlayers.players} */ ></CreateForm>
                    </Suspense>
                </div>

                {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div> */}
            </div>
        </>
    );
}


import { auth } from '@/auth';
import { leagueServices } from '@/services/league';
import { LeagueWithTournaments } from '@/services/lib/definitions';
import { playerServices } from '@/services/player';
import Home from '@/src/swiss/views/Home'

export default async function Page() {


  const session = await auth();
  const user_email: string = session?.user?.email!
  
  const { fetchLeaguesWithTournamentsByUserEmail } = leagueServices
  const leagues: LeagueWithTournaments[] = ((await fetchLeaguesWithTournamentsByUserEmail(user_email)).arrayOfLeaguesWithTournaments)

  const { fetchPlayersByUserEmail } = playerServices;
  
  //vos tenías estos dos de abajo lauti, uno hardcodeado, otro con todos los players del mundo
  //en su luar ahora fetched players te está pasando solo los players disponibles para el usuario logueado
  //(mismos players se usan en todas sus ligas, en todos sus torneos)

  //en cuanto a la leagueId, no se para q la usabas exactamente pero
  // fijate en las líneas 13 y 14 que te estoy fetcheando todas las ligas del usuario logueado
  //cada cual con sus torneos y campeones
  
   const fetchedPlayers = await fetchPlayersByUserEmail(user_email)


  return (
    <>
      <Home user_email={user_email} selectedPlayers={fetchedPlayers.players} leagueArrayId={leagues}/>
    </>
  )
}

// import MainLayout from "@/src/swiss/components/Layout/MainLayout"
// import { TournamentProvider } from "@/src/swiss/providers/tournament"
// import '@/src/swiss/styles/index.css'
// import { AppProps } from "next/app"
// import { Inter } from "next/font/google"
// import Head from "next/head"
// import Home from "@/src/swiss/views/Home";

// const inter = Inter({ subsets: ['latin'] })

// export default function Page({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <title>Swiss</title>
//         <meta name='description' content='' />
//         <meta name='viewport' content='width=device-width, initial-scale=1' />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>
//       {/* <TournamentProvider> */}
//         <main className={`${inter.className}`}>
//           <MainLayout>
//             <Home></Home>
//             {/* <Component {...pageProps} /> */}
//           </MainLayout>
//         </main>
//       {/* </TournamentProvider> */}
//     </>
//   )
// }

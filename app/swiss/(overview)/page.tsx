import { playerServices } from '@/services/player';
import Home from '@/src/swiss/views/Home'

export default async function Page() {

  const { fetchPlayersByLeague } = playerServices;
  const fetchedPlayers = await fetchPlayersByLeague("here should go a league id")

  return (
    <>




      <Home fetchedPlayers={fetchedPlayers.players} />
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

import MainLayout from "@/src/swiss/components/Layout/MainLayout";
import { TournamentProvider } from "@/src/swiss/providers/tournament";
import { inter } from "@/src/ui/fonts";
import '@/src/swiss/styles/index.css'
import '@/src/ui/global.css';
import { Html, Head, Main, NextScript } from 'next/document'



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      {/* <Head>
        <title>Swiss</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}
      <body>
      {/* <Main className={`${inter.className}`}> */}
            <TournamentProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </TournamentProvider>
      
      {/* </Main>   */}
      </body>
    </html>
  );
}

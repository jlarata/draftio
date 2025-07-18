import MainLayout from "@/src/swiss/components/Layout/MainLayout";
import { TournamentProvider } from "@/src/swiss/providers/tournament";
import { inter } from "@/src/ui/fonts";
import '@/src/swiss/styles/index.css'
import '@/src/ui/global.css';
import { Html, Head, Main, NextScript } from 'next/document'
import { auth } from "@/auth";
import { User } from "@/services/lib/definitions";



export default function SwissLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {/* <Main className={`${inter.className}`}> */}
      <TournamentProvider>
        <MainLayout>
          {children}
        </MainLayout>
      </TournamentProvider>

      {/* </Main>   */}
    </>
  );
}

import { TournamentProvider } from "@/src/swiss/providers/tournament";
import { inter } from "@/src/ui/fonts";
import '@/src/ui/global.css';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html><body>
    <TournamentProvider>
      {children}
    </TournamentProvider>
    </body></html>
  );
}

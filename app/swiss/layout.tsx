import { TournamentProvider } from "@/src/swiss/providers/tournament";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
      <TournamentProvider>
          {children}
      </TournamentProvider>
    
  );
}
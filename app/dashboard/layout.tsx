import { auth } from "@/auth";
import { User } from "@/services/lib/definitions";
import SideNav from "@/src/ui/dashboard/sidenav";

export const experimental_ppr = true;

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user : User = {
    name: session?.user?.name!,
    player_id: session?.user?.id!,
    email: session?.user?.email!,
    password: "what?"
  }

  return (
    <div>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">

          <SideNav {...user}/>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>

    </div>
  );
}
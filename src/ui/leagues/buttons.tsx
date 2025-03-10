
import { deleteLeague } from '@/services/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UpdateLeague({ league_id }: { league_id : string }) {
  return (
    <Link
      href={`/dashboard/leagues/${league_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

 export function DeleteLeague({ id, hasTournaments }: { id: string, hasTournaments : boolean }) {
  const deleteLeagueWithId = deleteLeague.bind(null, id)
  //console.log("has touraments? "+hasTournaments)
  return (
    <><form action={deleteLeagueWithId}>
        <button
        type="submit"
        disabled={(hasTournaments == true)}
        className="rounded-md border p-2 hover:bg-gray-100 text-red-500">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
        
      </form>
    </>
  );
} 

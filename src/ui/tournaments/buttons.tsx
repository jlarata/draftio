
import { deleteTournament } from '@/services/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UpdateTournament({ id }: { id : string }) {
  return (
    <Link
      href={`/dashboard/tournaments/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTournament({ id }: { id: string }) {
  const deleteTournamentWithId = deleteTournament.bind(null, id)
  return (
    <><form action={deleteTournamentWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5 text-red-600" />
        </button>
      </form>
    </>
  );
}

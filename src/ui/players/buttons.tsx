
import { deletePlayer } from '@/services/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

/* export function UpdatePlayer({ player_id }: { player_id : string }) {
  return (
    <Link
      href={`/dashboard/games/${player_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
} */

export function DeletePlayer({ id }: { id: string }) {
  const deletePlayerWithId = deletePlayer.bind(null, id)
  return (
    <><form action={deletePlayerWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>
    </>
  );
}

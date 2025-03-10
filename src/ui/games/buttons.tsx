import { gameServices } from '@/services/game';
import { deleteGame } from '@/services/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

/* export function SelectLeague() {
  return (
    <Link
      href="/dashboard/games/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Game</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
} */

export function CreateGame() {
  return (
    <Link
      href="/dashboard/games/create"
      className="flex h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <span className="hidden md:block">Create Game</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdateGame({ game_id }: { game_id : string }) {
  return (
    <Link
      href={`/dashboard/games/${game_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteGame({ game_id }: { game_id: string }) {
  const deleteGameWithId = deleteGame.bind(null, game_id)
  return (
    <><form action={deleteGameWithId}>
        <button type="submit" className="rounded-md border p-2 text-red-500 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

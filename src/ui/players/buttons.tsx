'use client';

import { deletePlayer, updatePlayer } from '@/services/lib/actions';
import { CheckIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { SetStateAction, useState } from 'react';

export function UpdatePlayerButton({ id, username, playerEditing, setThisPlayerToEdit }: { id: string, username: string, playerEditing: number, setThisPlayerToEdit : (playerEditing : number) => void}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const updatePlayerWithId = updatePlayer.bind(null, id, username)
  const handleUpdatePlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsUpdating(true);
    await updatePlayerWithId()
    setThisPlayerToEdit(9999999)
    setIsUpdating(false);
  }

  return (
    <form>
      {isUpdating ?
        null : <button onClick={handleUpdatePlayer}
          type="submit" className="bg-green-500 rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">update</span>
          <CheckIcon className="w-4" />
        </button>}
    </form>
  );
}

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
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePlayerWithId = deletePlayer.bind(null, id)
    const handleDeletePlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsDeleting(true);
      await deletePlayerWithId()
      setIsDeleting(false);
    }
    return (
      <><form>
        <button onClick={handleDeletePlayer} type="submit" className="rounded-md border p-2 hover:bg-gray-100 text-red-500">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>
      </>
    );
  }

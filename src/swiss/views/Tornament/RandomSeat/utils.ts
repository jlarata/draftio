import { Player } from '@/services/lib/definitions'

const getRandomPlayers = (players: (Player | undefined)[]) => {
  return players
    .filter((player) => player !== undefined)
    .map((player) => {
      return { player, random: Math.random() }
    })
    .sort((a, b) => a.random - b.random)
    .map((player) => player.player)
}

export const randomSeatsUtils = {
  getRandomPlayers,
}

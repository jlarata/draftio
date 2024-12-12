const getRandomPlayers = (players: string[]) => {
  return players
    .map((player) => {
      return { player, random: Math.random() }
    })
    .sort((a, b) => a.random - b.random)
    .map((player) => player.player)
}

export const randomSeatsUtils = {
  getRandomPlayers,
}

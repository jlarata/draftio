import { Match } from '../Match'
import { Player } from '../Player'

const getRandomInt = (max: number, seed: number) => {
  //Posibles seeds: fecha transformada en numero .getTime seguro hay bardos de formato
  //esto creo que esta mal definido por alguna razon {max,seed}:{max: number, seed: number} Esto es solo para objetos ?
  var seedCalculation = (seed * 9301 + 49297) % 233280
  var randomNumber = Math.floor(0 + (seedCalculation / 233280) * max)

  return randomNumber
}

const get5DigitSeed = ({ date }: { date: string }): number => {
  return Number(new Date(date).getTime().toString().slice(-5))
}

const arePlayersDuplicatedInMatches = ({ match1, match2 }: { match1: Match; match2: Match }): boolean => {
  return (
    match1.player1.player.name === match2.player1.player.name ||
    match1.player1.player.name === match2.player2.player.name ||
    match1.player2.player.name === match2.player1.player.name ||
    match1.player2.player.name === match2.player2.player.name
  )
}

const filterByPlayedMatch = ({ unplayedMatches }: { unplayedMatches: Match[] }): Match[] => {
  return unplayedMatches.filter((match) => {
    return match.played !== true
  })
}

const sameWinsMatches = ({ unplayedMatches }: { unplayedMatches: Match[] }): Match[] => {
  return unplayedMatches.filter((unplayedMatch) => {
    return unplayedMatch.player1.player.wins === unplayedMatch.player2.player.wins
  })
}

const calculateRoundsForSwiss = ({ players }: { players: Player[] }): number | undefined => {
  const mathLog = Math.log2(players.length)
  if (Number.isInteger(mathLog)) {
    return mathLog
  }
  return undefined
}

const createNumberArray = ({ unplayerMatchLength }: { unplayerMatchLength: number }): number[] => {
  return Array.from(Array(unplayerMatchLength).keys())
}

const reduceUnplayedMatches = ({ unplayedMatch }: { unplayedMatch: Match[] }): Set<Player> => {
  return unplayedMatch.reduce((acc, curr) => {
    acc.add(curr.player1.player)
    acc.add(curr.player2.player)
    return acc
  }, new Set<Player>())
}

const setUnplayedMatchesByPlayedMatches = ({
  unplayedMatches,
  matches,
}: {
  unplayedMatches: Match[]
  matches: Match[]
}): Match[] => {
  const filteredMatches = unplayedMatches.filter((unplayedMatch) => {
    return !matches.some((match) => {
      return gameUtils.arePlayersDuplicatedInMatches({
        match1: unplayedMatch,
        match2: match,
      })
    })
  })
  return filteredMatches
}

const setPlayedMatchesByRound = ({
  unplayedMatches,
  matches,
}: {
  unplayedMatches: Match[]
  matches: Match[]
}): void => {
  matches.map((match) => {
    unplayedMatches.map((unplayedMatch) => {
      if (
        match.player1.player.name === unplayedMatch.player1.player.name &&
        match.player2.player.name === unplayedMatch.player2.player.name
      ) {
        unplayedMatch.setPlayed()
      }
    })
  })
}

export const gameUtils = {
  getRandomInt,
  get5DigitSeed,
  arePlayersDuplicatedInMatches,
  filterByPlayedMatch,
  sameWinsMatches,
  calculateRoundsForSwiss,
  createNumberArray,
  reduceUnplayedMatches,
  setUnplayedMatchesByPlayedMatches,
  setPlayedMatchesByRound,
}

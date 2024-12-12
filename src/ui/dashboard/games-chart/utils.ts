import { GameAxis, TournamentAxis } from '@/services/lib/definitions'
import { gamesChartConfig } from './config'
const { monthsDictionary } = gamesChartConfig

const generateYAxis = (
  games: GameAxis[],
  tournaments: TournamentAxis[],
  last12Months: { month: string; games: number }[]
) => {
  const yAxisLabels = []

  const populateMonths = games.forEach((game) => {
    tournaments.forEach((tournament) => {
      if (tournament.id === game.tournament_id) {
        let tostringMonth = monthsDictionary[tournament.date.getMonth()]
        let indexOfMonth = last12Months.findIndex((x) => x.month === tostringMonth)
        last12Months[indexOfMonth].games++
      }
    })
  })

  const highestRecord = Math.max(...last12Months.map((month) => month.games))
  const topLabel = highestRecord

  for (let i = topLabel; i >= 0; i -= 1) {
    yAxisLabels.push(`${i}`)
  }

  return { yAxisLabels, topLabel }
}

const generateLast12Months = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const helpArray = []

  let currenMonthVariable = currentMonth + 1
  for (let i = 11; i >= 0; i--) {
    helpArray[i] = currenMonthVariable
    currenMonthVariable > 1 ? currenMonthVariable-- : (currenMonthVariable = 12)
  }

  let last12Months = helpArray.map((m) => ({ month: monthsDictionary[m - 1], games: 0 }))
  return last12Months
}

export const gamesChartUtils = {
  generateYAxis,
  generateLast12Months,
}

import { CalendarIcon } from '@heroicons/react/24/outline'
import { inter } from '../../fonts'
import { gamesChartUtils } from './utils'
import { gamesChartConfig } from './config'
import { ChartServices } from '@/services/games-chart'


export default async function GamesChart(
  {user_email} : {user_email : string}
) {
  /* const { fetchSelectTournamentData } = tournamentServices
  const { tournaments } = await fetchSelectTournamentData({ leagueId }) */
  const { fetchGamesAndTournamentsForChart } = ChartServices;
  const { games, tournaments } = await fetchGamesAndTournamentsForChart(user_email);

  const { generateLast12Months, generateYAxis } = gamesChartUtils

  const last12Months = generateLast12Months()
  const { yAxisLabels, topLabel } = generateYAxis(games, tournaments, last12Months)

  if (!games || games.length === 0) {
    return <p className='mt-4 text-gray-400'>No data available.</p>
  }

  return (
    <div className='w-full md:col-span-4'>
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>Last 12 months</h2>

      <div className='rounded-xl bg-gray-100 p-4'>
        <div className='flex flex-row gap-2'>
          <div
            className='mb-6 flex-col justify-between text-sm text-gray-400 flex'
            style={{ height: `${gamesChartConfig.chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          <div className='grid sm:grid-cols-13 mt-0 grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4'>
            {last12Months.map((month) => (
              <div key={month.month} className='flex flex-col items-center gap-2'>
                <div
                  className='w-full rounded-md bg-green-300'
                  style={{
                    height: `${(gamesChartConfig.chartHeight / topLabel) * month.games}px`,
                  }}
                ></div>
                <p className='-rotate-90 text-sm text-gray-400 sm:rotate-0'>{month.month}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center pb-2 pt-6'>
          <CalendarIcon className='h-5 w-5 text-gray-500' />
          <h3 className='ml-2 text-sm text-gray-500 '>Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useTournament } from '@/src/swiss/context/tournament'
import css from './style.module.css'
import PlayerScoreDiv from '@/src/swiss/views/PlayerRound'
import Button from '@/src/swiss/components/Button'
import { useRouter } from 'next/navigation'



const Result = () => {
  //const { tournament } = useTournament()  
  const router = useRouter()

  return (
    <>
      <div className='md:w-1/2 mt-4 ml-4 mb-4 mr-4'
      //</>{css.container}
      >
        <PlayerScoreDiv 
        //containerClassName={css.scoreTableContainer} 
        />
      </div>
      <div className='flex flex-row gap-2 ml-4'>
        <Button
          label={'Go Back'}
          onClick={() => router.push('././')}
          className='button-primary'>
        </Button>
        <Button
          label={'Go to my Dashbard'}
          onClick={() => router.push('../../../dashboard')}
          className='button-primary'>
        </Button>
      </div>

    </>
  )
}

export default Result

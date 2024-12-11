'use client';
import { ReactNode, useState } from 'react'
import { TournamentContext } from '../context/tournament'
import { Tournament } from '../classes/Tournament'

type Props = { children: ReactNode }

export const TournamentProvider = ({ children }: Props) => {
  const [tournament, setTournament] = useState<Tournament>(new Tournament())
  return <TournamentContext.Provider value={{ tournament, setTournament }}>{children}</TournamentContext.Provider>
}

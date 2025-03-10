import {
  PuzzlePieceIcon,
  UserGroupIcon,
  TrophyIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import { inter } from '../fonts';
import { cardServices } from '@/services/card';

const iconMap = {
  games: PuzzlePieceIcon,
  players: UserGroupIcon,
  leagues: TableCellsIcon,
  tournaments: TrophyIcon,
};

const { fetchCardData } = cardServices;

//export const dynamic = 'force-dynamic';
export default async function CardWrapper(
  {user_email} : {user_email : string},
) {
  const {
    numberOfGames,
    numberOfLeagues,
    numberOfPlayers,
    numberOfTournaments
  } = await fetchCardData(user_email);

  return (
    <>
      <Card title="Leagues" value={numberOfLeagues} type="leagues" />
      <Card title="Tournaments" value={numberOfTournaments} type="tournaments" />
      <Card title="Total Players" value={numberOfPlayers} type="players" />
      <Card title="Total Games" value={numberOfGames} type="games" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'games' | 'players' | 'leagues' | 'tournaments';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-100 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${inter.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        
      >
        {value}
      </p>
    </div>
  );
}
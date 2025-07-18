'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  TrophyIcon,
  TableCellsIcon,
  PuzzlePieceIcon, 
  UserIcon,
  InboxStackIcon,
  BugAntIcon,
} from '@heroicons/react/24/outline';
import { User } from '@/services/lib/definitions';
import { InboxIcon } from '@heroicons/react/20/solid';

export default function NavLinks(user : User) {

  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Leagues', href: '/dashboard/leagues', icon: TableCellsIcon },
    { name: 'Tournaments', href: '/dashboard/tournaments', icon: TrophyIcon },
    {
      name: 'Players',
      href: '/dashboard/players',
      icon: UserGroupIcon,
    },
    { name: 'Games', href: '/dashboard/games', icon: PuzzlePieceIcon },
    
    user.name ?
    { name: `${user.name} | Control Panel`, href: '/dashboard/cp', icon: UserIcon} :
    { name: `${user.email} | Control Panel`, href: '/dashboard/cp', icon: UserIcon},
    
    user.name ?
    { name: `${user.email}`, href: '/dashboard/cp', icon: InboxStackIcon} : 
    { name: ``, href: '/', icon: ''} ,
  ];


  const pathname = usePathname();
  return (
    <>
      {links.map((link, i) => {
        const LinkIcon = link?.icon;
        return (
          <Link
            key={i}
            href={link?.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-300 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-green-300 text-green-600': pathname === link?.href,
              },
            )}>
              {link.icon != InboxStackIcon ?
              <LinkIcon className="w-6" /> : null} 
            
            <p className="hidden md:block">{link?.name}</p>
          </Link>
        );
      })}
      <Link
            
            href={'/swiss'}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-300 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-green-300 text-green-600': pathname === '/swiss',
              },
            )}>
              < BugAntIcon className="w-6 text-green-600" />
            
            <p className="hidden md:block">Go Draft!</p>
          </Link>
    </>
  );
}

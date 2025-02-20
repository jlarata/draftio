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
} from '@heroicons/react/24/outline';
import { User } from '@/services/lib/definitions';
import { InboxIcon } from '@heroicons/react/20/solid';

export default function NavLinks(user : User) {

  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
      name: 'Players',
      href: '/dashboard/players',
      icon: UserGroupIcon,
    },
    { name: 'Games', href: '/dashboard/games', icon: PuzzlePieceIcon },
    { name: 'Tournaments', href: '/dashboard/tournaments', icon: TrophyIcon },
    { name: 'Leagues', href: '/dashboard/leagues', icon: TableCellsIcon },

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
    </>
  );
}

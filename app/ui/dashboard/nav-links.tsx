'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  TrophyIcon,
  TableCellsIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
/* const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
]; */

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
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-300 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-green-300 text-green-600': pathname === link.href,
              },
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

import Link from 'next/link';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/src/ui/dashboard/nav-links';
import { signOut, auth } from '@/auth';
import { User } from '@/services/lib/definitions';

//export default function UserNav(user: User) {

export default function UserNav({ user_email }: { user_email: string }) {

    return (
        <>
            {user_email ?
                <div className='flex flex-row h-[48px] w-full md:w-fit items-center justify-start gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium md:px-3'>
                    <div className='flex flex-row h-[48px] items-center pr-4 border-gray-500 border-r-2'>
                        Welcome, {user_email}</div>
                    <div><form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/' });
                        }}
                    ><button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <PowerIcon className="w-6" />
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </form>
                    </div>
                </div> :
                <div className='flex flex-row p-2'>no user</div>}

        </>

    );
}


{/* <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-green-300 p-4 md:h-40"
        href="/"
      >
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks {...user} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div> */}





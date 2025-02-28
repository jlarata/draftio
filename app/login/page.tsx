import LoginForm from '@/src/ui/login-form';
import { Suspense } from 'react';
import css from './style.module.css'
import Image from 'next/image';
import zorak from '@/public/zorak.png'
import AlertsPage from '@/src/ui/alerts/alerts';


export default async function LoginPage(props: {
    searchParams?: Promise<{
        userCreated?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const userCreatedMessage = searchParams?.userCreated || "";



    return (
        <main className='flex items-center justify-center md:h-screen'>
            {userCreatedMessage && (
                <AlertsPage someText={'User Succesfully Created. You can log in now'} originalPath="/dashboard"></AlertsPage>
            )}
            <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
                <div className='mt-8 flex h-20 w-full items-center justify-center rounded-lg border-x-2 border-green-500 bg-gray-50 p-3 md:h-36'>
                    <div className='flex-row items-center align-bottom hidden md:block rounded-md'>
                        <Image
                            className={css.zorak}
                            src={zorak}
                            alt="d3c logo"
                            width={120}
                            priority
                        />
                    </div>
                    <div className='ml-1 md:hidden rounded-md'>
                        <Image
                            className={css.zorak}
                            src={zorak}
                            alt="d3c logo"
                            width={70}
                            priority
                        />
                    </div>
                </div>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    )
}
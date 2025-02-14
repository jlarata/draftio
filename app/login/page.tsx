import LoginForm from '@/src/ui/login-form';
import { Suspense } from 'react';
import css from './style.module.css'
import Image from 'next/image';
import zorak from '@/public/zorak.png'


export default function LoginPage() {
    return (
        <main className='flex items-center justify-center md:h-screen'>
            <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
                <div className='flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36'>
                    <div className='flex text-white md:w-36'>
                        {/* <div className={css.container}> */}
                            <div className=' ml-4 hidden md:block rounded-md border-2 border-blue-900'>
                                <Image
                                    className="destkopLogo self-center"
                                    src={zorak}
                                    alt="d3c logo"
                                    width={70}
                                    priority
                                />
                            </div>

                            <div className='ml-1 md:hidden rounded-md border-2 border-blue-900'>
                                <Image
                                    className="self-center "
                                    src={zorak}
                                    alt="d3c logo"
                                    width={70}
                                    priority
                                />
                            </div>
                        {/* </div> */}
                    </div>
                </div>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    )
}
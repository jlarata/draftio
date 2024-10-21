import Image from "next/image";
import d3cimg from '../public/d3cimg.jpg';
import styles from '@/app/ui/home.module.css';
import { inter, poppins, agdasima, roboto } from "./ui/fonts";

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <div className={"styles.shape"}> */}
          <Image
            className="hidden md:block estkopLogo self-center"
            src={d3cimg}
            alt="d3c logo"
            width={480}
            priority
          />

          <Image
            className="md:hidden estkopLogo self-center"
            src={d3cimg}
            alt="d3c logo"
            width={180}
            priority
          />
          <h1 className="text-center sm:text-left font-[family-name:var(--font-inter)]">esto carga font inter con tailwind</h1>
          <h2 className={`${inter.className}`}>esto también pero con next fonts</h2>
          <div><h2 className={`${agdasima .className}`}>los botones están en roboto, los links en poppins, esta frase en agdasima </h2></div>

          <div className={`${roboto.className} flex gap-4 items-center flex-col sm:flex-row`} >
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              lets get drafty!
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              data (no opinion)
            </a>
          </div>
      </main>
      <footer className={`${poppins.className} row-start-3 flex gap-6 flex-wrap items-center justify-center`}>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4" 
          href=""
          target="_blank"
          rel="noopener noreferrer"
          >
          <Image
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          mtg?
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          draft?
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          d3c.org →
        </a>
      </footer>
    </div>
  );
}


/* import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import styles from '@/app/ui/home.module.css'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">

     <div className={styles.shape} /> 

      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
         <AcmeLogo /> 
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          Add Hero Images Here 
        </div>
      </div>
    </main>
  );
}
 */
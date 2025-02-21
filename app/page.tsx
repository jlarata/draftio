import Image from "next/image";
import d3cimg from '../public/d3cimg.jpg';
import styles from '@/app/ui/home.module.css';
import { inter, poppins, agdasima, roboto } from "@/src/ui/fonts";
import Link from "next/link";


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
        {/*           <h1 className="text-center sm:text-left font-[family-name:var(--font-inter)]">esto carga font inter con tailwind</h1>
          <h2 className={`${inter.className}`}>esto también pero con next fonts</h2>
          <div><h2 className={`${agdasima .className}`}>los botones están en roboto, los links en poppins, esta frase en agdasima </h2></div> */}


        <div className="flex flex-row w-full justify-around">
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href={"/swiss"}>lets get drafty!</Link>

          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href={"/dashboard"}>data (no opinion)</Link>
        </div>

      </main>
      <footer className={`${poppins.className} row-start-3 flex gap-6 flex-wrap items-center justify-center`}>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          /> */}
          mtg?
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          /> */}
          draft?
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          /> */}
          d3c.org →
        </a>
      </footer>
    </div>
  );
}
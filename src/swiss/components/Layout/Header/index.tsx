import css from './style.module.css'
import Image from "next/image";
import zorak from "../../../../../public/zorak.png";


type Props = {}


const Header = (props: Props) => {
  return (
    <div className={css.container}>

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
    </div>
  )
}

export default Header
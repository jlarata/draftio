import { Inter, Poppins, Agdasima, Roboto } from 'next/font/google';


export const inter = Inter({ subsets: ['latin']});
export const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    style: 'normal',
    display: 'swap'
  })
export const agdasima = Agdasima({ 
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap'
    });
export const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap'
  })
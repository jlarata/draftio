'use client'

import { showSwal } from "@/app/lib/alerts";
import { useRouter } from "next/navigation";
import { Message } from "@/app/lib/definitions";


export default function AlertsPage(
   {someText} : {someText : string} ) {

  const router = useRouter()

  showSwal(someText);

   router.replace('/dashboard/games')
   
  return (
    <></>
 );
} 
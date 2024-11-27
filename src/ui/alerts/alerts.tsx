'use client'

import { showSwal } from "@/services/lib/alerts";
import { useRouter } from "next/router";




export default function AlertsPage(
   {someText} : {someText : string} ) {

  const router = useRouter()

  showSwal(someText);

   router.replace('/dashboard/games')
   
  return (
    <></>
 );
} 
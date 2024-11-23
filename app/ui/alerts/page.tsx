'use client'

import { showSwal } from "@/app/lib/alerts";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";




export default function AlertsPage({text} : {text : string}) {

  const router = useRouter()

  showSwal(text);

   router.replace('/dashboard/games')
   
  return (
    <></>
 );
} 
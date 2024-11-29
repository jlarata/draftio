'use client'

import { showSwal } from "@/services/lib/alerts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AlertsPage(props :
   {someText : string} ) {

   const [message, setMessage] = useState('');
   const router = useRouter()
   
   useEffect(() => {
      setMessage(props.someText);
      showSwal(message);
      router.replace('/dashboard/games')
   })
   return (<></>)
} 
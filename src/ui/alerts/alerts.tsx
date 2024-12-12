'use client'

import { successShowSwal } from "@/services/lib/alerts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AlertsPage(props :
   {someText : string} ) {

   const [message, setMessage] = useState('');
   const router = useRouter()
   
   useEffect(() => {
      setMessage(props.someText);
      successShowSwal(message);
      router.replace('/dashboard/games')
   })
   return (<></>)
} 
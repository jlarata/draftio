'use client'

import { errorShowSwal, successShowSwal } from "@/services/lib/alerts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function AlertsPage(props :
   {someText : string, originalPath : string} ) {

   const [message, setMessage] = useState('');
   const router = useRouter()
   
   useEffect(() => {
      setMessage(props.someText);
      successShowSwal(message);
      router.replace(`${props.originalPath}`)
   })
   return (<></>)
} 

export function WrongPage(props :
   {someText : string, originalPath : string} ) {

   const [message, setMessage] = useState('');
   const router = useRouter()
   
   useEffect(() => {
      setMessage(props.someText);
      errorShowSwal(message);
      router.replace(`${props.originalPath}`)
   })
   return (<></>)
} 
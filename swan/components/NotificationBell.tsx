"use client"

import { useEffect, useState } from "react"
import { socket } from "@/lib/socket"

export default function NotificationBell(){

const [notifications,setNotifications] =
useState<any[]>([])

useEffect(()=>{

socket.on(
"reportCreated",
(report)=>{

setNotifications(prev=>[
{
message:`New Report: ${report.title}`
},
...prev
])

})

socket.on(
"reportStatusUpdated",
(report)=>{

setNotifications(prev=>[
{
message:`${report.title} → ${report.status}`
},
...prev
])

})

return()=>{

socket.off("reportCreated")
socket.off("reportStatusUpdated")

}

},[])

return(

<div className="relative">

<button className="text-xl">

🔔

{notifications.length > 0 && (

<span className="ml-1 text-red-500">

({notifications.length})

</span>

)}

</button>

</div>

)

}
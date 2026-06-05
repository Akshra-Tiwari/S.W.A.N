"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import ProtectedRoute
from "@/components/ProtectedRoute"

import DashboardStatusChart
from "@/components/dashboard-status-chart"

import ReportsLineChart
from "@/components/reports-line-chart"

import NotificationBell
from "@/components/NotificationBell"

import ActivityFeed
from "@/components/ActivityFeed"

import SeverityChart
from "@/components/SeverityChart"

import {

Card,
CardContent,
CardHeader,
CardTitle

} from "@/components/ui/card"

import {

Button

} from "@/components/ui/button"

import {

Badge

} from "@/components/ui/badge"

import {

ArrowLeft,
Droplets,
TrendingUp,
AlertCircle,
Users,
FileText,
MapPin

} from "lucide-react"

import {

bhopalLakes

} from "@/components/bhopal-lakes-map"

import {

getDashboardStats

} from "@/services/dashboardService"

import {

socket

} from "@/lib/socket"

export default function DashboardPage(){

const router=
useRouter()

const [loading,setLoading]=
useState(true)

const [stats,setStats]=
useState({

totalReports:0,

pendingReports:0,

investigatingReports:0,

resolvedReports:0,

highSeverityReports:0,

high:0,

medium:0,

low:0,

reportsByStatus:[],

recentReports:[] as any[],

reportsOverTime:[] as any[]

})


useEffect(()=>{

const load=
async()=>{

try{

const data=

await getDashboardStats()

setStats(data)

}catch(err){

console.log(err)

}

setLoading(false)

}

load()

},[])


useEffect(()=>{

const refresh =
async()=>{

try{

const data =
await getDashboardStats()

setStats(data)

}catch(error){

console.log(error)

}

}

socket.on(

"reportCreated",

refresh

)

socket.on(

"reportStatusUpdated",

refresh

)

socket.on(

"reportDeleted",

refresh

)

return()=>{

socket.off(
"reportCreated"
)

socket.off(
"reportStatusUpdated"
)

socket.off(
"reportDeleted"
)

}

},[])




const activeUsers=
1834

const criticalLakes=

bhopalLakes.filter(

lake=>

lake.healthStatus==="critical"

).length

const goodLakes=

bhopalLakes.filter(

lake=>

lake.healthStatus==="good"

).length



const getStatusColor=
(status:string)=>{

switch(

status?.toLowerCase()

){

case "pending":

return
"bg-yellow-100 text-yellow-700"

case "investigating":

return
"bg-blue-100 text-blue-700"

case "resolved":

return
"bg-green-100 text-green-700"

case "rejected":

return
"bg-red-100 text-red-700"

default:

return
"bg-gray-100 text-gray-700"

}

}



return(

<ProtectedRoute>

<div className="min-h-screen bg-linear-to-br from-cyan-50 via-blue-50 to-teal-50">

<div className="container mx-auto px-4 py-8">


<Button

variant="ghost"

className="mb-6"

onClick={()=>router.push("/")}

>

<ArrowLeft className="mr-2 h-4 w-4"/>

Back

</Button>



<div className="flex justify-between items-center mb-8">

<h1 className="text-4xl font-bold flex gap-3 items-center">

<TrendingUp/>

Dashboard

</h1>

<NotificationBell/>

</div>



<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

<Card>

<CardContent className="pt-6">

<div className="flex justify-between">

<div>

<p>Total Reports</p>

<h2 className="text-3xl font-bold">

{

loading

?

"..."

:

stats.totalReports

}

</h2>

</div>

<FileText/>

</div>

</CardContent>

</Card>


<Card>

<CardContent className="pt-6">

<div className="flex justify-between">

<div>

<p>Users</p>

<h2 className="text-3xl">

{activeUsers}

</h2>

</div>

<Users/>

</div>

</CardContent>

</Card>


<Card>

<CardContent className="pt-6">

<div className="flex justify-between">

<div>

<p>Critical Lakes</p>

<h2 className="text-3xl">

{criticalLakes}

</h2>

</div>

<AlertCircle/>

</div>

</CardContent>

</Card>


<Card>

<CardContent className="pt-6">

<div className="flex justify-between">

<div>

<p>Healthy Lakes</p>

<h2 className="text-3xl">

{goodLakes}

</h2>

</div>

<Droplets/>

</div>

</CardContent>

</Card>

</div>



<div className="grid lg:grid-cols-3 gap-6">


<div className="lg:col-span-2 space-y-6">


<Card>

<CardHeader>

<CardTitle>

Recent Reports

</CardTitle>

</CardHeader>

<CardContent>

<div className="space-y-4">

{

stats.recentReports.length===0

?

<p>No Reports Yet</p>

:

stats.recentReports.map(

(report:any)=>(

<div

key={report._id}

className="border rounded p-4 flex justify-between"

>

<div>

<div className="flex gap-2 items-center">

<MapPin size={16}/>

<b>

{report.title}

</b>

</div>

<p className="text-sm text-gray-600">

{report.description?.slice(0,120)}

...

</p>

</div>

<div

className={`

px-3 py-1 rounded text-xs

${getStatusColor(

report.status

)}

`}

>

{report.status}

</div>

</div>

)

)

}

</div>

</CardContent>

</Card>



<Card>

<CardHeader>

<CardTitle>

Reports Trend

</CardTitle>

</CardHeader>

<CardContent>

<ReportsLineChart

data={

stats.reportsOverTime

}

/>

</CardContent>

</Card>


</div>

<ActivityFeed

activities={

stats.recentReports.map(

(report:any)=>({

message:

`${report.title} (${report.status})`

})

)

}

/>

<div className="space-y-6">


<Card>

<CardHeader>

<CardTitle>

Status Distribution

</CardTitle>

</CardHeader>

<CardContent>

<DashboardStatusChart

pending={
stats.pendingReports
}

investigating={
stats.investigatingReports
}

resolved={
stats.resolvedReports
}

/>

</CardContent>

</Card>

<Card>

<CardHeader>

<CardTitle>

Severity Distribution

</CardTitle>

</CardHeader>

<CardContent>

<SeverityChart

high={stats.high || 0}

medium={stats.medium || 0}

low={stats.low || 0}

/>

</CardContent>

</Card>

<Card>

<CardHeader>

<CardTitle>

Lake Overview

</CardTitle>

</CardHeader>

<CardContent>

{

bhopalLakes.map(

lake=>(

<div

key={lake.id}

className="flex justify-between mb-2"

>

<span>

{lake.name}

</span>

<Badge>

{lake.healthStatus}

</Badge>

</div>

)

)

}

</CardContent>

</Card>


</div>

</div>

</div>

</div>

</ProtectedRoute>

)

}
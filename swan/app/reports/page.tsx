"use client"

import { useEffect, useState } from "react"

import AdminRoute
from "@/components/AdminRoute"

import axios from "axios"

export default function AdminPage(){

const [users,setUsers]=
useState<any[]>([])

const [reports,setReports]=
useState<any[]>([])

const [stats,setStats]=
useState<any>(null)

useEffect(()=>{

loadData()

},[])

const loadData=
async()=>{

try{

const [

usersRes,

reportsRes,

statsRes

] = await Promise.all([

axios.get(
"${process.env.NEXT_PUBLIC_API_URL}/api/admin/users"
),

axios.get(
"${process.env.NEXT_PUBLIC_API_URL}/api/reports"
),

axios.get(
"${process.env.NEXT_PUBLIC_API_URL}/api/analytics"
)

])

setUsers(
usersRes.data || []
)

setReports(
reportsRes.data.reports || []
)

setStats(
statsRes.data
)

}catch(err){

console.log(err)

}

}

const changeRole=
async(

id:string,

role:string

)=>{

await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}/role`,

{ role }

)

loadData()

}

const updateStatus=
async(

id:string,

status:string

)=>{

await axios.put(

`${process.env.NEXT_PUBLIC_API_URL}/api/reports/${id}/status`,

{ status }

)

loadData()

}

const removeReport=
async(id:string)=>{

await axios.delete(

`${process.env.NEXT_PUBLIC_API_URL}/api/reports/${id}`

)

loadData()

}

return(

<AdminRoute>

<div className="p-8">

<h1 className="text-4xl font-bold mb-8">

Admin Dashboard

</h1>

{stats && (

<div className="grid grid-cols-4 gap-4 mb-8">

<div className="border p-4 rounded">

<h2>Total Reports</h2>

<p className="text-2xl">

{stats.totalReports}

</p>

</div>

<div className="border p-4 rounded">

<h2>Pending</h2>

<p className="text-2xl">

{stats.pending}

</p>

</div>

<div className="border p-4 rounded">

<h2>Resolved</h2>

<p className="text-2xl">

{stats.resolved}

</p>

</div>

<div className="border p-4 rounded">

<h2>Resolution Rate</h2>

<p className="text-2xl">

{stats.resolutionRate}%

</p>

</div>

</div>

)}

<h2 className="text-2xl font-bold mb-4">

Users

</h2>

<div className="space-y-3 mb-10">

{users.map((user)=>(

<div
key={user._id}
className="border p-3 rounded flex justify-between"
>

<div>

<p>{user.email}</p>

<p>{user.role}</p>

</div>

<select

value={user.role}

onChange={(e)=>

changeRole(
user._id,
e.target.value
)

}

>

<option value="user">

User

</option>

<option value="admin">

Admin

</option>

</select>

</div>

))}

</div>

<h2 className="text-2xl font-bold mb-4">

Reports

</h2>

<div className="space-y-3">

{reports.map((report:any)=>(

<div

key={report._id}

className="border p-4 rounded"

>

<h3 className="font-bold">

{report.title}

</h3>

<p>

{report.description}

</p>

<div className="flex gap-3 mt-3">

<select

value={report.status}

onChange={(e)=>

updateStatus(

report._id,

e.target.value

)

}

>

<option value="pending">

Pending

</option>

<option value="under_review">

Under Review

</option>

<option value="resolved">

Resolved

</option>

<option value="rejected">

Rejected

</option>

</select>

<button

className="border px-3 py-1"

onClick={()=>

removeReport(

report._id

)

}

>

Delete

</button>

</div>

</div>

))}

</div>

</div>

</AdminRoute>

)

}
"use client"

import { useEffect,useState }
from "react"

import {
useParams
}
from "next/navigation"

import {
getSingleReport
}
from "@/services/reportService"

export default function ReportDetails(){

const params=
useParams()

const [report,setReport]=
useState<any>(null)

useEffect(()=>{

load()

},[])

const load=
async()=>{

const data=
await getSingleReport(
params.id as string
)

setReport(data)

}

if(!report){

return(
<div className="p-8">
Loading...
</div>
)

}

return(

<div className="p-8 space-y-6">

<h1 className="text-4xl font-bold">
{report.title}
</h1>

{
report.imageUrl &&
<img
src={report.imageUrl}
alt=""
className="rounded-lg"
/>
}

<div>

<h2 className="font-bold text-xl">
Description
</h2>

<p>
{report.description}
</p>

</div>

<div className="border rounded p-4">

<h2 className="font-bold">
AI Summary
</h2>

<p>
{
report.aiSummary ||
"No AI Summary"
}
</p>

</div>

<div className="border rounded p-4">

<h2 className="font-bold">
AI Suggested Solution
</h2>

<p>
{
report.aiSolution ||
"No AI Solution"
}
</p>

</div>

<div
className="border rounded p-4"
>

<h2
className="font-bold mb-2"
>

Status

</h2>

<div
className="inline-block px-3 py-2 rounded bg-cyan-100"
>

{report.status}

</div>

</div>

<div
className="border rounded p-4"
>

<h2
className="font-bold mb-2"
>

Severity

</h2>

<div
className="inline-block px-3 py-2 rounded bg-red-100"
>

{report.severity}

</div>

</div>

<div>

<b>Location:</b>

{
report.location?.address
}

</div>
<div
className="border rounded p-4"
>

<h2
className="font-bold mb-2"
>

Coordinates

</h2>

<p>

Lat:

{
report.location?.coordinates?.[1]
}

</p>

<p>

Lng:

{
report.location?.coordinates?.[0]
}

</p>

</div>
<a

href={`https://www.google.com/maps?q=${report.location?.coordinates?.[1]},${report.location?.coordinates?.[0]}`}

target="_blank"

className="text-blue-600 underline"

>

Open In Google Maps

</a>
</div>

)

}
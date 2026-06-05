"use client"

type Props = {

activities:any[]

}

export default function ActivityFeed({

activities

}:Props){

return(

<div className="border rounded p-4">

<h2 className="font-bold mb-4">

Recent Activity

</h2>

<div className="space-y-3">

{

activities.length === 0

?

<p>No activity yet</p>

:

activities.map(

(activity,index)=>(

<div

key={index}

className="border-b pb-2"

>

{activity.message}

</div>

)

)

}

</div>

</div>

)

}
"use client"

import {

PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,

} from "recharts"

type Props={

pending:number

investigating:number

resolved:number

}

export default function DashboardStatusChart({

pending,

investigating,

resolved

}:Props){

const data=[

{

name:"Pending",

value:pending

},

{

name:"Investigating",

value:investigating

},

{

name:"Resolved",

value:resolved

}

]

const COLORS=[

"#f59e0b",

"#3b82f6",

"#10b981"

]

return(

<div className="h-75 w-full">

<ResponsiveContainer>

<PieChart>

<Pie

data={data}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>

{

data.map(

(_,index)=>(

<Cell

key={index}

fill={

COLORS[index]

}

/>

)

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

)

}
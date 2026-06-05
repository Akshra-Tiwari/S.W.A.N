"use client"

import {

PieChart,
Pie,
Tooltip,
ResponsiveContainer

} from "recharts"

type Props={

high:number

medium:number

low:number

}

export default function SeverityChart({

high,

medium,

low

}:Props){

const data=[

{
name:"High",
value:high
},

{
name:"Medium",
value:medium
},

{
name:"Low",
value:low
}

]

return(

<div className="w-full h-80">

<ResponsiveContainer>

<PieChart>

<Pie

data={data}

dataKey="value"

nameKey="name"

outerRadius={100}

/>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

)

}
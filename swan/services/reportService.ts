import api from "@/lib/api"

export const getReports =
async(

page = 1,

search = "",

status = "",

severity = ""

)=>{

const res =

await api.get(

"/reports",

{

params:{

page,

search,

status,

severity

}

}

)

return res.data

}

export const getSingleReport =
async(id:string)=>{

const res =

await api.get(

`/reports/${id}`

)

return res.data

}

export const deleteReport =
async(id:string)=>{

const res =

await api.delete(

`/reports/${id}`

)

return res.data

}

export const updateReportStatus =
async(

id:string,

status:string

)=>{

const res =

await api.put(

`/reports/${id}/status`,

{

status

}

)

return res.data

}

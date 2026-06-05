import api from "@/lib/api"

export const createReport =
async(data:any)=>{

const formData =
new FormData()

formData.append(
"title",
data.title
)

formData.append(
"description",
data.description
)

formData.append(
"image",
data.image
)

formData.append(
"address",
data.address
)

formData.append(
"latitude",
data.latitude
)

formData.append(
"longitude",
data.longitude
)

if(data.reportedBy){

formData.append(
"reportedBy",
data.reportedBy
)

}

const res =

await api.post(

"/reports",

formData,

{

headers:{

"Content-Type":

"multipart/form-data"

}

}

)

return res.data

}
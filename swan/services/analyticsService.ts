import api from "@/lib/api"

export const getAnalytics =
async()=>{

const response =

await api.get(
"/analytics"
)

return response.data

}

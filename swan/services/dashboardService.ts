import api from "@/lib/api"

export const getDashboardStats =
async()=>{

const [

dashboard,

analytics

] = await Promise.all([

api.get(
"/dashboard/stats"
),

api.get(
"/analytics"
)

])

return {

...dashboard.data,

...analytics.data

}

}

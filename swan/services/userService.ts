import api from "@/lib/api"

export const getCurrentUser =
async()=>{

const res =
await api.get(
"/auth/me"
)

return res.data

}

export const updateUserRole =
async(
id:string,
role:string
)=>{

const res =
await api.put(
`/admin/users/${id}/role`,
{
role
}
)

return res.data

}
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function AdminRoute({
children,
}:{
children:React.ReactNode
}){

const {
user,
role,
loading
} = useAuth()

const router =
useRouter()

useEffect(()=>{

if(
!loading &&
(
!user ||
role !== "admin"
)
){

router.push("/")

}

},[
user,
role,
loading,
router
])

if(
loading
){

return(

<div className="p-10">

Loading...

</div>

)

}

if(
!user ||
role !== "admin"
){

return null

}

return <>{children}</>

}

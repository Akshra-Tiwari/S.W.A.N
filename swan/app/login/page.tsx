"use client"

import {

useState

} from "react"

import {

login

}

from "@/services/authService"

import {

useRouter

}

from "next/navigation"

export default function(){

const router=
useRouter()

const [email,setEmail]=
useState("")

const [password,setPassword]=
useState("")

const submit=
async()=>{

try{

await login(

email,

password

)

router.push(
"/dashboard"
)

}catch{

alert(
"Login failed"
)

}

}

return(

<div className="p-10 space-y-4">

<h1 className="text-3xl">

Login

</h1>

<input

className="border p-2"

placeholder="Email"

onChange={

e=>

setEmail(
e.target.value
)

}

/>

<input

type="password"

className="border p-2"

placeholder="Password"

onChange={

e=>

setPassword(
e.target.value
)

}

/>

<button

className="border p-3"

onClick={submit}

>

Login

</button>

</div>

)

}
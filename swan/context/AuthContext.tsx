"use client";

import {
createContext,
useContext,
useEffect,
useState
} from "react";

import axios from "axios";

import {
auth,
googleProvider
} from "@/lib/firebase";

import {
User,
signInWithPopup,
signOut,
onAuthStateChanged
} from "firebase/auth";

const AuthContext =
createContext<any>(null);

export const AuthProvider = ({
children,
}:{
children:React.ReactNode
})=>{

const [
user,
setUser
]=useState<User|null>(null);

const [
role,
setRole
]=useState("user");

const [
loading,
setLoading
]=useState(true);

const syncUser =
async(
firebaseUser:User
)=>{

const token =
await firebaseUser.getIdToken();

await axios.post(
"http://localhost:5000/api/auth/sync-user",
{},
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

try{

const me =
await axios.get(
"http://localhost:5000/api/auth/me",
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setRole(
me.data.role || "user"
);

}catch(error){

console.log(
"Role Fetch Failed",
error
);

setRole(
"user"
);

}

};

useEffect(()=>{

const unsubscribe =

onAuthStateChanged(

auth,

async(
firebaseUser
)=>{

setUser(
firebaseUser
);

if(
firebaseUser
){

try{

await syncUser(
firebaseUser
);

}catch(err){

console.log(
"Sync Failed",
err
);

}

}else{

setRole(
"user"
);

}

setLoading(
false
);

}

);

return ()=>unsubscribe();

},[]);

const login =
async()=>{

await signInWithPopup(
auth,
googleProvider
);

};

const logout =
async()=>{

await signOut(
auth
);

setRole(
"user"
);

};

return(

<AuthContext.Provider

value={{

user,

role,

loading,

login,

logout

}}

>

{children}

</AuthContext.Provider>

);

};

export const useAuth =
()=>useContext(
AuthContext
);

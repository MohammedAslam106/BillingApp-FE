import { createContext,useContext, useEffect, useState } from "react";

const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export default function AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState(null)
    useEffect(()=>{
        setCurrentUser(localStorage.getItem('shopOwner'))
    },[currentUser])
    const signin=async(username,password)=>{
        const response= (await fetch(`${import.meta.env.VITE_PUBLIC_BE_URL}/api/auth/signin`,{
            method:"POST",
            body:JSON.stringify({
                username:username,
                password:password
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }))
        const status=response.status
        const res=await response.json()
        if(status===200){
            localStorage.setItem('shopOwner',res.token)
            setTimeout(()=>{
                setCurrentUser(res.token)
            },1000)
            return res
        }
        else{
            return res
        }
    }
    const signout=()=>{
        localStorage.removeItem('shopOwner')
        window.location.reload()
    }

    return(
        <AuthContext.Provider value={{signin,signout,currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}
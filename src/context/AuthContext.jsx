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
        // console.log(currentUser)
    })
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
        if(status===200){
            const res=await response.json()
            localStorage.setItem('shopOwner',res.token)
            setCurrentUser(res.token)
            window.location.reload()
            // return true
        }
        else{
            return false
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
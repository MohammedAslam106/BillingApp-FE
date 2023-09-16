import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute(){
    const currentUser=localStorage.getItem('shopOwner')
    return(
            currentUser
             ? 
             <Outlet/>
            : 
            <Navigate to={'/signin'}/>
    )
}
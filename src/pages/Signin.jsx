import { useState } from "react"
import { TbEye, TbEyeOff } from "react-icons/tb"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"

export default function Signin(){
    const [showPassword,setShowPassword]=useState(false)
    const {signin,currentUser}=useAuth()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    console.log(window.location.pathname)
    return(
        !currentUser ?
        <>
            <Toaster/>
            {/* <div className="buffer"></div> */}
            <div 
            className=" min-h-screen min-w-[100vw] grid place-items-center">
                <div className=" w-80 border py-8 px-10 rounded shadow-md">
                <h1 className=" w-full font-bold text-3xl text-center">{loading ? <div className=" flex justify-center items-center">
                    <div className='buffer'></div>
                </div>  :'Signin'}</h1>
                    <form id="signin" onSubmit={async(e)=>{
                        e.preventDefault()
                        try {
                            setLoading(true)
                            const signining=await signin(username,password)
                            if(signining.message){
                                toast.error(signining.message)
                            }
                            else if(signining.success){
                                toast.success(signining.success)
                            }
                        } catch (error) {
                            console.log(error.message || error)
                            toast.error(error.message)
                        }finally{
                            setLoading(false)
                            // window.location.reload()
                        }
                    }}>
                    <ul className=" flex flex-col justify-center gap-5">
                        <li className="w-full flex flex-col">
                            <label className=" font-semibold">Username</label>
                            <input required value={username} onChange={(e)=>setUsername(e.target.value)} type="email" name="username" placeholder="username" className="py-2 px-3 rounded shadow-sm text-gray-400 border border-gray-500" />
                        </li>
                        <li className=" w-full flex flex-col">
                            <label className=" font-semibold">Password</label>
                            <div className="relative">
                            <input required value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword?'text':'password'} name="password" placeholder="password" className="py-2 px-3 w-full rounded shadow-sm text-gray-400 border border-gray-500"/>
                                <button type="button" onClick={()=>setShowPassword(!showPassword)} className=" absolute bottom-[25%] right-5">
                                    {showPassword ?<TbEye/>:<TbEyeOff/>}
                                </button>
                            </div>
                        </li>
                        <li className=" w-full">
                            <input value={'SIGNIN'} type="submit" form="signin" className=" w-full bg-blue-400 cursor-pointer text-white border rounded font-bold shadow-sm py-3 px-5"/>
                        </li>
                    </ul>
                    </form>
                </div>
            </div>
        </>:<Navigate to={`/`}/>
    )
}
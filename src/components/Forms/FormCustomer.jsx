import { useState } from "react"
import { request } from "../../utils"
import { Toaster, toast } from "react-hot-toast"

// eslint-disable-next-line react/prop-types
export default function FormCustomer({setCreateCustomer}){
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState({
        location:'',
        pincode:0
    })
    return(
        <>
            <Toaster/>
            <h1 className=" font-semibold text-gray-400 text-2xl text-center">Add New Customer</h1>
            <div>
                <form onSubmit={async(e)=>{
                    e.preventDefault()
                    try {
                        const response=await request('customer',{method:'POST',body:{
                            name:name,
                            phone:phone,
                            address:address,
                        }})
                        console.log(response)
                        if(response?.response?.name){
                            window.location.reload()
                        }else{
                            toast.error('User with this phone number already exist!')
                        }
                        
                    } catch (error) {
                        toast.error(error.message || error)
                    }
                }}>
                <ul>
                    <li className=" py-2 w-full flex flex-col justify-center ">
                        <label className=" font-semibold">Name</label>
                        <input onChange={(e)=>setName(e.target.value)} required type="text" name="name" placeholder="Name" className=" py-2 px-3 rounded shadow-sm border border-gray-300 text-gray-400" />
                    </li>
                    <li className="py-2 w-full flex flex-col justify-center ">
                        <label className=" font-semibold">Phone Number</label>
                        <input onChange={(e)=>setPhone(e.target.value)} required type="number" name="ph" placeholder="Phone" className=" py-2 px-3 rounded shadow-sm border border-gray-300 text-gray-400" />
                    </li>
                    <li className="py-2 w-full  flex flex-col justify-center ">
                        <ol className=" flex justify-between items-center gap-2">
                            <li className=" w-[45%] flex flex-col justify-center ">
                                <label className=" font-semibold">Location</label>
                                <input onChange={(e)=>setAddress((prev)=>{return{location:e.target.value,pincode:prev.pincode}})} type="text" name="Location" placeholder="Location" className=" py-2 px-3 rounded shadow-sm border border-gray-300 text-gray-400" />
                            </li>
                            <li className=" w-[45%] flex flex-col justify-center ">
                                <label className=" font-semibold">Pincode</label>
                                <input onChange={(e)=>setAddress((prev)=>{return{location:prev.location,pincode:e.target.value}})} type="number" name="Pin-code" placeholder="Pincode" className=" py-2 px-3 rounded shadow-sm border border-gray-300 text-gray-400" />
                            </li>
                        </ol>
                    </li>
                </ul>
                <div className=" flex justify-center items-center gap-5 mt-5">
                    <button onClick={()=>setCreateCustomer(false)} type="button" className=" bg-gray-400 rounded shadow-sm py-2 px-3 font-semibold text-white hover:text-gray-300">Cancel</button>
                    <button type="submit" className=" bg-blue-400 rounded shadow-sm py-2 px-3 font-semibold text-white hover:bg-blue-300">Submit</button>
                </div>
                </form>
            </div>
                
        </>
    )
}
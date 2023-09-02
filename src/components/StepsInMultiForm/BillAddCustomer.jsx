/* eslint-disable react/prop-types */
import { TbPlus } from "react-icons/tb";
import Dropdown from "../Dropdown";
import { useState } from "react";
import Modal from "../Modal";
import { useFetch } from "../../context/FetchContext";
import { request } from "../../utils";

export default function BillAddCustomer({formName,customer,setCustomer}){
    const [addCustomer,setAddCustomer]=useState(false)
    const {customers}=useFetch()
    const [name,setName]=useState('')
    const [phone,setPhone]=useState(null)
    const [address,setAddress]=useState({
        location:'',
        pincode:0
    })
    return(
        <>
            <div>
                <h1 className=" font-semibold text-gray-500 text-2xl text-center mb-5">{formName}</h1>
            </div>
            <div className=" w-full flex justify-center items-center gap-2">
                <Dropdown
                    options={customers}
                    onSelectionChange={(customer)=>setCustomer(customer)}
                    initialSearchText={customer?.name}
                 placeholder={'Customer'} className={'w-full'}/>
                <button onClick={()=>setAddCustomer(true)} ><TbPlus size={35} color="white" className="p-2 border rounded-full bg-blue-400"/></button>
            </div>
            <Modal isOpen={addCustomer} closeModal={()=>setAddCustomer(false)} >
                <>  
                    <h1 className=" font-semibold text-gray-400 text-2xl text-center">Add New Customer</h1>
                    <div>
                        <form onSubmit={async(e)=>{
                            e.preventDefault()
                            const response=await request('customer',{method:'POST',body:{
                                name:name,
                                phone:phone,
                                address:address,
                            }})
                            if(response.response.name){
                                window.location.reload()
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
                                        <input onChange={(e)=>setAddress((prev)=>{return{location:e.target.value,pincode:prev.pincode}})}  type="text" name="Location" placeholder="Location" className=" py-2 px-3 rounded shadow-sm border border-gray-300 text-gray-400" />
                                    </li>
                                    <li className=" w-[45%] flex flex-col justify-center ">
                                        <label className=" font-semibold">Pincode</label>
                                        <input onChange={(e)=>setAddress((prev)=>{return{location:prev.location,pincode:e.target.value}})}  type="number" name="Pincode" placeholder="Pincode" className=" py-2 px-3 rounded shadow-sm border border-gray-300 text-gray-400" />
                                    </li>
                                </ol>
                            </li>
                        </ul>
                        <div className=" flex justify-center items-center gap-5 mt-5">
                            <button onClick={()=>setAddCustomer(false)} type="button" className=" bg-gray-400 rounded shadow-sm py-2 px-3 font-semibold text-white hover:text-gray-300">Cancel</button>
                            <button type="submit" className=" bg-blue-400 rounded shadow-sm py-2 px-3 font-semibold text-white hover:bg-blue-300">Submit</button>
                        </div>
                        </form>
                    </div>
                </>
            </Modal>
        </>
    )
}
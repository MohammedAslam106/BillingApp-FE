/* eslint-disable react/prop-types */
import { TbPlus } from "react-icons/tb";
import Dropdown from "../Dropdown";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import FormCustomer from "../Forms/FormCustomer";
import { request } from "../../utils";

export default function BillAddCustomer({formName,customer,setCustomer}){
    const [customers,setCustomers]=useState([])
    useEffect(()=>{
        const fetchCustomers=async()=>{
            const response=await request('customer',{})
            // console.log(response)
            if(response.response.length){
                setCustomers(response.response)
            }
        }
        fetchCustomers()
    },[])
    const [createCustomer,setCreateCustomer]=useState(false)
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
                <button onClick={()=>setCreateCustomer(true)} ><TbPlus size={35} color="white" className="p-2 border rounded-full bg-blue-400"/></button>
            </div>
            <Modal isOpen={createCustomer} closeModal={()=>setCreateCustomer(false)}>
                <FormCustomer setCreateCustomer={setCreateCustomer}/>
            </Modal>
        </>
    )
}
import { createContext, useContext, useEffect, useState } from "react";
import { request } from "../utils";

const FetchData=createContext()

export function useFetch(){
    return useContext(FetchData)
}

// eslint-disable-next-line react/prop-types
export default function FetchProvider({children}){
    const [products,setProducts]=useState([])
    const [customers,setCustomers]=useState([])
    const [bills,setBills]=useState([])
    const [payments,setPayments]=useState([])
    const [customers1,setCustomers1]=useState([])
    useEffect(()=>{
        const fetchProducts=async()=>{
        const response=await request('product',{})
        // console.log(response)
        if(response.response.length){
            setProducts(response.response)
        }
    }
    const fetchCustomers=async()=>{
        const response=await request('customer',{})
        // console.log(response)
        if(response.response.length){
            setCustomers(response.response)
            setCustomers1(response.response)
        }
    }
    const fetchBills=async()=>{
        const response=await request('bill',{})
        // console.log(response)
        if(response.response.length){
            setBills(response.response)
        }
    }
    const fetchPayments=async()=>{
        const response=await request('payment',{})
        if(response.response.length){
            setPayments(response.response)
        }
    }
    fetchProducts()
    fetchCustomers()
    fetchBills()
    fetchPayments()
    },[])
    
    const updatesAfterBillCreation=async(body,endPoint)=>{
        const response=await request(`${endPoint}`,{method:"PATCH",body:body})
        console.log(response)
    }

    

    return(
        <FetchData.Provider value={{products,customers,setCustomers,customers1,bills,payments,updatesAfterBillCreation}}>
            {children}
        </FetchData.Provider>
    )
}
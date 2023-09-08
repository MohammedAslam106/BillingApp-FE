/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export default function SearchBar({options,placeholder,setOptions,array}){
    const [onSearchChange,setOnSearchChange]=useState('')
    useEffect(()=>{
        if(!onSearchChange){
            setOptions(array)
        }else if(options=='customers'){
            setOptions(array.filter((value)=>{
                return value.name?.toLowerCase().includes(onSearchChange.toLowerCase()) || value.phone.toString().includes(onSearchChange)
            }))
        }else if(options=='bills'){
            setOptions(array.filter((value)=>{
                return value?.billNumber.toString().includes(onSearchChange) || value.customer.name.toLowerCase().includes(onSearchChange.toLowerCase())
            }))   
        }else if(options=='payments'){
            setOptions(array.filter((value)=>{
                return value?.billNumber.toString().includes(onSearchChange) || value.customer?.name.toLowerCase().includes(onSearchChange.toLowerCase())
            }))
        }
    },[onSearchChange])
    return(
        <>
            <div className=" flex justify-center my-5">
                <input className=" rounded-full border-2 border-gray-500 py-3 px-5 w-1/2 mobile:w-[80%] " onChange={(e)=>setOnSearchChange(e.target.value)} type="text" name="search-bar" placeholder={placeholder} />
            </div>
        </>
    )
}
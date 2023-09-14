import Navbar from "../components/Navbar";
import {MdDashboard} from 'react-icons/md'
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import BasicPagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { request } from "../utils";
import Loader from "react-loaders";

// eslint-disable-next-line react/prop-types
export default function Dashboard({displaySidebar,setDisplaySidebar,AddButton}){
    const [count,setCount]=useState(0)
    const [startInd,setStartInd]=useState(0)
    const [lastInd,setLastInd]=useState(8)
    const [customers,setCustomers]=useState([])
    const [options,setOptions]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchCustomers=async()=>{
            const response=await request('customer',{})
            if(response.response.length){
                setCustomers(response.response)
                setOptions(response.response)
                setCount(Math.ceil(response.response.length/8))
            }
        }
        fetchCustomers()
        setDisplaySidebar(false)
    },[])
    return(
        <>
            <Loader active type="ball-spin-fade-loader"/>
            <SideBar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
            <div className=" mobile:ml-0 ml-[210px] min-h-screen bg-white">
                <Navbar name={'Dashboard'} Logo={MdDashboard} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
                <div className="  pb-10 mt-16">
                    {/* <h1 className="h1-bg-img mobile:text-[30px] pb-5">Customers List</h1> */}
                    <SearchBar placeholder={'Search By Ph/Name..'} options={'customers'} setOptions={setCustomers} array={options} />
                    <div className=" flex flex-wrap justify-center items-center gap-5 py-15 px-20">
                    {customers?.slice(startInd,lastInd).map((customer,ind)=>{
                         let count=0
                         customer?.bills?.forEach((bill)=>{
                            if(bill.balanceAmount!=0){
                                count++
                            }
                         })
                        return (
                                <div onClick={()=>{
                                    navigate(`${customer._id}`)
                                }} key={ind} style={{transition:'transform .5s ease-in'}} className=" rounded shadow-lg flex flex-col gap-3 border p-5 w-fit min-w-[250px] hover:scale-[1.1]">
                                    <div className="p-5 shadow-sm rounded bg-gray-100">
                                        <h1 className=" font-bold">{customer?.name}</h1>
                                        <p className=" text-xs text-gray-500">{customer.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-300 ">Number of bills pending: <span className="text-gray-500">{count}</span></p>
                                        <p className=" text-xs font-bold text-gray-300">Last bill created: <span className=" text-gray-500">{customer?.updatedAt.slice(0,10)}</span></p>
                                    </div>
                                </div>
                            
                            )
                        })}
                        </div>
                    <BasicPagination count={count} setStartInd={setStartInd} setLastInd={setLastInd} />
                </div>
            </div>
                <AddButton/>
        </>
    )
}
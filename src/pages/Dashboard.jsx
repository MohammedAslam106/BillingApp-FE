import Navbar from "../components/Navbar";
import {MdDashboard} from 'react-icons/md'
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import BasicPagination from "../components/Pagination";
import { useFetch } from "../context/FetchContext";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Dashboard({displaySidebar,setDisplaySidebar,AddButton}){
    const [count,setCount]=useState(0)
    const [startInd,setStartInd]=useState(0)
    const [lastInd,setLastInd]=useState(8)
    const {customers,setCustomers,customers1}=useFetch()
    const navigate=useNavigate()
    useEffect(()=>{
        setDisplaySidebar(false)
        setCount(Math.ceil(customers.length/8))
    },[])
    
    return(
        <>
            <SideBar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
            <div className=" mobile:ml-0 ml-[210px] min-h-screen bg-white">
                <Navbar name={'Dashboard'} Logo={MdDashboard} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
                <div className="  pb-10 mt-16">
                    {/* <h1 className="h1-bg-img mobile:text-[30px] pb-5">Customers List</h1> */}
                    <SearchBar placeholder={'Search By Ph/Name..'} options={'customers'} setOptions={setCustomers} array={customers1} />
                    <div className=" flex flex-wrap justify-center items-center gap-5 py-15 px-20">
                    {customers?.slice(startInd,lastInd).map((customer,ind)=>{
                        return (
                                <div onClick={()=>{
                                    navigate(`${customer._id}`)
                                }} key={ind} style={{transition:'transform .5s ease-in'}} className=" rounded shadow-lg flex flex-col gap-3 border p-5 w-fit min-w-[250px] hover:scale-[1.1]">
                                    <div className="p-5 shadow-sm rounded bg-gray-100">
                                        <h1 className=" font-bold">{customer?.name}</h1>
                                        <p className=" text-xs text-gray-500">{customer.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-300 ">Number of bills pending: <span className="text-gray-500">{customer?.bills?.length}</span></p>
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
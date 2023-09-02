import Navbar from "../components/Navbar";
import {TbReportMoney} from 'react-icons/tb'
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useFetch } from "../context/FetchContext";
import SearchBar from "../components/SearchBar";

// eslint-disable-next-line react/prop-types
export default function Payments({displaySidebar,setDisplaySidebar,AddButton}){
    const {payments}=useFetch()
    const [options,setOptions]=useState([])
    useEffect(()=>{
        setDisplaySidebar(false)
        setOptions(payments)
    },[])
    return(
        <>
            <SideBar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
            <div className=" mobile:ml-0 ml-[210px] min-h-screen">
                <Navbar name={'Payments'} Logo={TbReportMoney} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
                <div className="pb-10 mt-16">
                    <SearchBar options={'payments'} setOptions={setOptions} array={payments} placeholder={'Search By BillNo/Name..'} />
                    {/* <h1 className="h1-bg-img mobile:text-[30px] py-5">Recent Payments</h1> */}
                    <div className="flex flex-col justify-between gap-5 px-20 mobile:px-5">
                        {options.map((payment,ind)=>{
                        return(<div key={ind} className="flex justify-between items-center border rounded shadow-lg p-5 px-8 hover:scale-[1.05] transition-all">
                            <div className="flex flex-col w-[80%]">
                                <h1 className=" font-bold ">{payment?.customer?.name}</h1>
                                <p className=" font-semibold text-gray-400">Bill Number: {payment?.bill?.billNumber}</p>
                                <p className=" font-semibold text-gray-400">Created At: {new Date(payment.createdAt).toUTCString()}</p>
                            </div>
                            <div>
                                <span className=" text-green-500 font-semibold ">{payment.paidAmount}</span>
                            </div>
                        </div>)

                        })}
                        
                    </div>
                </div>
            </div>
            <AddButton/>
        </>
    )
}
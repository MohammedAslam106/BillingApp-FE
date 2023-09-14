import Navbar from "../components/Navbar";
import {TbReportMoney} from 'react-icons/tb'
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { request } from "../utils";
import Loader from "react-loaders";

// eslint-disable-next-line react/prop-types
export default function Payments({displaySidebar,setDisplaySidebar,AddButton}){
    const [options,setOptions]=useState([])
    const [bills,setBills]=useState([])
    const rupee=new Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'INR'
    })
    useEffect(()=>{
        const fetchBills=async()=>{
            const response=await request('bill',{})
            // console.log(response)
            if(response.response.length){
                setBills(response.response)
                setOptions(response.response.filter((bill)=>{
                    return bill.balanceAmount!=0
                }))
            }
        }
        fetchBills()
        setDisplaySidebar(false)
    },[])
    return(
        <>
            <SideBar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
            <div className=" relative mobile:ml-0 ml-[210px] min-h-screen">
                <Loader type="ball-spin-fade-loader"/>
                <Navbar name={'Payments'} Logo={TbReportMoney} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
                <div className="pb-10 mt-16">
                    <SearchBar options={'payments'} setOptions={setOptions} array={bills} placeholder={'Search By BillNo/Name..'} />
                    {/* <h1 className="h1-bg-img mobile:text-[30px] py-5">Recent Payments</h1> */}
                    <div className="flex flex-col justify-between gap-5 px-20 mobile:px-5">
                        {options.map((bill,ind)=>{
                        return(<div key={ind} className="flex justify-between items-center border rounded shadow-lg p-5 px-8 hover:scale-[1.05] transition-all">
                            <div className="flex flex-col w-[80%]">
                                <h1 className=" font-bold ">{bill?.customer?.name}</h1>
                                <p className=" font-semibold text-gray-400">Bill Number: {bill?.billNumber}</p>
                                <p className=" font-semibold text-gray-400">{new Date(bill.updatedAt).toGMTString().slice(0,17)}</p>
                            </div>
                            <div>
                                <span className=" text-red-500 font-semibold ">
                                    -{
                                        rupee.format(bill.balanceAmount)
                                    }
                                </span>
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
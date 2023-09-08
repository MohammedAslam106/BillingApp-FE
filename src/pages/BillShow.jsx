/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../context/FetchContext"
import { convertNumberToWords } from "../utils"

export default function BillShow({setDisplaySidebar}){
    
    const {bills}=useFetch()
    const [billDetails,setBillDetails]=useState(null)
    const [totalAmtInWords,setTotalAmtInWords]=useState('')
    const [showBtn,setShowBtn]=useState(true)
    const navigate=useNavigate()
    let rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    })
    const {bill}=useParams()


    useEffect(()=>{
        setBillDetails(...bills.filter((Bill)=>{
            if(Bill._id==bill){
                setTotalAmtInWords(()=>convertNumberToWords(Math.floor(Bill?.totalAmount)))
            }
            return  Bill._id==bill
        }
           ))
        setDisplaySidebar(false)
    },[])
    return(
        <>
            <div className=" w-full h-screen grid place-items-center">
            <div className=" w-[100%] h-full flex flex-col justify-center">
                {/* <h1 className="text-gray-500 font-semibold text-2xl text-center my-5">Final Bill</h1> */}
                <div className=" flex flex-col justify-start px-10">
                    <h1 className=" font-bold">Khaja Sawmill</h1>
                    <p>
                        <span className=" font-semibold text-gray-800">Phone no: </span>
                         9448403505
                    </p>
                    <p>
                        <span className=" font-semibold text-gray-800">email: </span>
                        mdmuaaz1999@gmail.com
                    </p>
                </div>
                <h1 className=" text-center my-5 font-semibold text-2xl bg-teal-200 mx-10">Invoice</h1>
                <div className="  font-semibold flex justify-between items-center px-10">
                    <h1 className=" flex flex-col">
                        <span>
                            Bill To: {billDetails?.customer?.name}
                        </span>
                        <span>
                            Ph: {billDetails?.customer?.phone}
                        </span>
                    </h1>
                    <h1 >
                        <div className=" flex flex-col justify-center items-center">
                            <span>Bill No:{billDetails?.billNumber}</span>
                            <span>Date:{new Date(billDetails?.updatedAt).toUTCString().slice(0,12)}</span>
                        </div>
                    </h1>
                </div>
                <div className="  my-5 flex flex-col justify-center gap-2 mx-10 ">
                    <div className=" font-semibold text-lg py-2 bg-teal-200 flex justify-between items-center">
                        <h3 className="px-5 w-full text-center">Item Name</h3>
                        <h3 className="px-5 w-full text-center">Quantity</h3>
                        <h3 className="px-5 w-full text-center">Price/Unit</h3>
                        <h3 className="px-5 w-full text-center">Amount</h3>
                    </div>
                    {billDetails?.items?.map((product,ind)=>{
                        return(
                            <div key={ind} className="flex justify-between items-center font-semibold text-gray-700">
                                <h5 className="px-5 w-full text-center">{product?.product?.name}</h5>
                                <h5 className="px-5 w-full text-center">{product?.quantity}</h5>
                                <h5 className="px-5 w-full text-center">
                                        <span>
                                            {rupee.format(product?.price)}
                                        </span>
                                </h5>
                                <h5 className="px-5 w-full text-center">
                                        <span>
                                            {rupee.format((['sheets','sheet','playwood'].includes(product.product.category?.name.toLowerCase()))?
                                                product.product?.characteristics?.width.value*product.product?.characteristics?.height.value*product?.quantity*product?.price:
                                                product?.price*product?.quantity)
                                            }
                                        </span>
                                </h5>
                            </div>
                        )
                    })}
                    
                </div>
                <div className=" flex justify-between gap-20 mobile:gap-10 px-10 ">
                    <div className=" w-full flex flex-col gap-2 ">
                        <div>
                            <h1 className=" font-semibold text-gray-600 mobile:text-sm text-lg">INVOICE AMOUNT IN WORDS</h1>
                            <h2 className="  mobile:text-sm font-semibol p-1 border rounded bg-gray-200 text-gray-600">{totalAmtInWords}</h2>
                        </div>
                        <div>
                            <h1 className=" font-semibold text-gray-600 mobile:text-sm text-lg">TERMS AND CONDITIONS</h1>
                            <h2 className="  mobile:text-sm font-semibol p-1 border rounded bg-gray-200 text-gray-600">Thanks for doing business with us.</h2>
                        </div>
                    </div>
                    <div className=" w-full">
                        <ul className=" flex flex-col justify-center gap-2">
                            <li className=" flex justify-between items-center bg-teal-200 p-3 rounded shadow-sm ">
                                <span className=" font-bold text-gray-500">Total</span>
                                    <span className=" font-semibold ">
                                        {rupee.format(billDetails?.totalAmount)}
                                    </span>
                            </li>
                            <li className=" flex justify-between gap-5  items-center p-3 rounded shadow-sm">
                                <span className=" font-bold text-gray-500">Received</span>
                                        <span className=" font-semibold">
                                            {rupee.format(billDetails?.paidAmount)}
                                        </span>
                            </li>
                            <li className=" flex justify-between gap-5 items-center p-3 rounded shadow-sm">
                                <span className=" font-bold text-gray-500">Balance</span>
                                    <span className=" font-semibold">
                                        {rupee.format(billDetails?.balanceAmount)}
                                    </span>
                            </li>
                        </ul>
                        <p className=" text-center font-semibold text-gray-700 mt-5">
                            For,Khaja Sawmill
                        </p>
                    </div>
                </div>
                {showBtn && <div className=" flex justify-end mx-10 mt-10 items-center gap-3 my-5">
                    <button>
                    <button onClick={()=>{
                        navigate(-1)
                    }}  type="button" className=" py-1.5 px-6 font-semibold rounded shadow-sm bg-gray-400 hover:bg-gray-300 text-white">Go Back</button>
                
                    </button>
                    <button onClick={()=>{
                        setShowBtn(false)
                        setTimeout(()=>{
                            window.print()
                            setShowBtn(true)
                        },1)
                    }}  type="button" className=" py-1.5 px-6 font-semibold rounded shadow-sm bg-gray-400 hover:bg-gray-300 text-white">Print</button>
                </div>}
            </div>
            </div>
        </>
    )
}
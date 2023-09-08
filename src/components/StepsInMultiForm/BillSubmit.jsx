/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useFetch } from "../../context/FetchContext"
import {LiaRupeeSignSolid} from 'react-icons/lia'
import { convertNumberToWords, request } from "../../utils"
import Modal from "../Modal"

// eslint-disable-next-line react/prop-types
export default function BillSubmit({formName,customer,billProducts,...rest}){
    console.log(rest.prevProducts)
    const {bills,updatesAfterBillCreation}=useFetch()
    const billNumber=rest?.billNumber?rest?.billNumber:bills.length==0 ? 1:bills[bills.length-1].billNumber+1
    const [items,setItems]=useState([])
    const [totalAmt,setTotalAmt]=useState(0)
    const [paidAmt,setPaidAmt]=useState(0)
    const [balanceAmt,setBalanceAmt]=useState(0)
    const [showUpdatedBillPopup,setShowUpdatedBillPopup]=useState(false)
    const [totalAmtInWords,setTotalAmtInWords]=useState('')

    const submitBill=async()=>{
        let response=null
        const body={
            billNumber:billNumber,
            customer:customer._id,
            items:items,
            totalAmount:totalAmt,
            paidAmount:paidAmt,
            balanceAmount:balanceAmt
        }
        if(!rest?.billNumber){
            response=await request('bill',{method:'POST',body:body})
            // console.log(response)
        }else{
            response=await request(`bill/${rest?.objectId}`,{method:'PATCH',body:body})
        }
        if(response.response.billNumber || response.response.modifiedCount==1){
            // paymentCr
            const paymentRes=await request('payment',{method:'POST',body:{
                bill:response.response._id?response.response._id:rest?.objectId,
                customer:customer._id,
                paidAmount:rest?.billNumber?paidAmt-rest?.paidAmount:paidAmt
            }})
            console.log(paymentRes)
            
            // customerUp
            if(!rest?.billNumber){
                const customerBody={bills:[...customer.bills,response.response._id]}
                updatesAfterBillCreation(customerBody,`customer/${customer._id}`)
            }

            // productUp


            //prevProducts update if it is updating it
            if(rest.billNumber){
                rest.prevProducts.forEach((product)=>{
                    if(product.product.specialCalculations.storingUnit==product.product.specialCalculations.sellingUnit){
                        const productBody={
                            quantity:{value:product.product.quantity.value + Number(product.quantity),unit:product.product.quantity.unit},
                            sold:{value:product.product.sold?.value - Number(product.quantity),unit:product.product.sold.unit}
                        }
                        updatesAfterBillCreation(productBody,`product/${product.product._id}`)
                
                    }
                    else{
                        let multiplyiingValue
                        if(product.product.specialCalculations.storingUnit=='kg'){
                            multiplyiingValue=product.product.characteristics.weight.value
                            console.log(product.quantity*multiplyiingValue,product.product.characteristics.weight.value)
                        }else if(product.product.specialCalculations.storingUnit=='m'){
                            multiplyiingValue=product.product.characteristics.height.value
                        }else if(product.product.specialCalculations.storingUnit=='sqft'){
                            multiplyiingValue=product.product.characteristics.height.value*product.product.characteristics.width.value
                        }
                        const productBody={
                            quantity:{value:product.product.quantity.value + Number(product.quantity*multiplyiingValue),unit:product.product.quantity.unit},
                            sold:{value:product.product.sold?.value - Number(product.quantity*multiplyiingValue),unit:product.product.sold.unit}
                    }
                    updatesAfterBillCreation(productBody,`product/${product.product._id}`)
                    if(product.product.specialCalculations.storingUnit=='piece'){
                        let dividingValue
                        if(product.product.specialCalculations.sellingUnit=='kg'){
                            dividingValue=product.product.characteristics.weight.value
                        }
                        else if(product.product.specialCalculations.sellingUnit=='m'){
                            dividingValue=product.product.characteristics.height.value
                        }
                        else if(product.product.specialCalculations.sellingUnit=='sqft'){
                            dividingValue=product.product.characteristics.height.value*product.product.characteristics.height.value
                        }
                        const productBody={
                            quantity:{value:product.product.quantity.value  + Number(product.quantity/dividingValue),unit:product.product.quantity.unit},
                            sold:{value:product.product.sold?.value - Number(product.quantity/dividingValue),unit:product.product.sold.unit}
                    }
                    updatesAfterBillCreation(productBody,`product/${product.product._id}`)
                    }
                    }
                })
            }
            // if(!rest?.billNumber){
                billProducts.forEach((product)=>{
                    if(product.product.specialCalculations.storingUnit==product.product.specialCalculations.sellingUnit){
                        console.log(product.product.sold?.value + Number(product.quantity))
                        const productBody={
                            quantity:{value:product.product.quantity.value - Number(product.quantity),unit:product.product.quantity.unit},
                            sold:{value:product.product.sold?.value + Number(product.quantity),unit:product.product.sold.unit}
                    }
                        updatesAfterBillCreation(productBody,`product/${product.product._id}`)
                    }
                    else{
                        let multiplyiingValue
                        if(product.product.specialCalculations.storingUnit=='kg'){
                            multiplyiingValue=product.product.characteristics.weight.value
                            console.log(product.quantity*multiplyiingValue,product.product.characteristics.weight.value)
                        }else if(product.product.specialCalculations.storingUnit=='m'){
                            multiplyiingValue=product.product.characteristics.height.value
                        }else if(product.product.specialCalculations.storingUnit=='sqft'){
                            multiplyiingValue=product.product.characteristics.height.value*product.product.characteristics.width.value
                        }
                        const productBody={
                            quantity:{value:product.product.quantity.value - Number(product.quantity*multiplyiingValue),unit:product.product.quantity.unit},
                            sold:{value:product.product.sold?.value + Number(product.quantity*multiplyiingValue),unit:product.product.sold.unit}
                    }
                    updatesAfterBillCreation(productBody,`product/${product.product._id}`)
                    if(product.product.specialCalculations.storingUnit=='piece'){
                        let dividingValue
                        if(product.product.specialCalculations.sellingUnit=='kg'){
                            dividingValue=product.product.characteristics.weight.value
                        }
                        else if(product.product.specialCalculations.sellingUnit=='m'){
                            dividingValue=product.product.characteristics.height.value
                        }
                        else if(product.product.specialCalculations.sellingUnit=='sqft'){
                            dividingValue=product.product.characteristics.height.value*product.product.characteristics.height.value
                        }
                        const productBody={
                            quantity:{value:product.product.quantity.value  - Number(product.quantity/dividingValue),unit:product.product.quantity.unit},
                            sold:{value:product.product.sold?.value + Number(product.quantity/dividingValue),unit:product.product.sold.unit}
                    }
                    updatesAfterBillCreation(productBody,`product/${product.product._id}`)
                    }
                    }
                })
        }
        setShowUpdatedBillPopup(true)
    }
    useEffect(()=>{
        setItems(()=>
            billProducts?.map((product)=>{
                return {product:product.product?._id,quantity:product.quantity,price:product.rate}
            })
        )
        const subTotal=billProducts?.reduce((prev,current)=>{
            if((['sheets','sheet','plywood'].includes(current.product?.category?.name.toLowerCase()))){
                return prev+=current.product?.characteristics?.width.value*current.product?.characteristics?.height.value*current?.quantity*current?.rate
            }
            else{
                return prev+=current.quantity*current.rate
            }
        },0)
        setTotalAmt(subTotal)
        setBalanceAmt(rest?.billNumber?subTotal-rest?.paidAmount:paidAmt==0?subTotal:subTotal-paidAmt)
        setPaidAmt(rest?.paidAmount)
        setTotalAmtInWords(convertNumberToWords(Math.floor(subTotal)))
    },[])
    return(
        <>
            <div>
                <h1 className="text-gray-500 font-semibold text-2xl text-center mb-5">{formName}</h1>
            </div>
            <div className=" flex flex-col justify-center">
                <div className=" flex flex-col justify-start">
                    <h1 className=" font-bold">Khaja Sawmill</h1>
                    <p>Phone no: 9448403505</p>
                    <p>email:mdmuaaz1999@gmail.com</p>
                </div>
                <h1 className=" text-center my-5 font-semibold text-2xl bg-teal-200">Invoice</h1>
                <div className="  font-semibold flex justify-between items-center">
                    <h1 className=" flex flex-col">
                        <span>
                            Bill To: {customer?.name}
                        </span>
                        <span>
                            Ph: {customer?.phone}
                        </span>
                    </h1>
                    <h1 >
                        <div className=" flex flex-col justify-center items-center">
                            <span>Bill No:{billNumber}</span>
                            <span>Date:{new Date().toUTCString().slice(0,12)}</span>
                        </div>
                    </h1>
                </div>
                <div className=" overflow-auto my-5 ">
                    <table className="w-full">
                        <tr className=" bg-teal-200" >
                            <th className=" px-5">Item Name</th>
                            <th className=" px-5">Quantity</th>
                            <th className=" px-5">Price/unit</th>
                            <th className=" px-5">Amount</th>
                        </tr>
                        {billProducts?.map((product,ind)=>{
                             return(
                            <tr key={ind}>
                                <td className="px-5">{product?.product?.name}</td>
                                <td className="px-5">{product?.quantity}</td>
                                <td className="px-5">
                                    <span className=" w-24 flex items-center">
                                        <LiaRupeeSignSolid size={20} className="  "/>
                                        <span>
                                            {product?.rate}
                                        </span>
                                    </span>
                                </td>
                                <td className="px-5">
                                    <span className=" w-24 flex items-center">
                                        <LiaRupeeSignSolid size={20} className="  "/>
                                        <span>
                                            {(['sheets','sheet','playwood'].includes(product?.product?.category?.name.toLowerCase()))?
                                                product?.product?.characteristics?.width.value*product.product?.characteristics?.height.value*product?.quantity*product?.rate:
                                                product?.rate*product?.quantity
                                            }
                                        </span>
                                    </span>
                                    </td>
                            </tr>)
                        })}
                        
                    </table>
                </div>
                <div className=" flex justify-center gap-10 ">
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
                            <li className=" flex justify-between items-center">
                                <span className=" font-bold text-gray-500">Total</span>
                                <span className=" w-24 flex items-center">
                                    <LiaRupeeSignSolid size={20} className="  "/>
                                    <span>
                                        {totalAmt}
                                    </span>
                                </span>
                            </li>
                            <li className=" flex justify-between items-center gap-2">
                                <span className=" font-bold text-gray-500">Received</span>
                                <input value={paidAmt} onChange={(e)=>{
                                    setPaidAmt(e.target.valueAsNumber)
                                    setBalanceAmt(totalAmt-e.target.valueAsNumber)
                                }} type="number" placeholder="Amount Received" className=" py-2 px-3 rounded border-b border-gray-400 shadow-sm text-gray-400 w-24" name="received" id="" />
                            </li>
                            <li className=" flex justify-between items-center">
                                <span className=" font-bold text-gray-500">Balance</span>
                                <span className=" w-24 flex items-center">
                                    <LiaRupeeSignSolid size={20} className="  "/>
                                    <span>
                                        {balanceAmt}
                                    </span>
                                </span>
                                </li>
                        </ul>
                        <p className=" text-center mt-2">
                            For,Khaja Sawmill
                        </p>
                    </div>
                </div>
                <div className=" flex justify-end items-center gap-3 my-5">
                    <button onClick={()=>submitBill()} type="Submit" className=" py-2 px-3 rounded shadow-sm bg-blue-400 text-white">Submit</button>
                </div>
            </div>
            <Modal isOpen={showUpdatedBillPopup} closeModal={()=>setShowUpdatedBillPopup(false)}>
                    <div>
                        <h1 className=" font-bold text-xl text-center">Update Bills and Inventory</h1>
                        <p className=" text-center py-2">Click the below button to update the bills and inventory.</p>
                        <div className=" w-full flex justify-center gap-3 mt-5">
                            <button onClick={()=>window.location.reload()} className=" bg-blue-400 rounded py-2 px-5 text-white hover:bg-blue-300">Update</button>
                            <button onClick={()=>setShowUpdatedBillPopup(false)} className=" bg-gray-400 rounded py-2 px-5 text-white hover:bg-gray-300">Cancel</button>

                        </div>
                    </div>
            </Modal>
        </>
    )
}
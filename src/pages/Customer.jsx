/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import { TbDotsVertical, TbFileInvoice} from 'react-icons/tb'
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { request } from "../utils";
import Modal from "../components/Modal";
import FormBill from "../components/Forms/FormBill";
import SearchBar from "../components/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "react-loaders";

// eslint-disable-next-line react/prop-types
export default function Bills({displaySidebar,setDisplaySidebar,AddButton}){

    const [deleteButton,setDeleteButton]=useState(false)
    const [coordinates,setCoordinates]=useState({x:0,y:0})
    const [deleteEditBill,setDeleteEditBill]=useState(null)
    const [editBill,setEditBill]=useState(false)
    const [options,setOptions]=useState([])
    const navigate=useNavigate()
    const[bills,setBills]=useState([])
    const {customer}=useParams()

    const deleteBill=async(deleteEditBill)=>{
        console.log(deleteEditBill?.customer?._id)
        console.log(deleteEditBill.customer.bills)
        // eslint-disable-next-line no-unsafe-optional-chaining
        const bills=[...deleteEditBill?.customer?.bills?.filter((bill)=>{
            return bill!=deleteEditBill._id
        })]
        console.log(bills)
        console.log(await request(`customer/${deleteEditBill?.customer?._id}`,{method:"PATCH",body:{bills}}))

        const response=await request(`bill/${deleteEditBill._id}`,{method:'DELETE'})
        
        if(response){
            window.location.reload()
        }

    }

    useEffect(()=>{
        const fetchBills=async()=>{
            const response=await request('bill',{})
            // console.log(response)
            if(response.response.length){
                setBills(response.response)
                setOptions(response.response.filter((bill)=>{
                    return bill?.customer?._id==customer
                }))
            }
        }
        setDisplaySidebar(false)
        fetchBills()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <>
            <SideBar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
            <div className=" relative mobile:ml-0 ml-[210px] min-h-screen">
                <Loader type="ball-spin-fade-loader"/>
                <Navbar name={'Bills'} Logo={TbFileInvoice} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
                <div className="bp-10 mt-16">
                    <SearchBar placeholder={'Search By BillNo/Name..'} options={'bills'} setOptions={setOptions} array={bills}/>
                    {/* <h1 className="h1-bg-img mobile:text-[30px] py-5">Recent Bills</h1> */}
                    <div className=" flex flex-col justify-between gap-5 px-20  mobile:px-5">
                        {options?.map((bill,ind)=>{
                        return(<div onClick={()=>{
                            navigate(`/bills/${bill._id}`)
                        }} key={ind} className="flex justify-between items-center border rounded shadow-lg hover:scale-[1.05] transition-transform p-5 px-8">
                            <p className=" font-semibold text-lg">{bill?.billNumber}</p>
                            <div className="flex flex-col w-full mx-5">
                                <h1 className=" font-semibold">{bill?.customer?.name} ({bill?.customer?.phone})</h1>
                                <p className=" font-semibold text-gray-400">Last Update: <span>{new Date(bill.updatedAt).toUTCString().slice(0,17)}</span></p>
                                {/* <p className=" font-bold text-gray-400">Created: <span>{new Date(bill.createdAt).toUTCString().slice(0,22)}</span></p> */}
                            </div>
                            <TbDotsVertical  onClick={(e)=>{
                                e.stopPropagation()
                                setCoordinates({x:e.pageX-100,y:e.pageY})
                                setDeleteButton(!deleteButton)
                                setDeleteEditBill(bill)
                            }
                            } 
                                size={20}/>
                        </div>)
                        })}
                            <div  onMouseLeave={()=>setDeleteButton(false)} className="">
                                {deleteButton && <div style={{left:coordinates.x,top:coordinates.y}} className="ml-[-210px] mobile:ml-0 w-28 absolute bg-white rounded shadow-lg border">
                                    <button onClick={()=>setEditBill(true)} className=" hover:bg-gray-100 py-1 px-3 w-full text-left ">Edit</button>
                                    <button onClick={()=>deleteBill(deleteEditBill)} className=" hover:bg-gray-100 py-1 px-3 w-full text-left ">Delete</button>
                                    <button onClick={()=>setDeleteButton(false)} className=" hover:bg-gray-100 py-1 px-3 w-full text-left ">Close</button>
                                </div>}
                            </div>
                       
                    </div>
                </div>
            </div>
            <AddButton/>
            <Modal isOpen={editBill} closeModal={()=>setEditBill(false)}>
                <FormBill
                    Editproducts={deleteEditBill?.items?.map((item)=>{
                        return {product:item.product,quantity:item.quantity,rate:item.price,prevQuantity:item.quantity}
                    })}
                    EditCustomer={deleteEditBill?.customer}
                    billNumber={deleteEditBill?.billNumber} 
                    objectId={deleteEditBill?._id}
                    paidAmount={deleteEditBill?.paidAmount}
                    prevProducts={deleteEditBill?.items?.map((item)=>{
                        return {product:item.product,rate:item.price,quantity:item.quantity}
                    })}
                />
            </Modal>
        </>
    )
}




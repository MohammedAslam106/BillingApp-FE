/* eslint-disable react/prop-types */
// import Dropdown from "../Dropdown";
import { TbX } from "react-icons/tb";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { toast } from "react-hot-toast";
import { request } from "../../utils";


export default function BillAddProduct({billProducts,setBillProdcuts,formName}){
    const [filterProducts,setFilterProducts]=useState([])
    // const [products,setProducts]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [deleteEditInd,setDeleteEditInd]=useState(0)
    const [deleteBtn,setDeleteBtn]=useState(false)
    const [eachProduct,setEachProduct]=useState({
        product:{},
        quantity:'',
        rate:''
    })
    useEffect(()=>{
        const fetchProducts=async()=>{
            const response=await request('product',{})
            // console.log(response)
            if(response.response.length){
                // setProducts(response.response)
                setFilterProducts(response.response)
            }
        }
        fetchProducts()
    },[])

    return(
        <>
             <div>
                <h1 className="text-gray-500 font-semibold text-2xl text-center mb-5">{formName}</h1>
            </div>
            <div className=" flex justify-between items-center bg-gray-300">
                <h1 className=" font-semibold text-center w-full">Item Name</h1>
                <h1 className="font-semibold text-center w-full">Quantity</h1>
                <h1 className="font-semibold text-center w-full">Rate</h1>
            </div>
            {billProducts?.map((product,ind)=>{
                return(
                    <div onClick={()=>{
                        setIsOpen(true)
                        setEachProduct(product)
                        setDeleteEditInd(ind)
                        setDeleteBtn(true)
                    }} id={product.delId} className="py-2  cursor-pointer flex flex-col justify-center gap-5 " key={ind}>
                        <div className=" flex justify-between items-center bg-purple-300 py-2">
                            <span className="text-center w-full font-semibold">
                                {product?.product.name}
                            </span>
                            <span className="text-center w-full font-semibold">
                                {product?.quantity}
                                <span className=" py-2 px-4 rounded shadow-sm text-white text-sm bg-gray-700">{product?.product.specialCalculations?.sellingUnit}</span>
                            </span>
                            <span className="text-center w-full font-semibold">
                                {product?.rate}
                            </span>
                           
                        </div>
                    </div>
                )
            })}
            <div className=" w-full flex justify-center items-center gap-2">
                <button onClick={()=>{
                    setIsOpen(true)
                }} className=" py-2 px-3 rounded shadow-sm border  text-white font-semibold bg-gray-400 hover:bg-gray-300">Add Product</button>
            </div>
            <Modal isOpen={isOpen} closeModal={()=>setIsOpen(false)}>
                <>
                    <div className=" flex justify-between items-center">
                        <span></span>
                        <h1 className=" text-lg text-gray-400 font-semibold text-center">Add Product</h1>
                        <TbX onClick={()=>{
                            setDeleteBtn(false)
                            setEachProduct({product:{},quantity:0,rate:0})
                            setIsOpen(false)
                            }} size={35} className=" text-lg text-gray-400 font-semibold cursor-pointer"/>
                    </div>
                    <form>
                    <div className=" flex flex-col justify-center items-center gap-4 p-5 ">
                        <div className="relative w-full">
                            <label className=" font-semibold">Select the product</label>
                            <select required onChange={(e)=>{
                                setEachProduct(prev=>{return{
                                        ...prev,
                                        product:e.target.value=='--Choose one'?{}:JSON.parse(e.target.value)
                                    }
                                    })
                                setFilterProducts(filterProducts.filter((product)=>{
                                    console.log(product._id!=JSON.parse(e.target.value)._id);
                                    return product._id!=JSON.parse(e.target.value)._id
                                })) 
                                    }} size={1}  name="product" className="  w-full rounded shadow-sm py-2 px-2 border border-gray-800 text-gray-500" >
                                <option selected >{'--Choose one'}</option>
                                {filterProducts.map((pro,ind)=>{
                                    return(
                                        <option key={ind} className=" border"  value={JSON.stringify(pro)}>{pro?.name}</option>
                                    )
                                })}
                            </select>
                            {eachProduct?.product.name && <span className=" px-2 bg-gray-100 border border-gray-500 rounded py-2 absolute w-[90%] left-0 bottom-0">{eachProduct?.product.name}</span>}
                        </div>
                    <ul className=" flex justify-center items-center gap-3 w-full" >
                        <li className=" w-full relative">
                            <label className=" font-semibold">Quantity</label>
                            <input value={eachProduct?.quantity} required onChange={(e)=>setEachProduct(prev=>{
                                if(JSON.stringify(eachProduct.product)==JSON.stringify({})){
                                    toast.error('Please select the product.')
                                }
                                if(eachProduct?.product?.quantity?.value<e.target.value){
                                    toast.error('You do not have enough stock!')
                                }
                                return{
                                ...prev,
                                quantity:(e.target.value)
                                }
                            
                            }
                            )} placeholder="Quantity" className=" w-full border py-2 px-3 shadow-sm rounded text-gray-500 border-gray-400" type="number" name="quantity"  />
                            {eachProduct?.product.specialCalculations?.sellingUnit && <span className=" text-white bg-gray-700 rounded shadow-sm font-semibold text-sm py-2 px-3 absolute right-1 bottom-0.5">{eachProduct?.product?.specialCalculations?.sellingUnit}</span>}
                        </li>
                        <li className=" w-full">
                            <label className=" font-semibold">Rate</label>
                            <input value={eachProduct?.rate} required onChange={(e)=>setEachProduct(prev=>{return{
                                ...prev,
                                rate:(e.target.value)
                            }})} placeholder="Amount/Unit" className=" w-full border py-2 px-3 shadow-sm rounded text-gray-500 border-gray-400" type="number" name="rate"  />
                        </li>
                    </ul>
                    </div>
                    </form>
                    <div className=" flex justify-between items-center">
                        {deleteBtn && <button className=" py-2 px-4 rounded shadow-sm bg-red-500 text-white font-semibold" onClick={()=>{
                            setBillProdcuts(billProducts.filter((product)=>{
                                return product!=billProducts[deleteEditInd]
                            }))
                            const newRow=[...filterProducts]
                            newRow.push(billProducts[deleteEditInd].product)
                            console.log(newRow)
                            setFilterProducts(newRow)
                            setEachProduct({product:{},quantity:0,rate:0})
                            setDeleteBtn(false)
                            setIsOpen(false)
                        }} 
                        type="button">Delete</button>}
                        
                        <button className=" py-2 px-4 rounded shadow-sm bg-blue-400 text-white font-semibold" onClick={()=>{
                            if(eachProduct.product=={} || eachProduct.quantity==0 || eachProduct.rate==0){
                                toast.error('Please fill in all the required fields!')
                            }
                            else if(eachProduct?.product?.quantity.value<eachProduct?.quantity){
                                toast.error('You do not have enough stock!')
                            }
                            else if(deleteBtn){
                                const row=[...billProducts]
                                row[deleteEditInd]=eachProduct
                                setBillProdcuts(row)
                                setEachProduct({product:{},quantity:0,rate:0})
                                setDeleteBtn(false)
                                setIsOpen(false)
                            }
                            else{
                                setEachProduct({product:{},quantity:0,rate:0})
                                setBillProdcuts([...billProducts,eachProduct])
                                setIsOpen(false)
                            }
                            
                        }} 
                        type="submit">Save</button>

                    </div>
                </>
            </Modal>
        </>
    )
}
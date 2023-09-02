/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Toggel from "../Toggle";
import { request } from "../../utils";

// eslint-disable-next-line react/prop-types
export default function FormInventory({setCreateInventory,updateInventory=null}){
    const[quantityUnit,setQuantityUnit]=useState({
        value:0,
        unit:'piece'
    })
    const[sold,setSold]=useState({
        value:0,
        unit:''
    })
    const[widthUnit,setWidthUnit]=useState({
        value:0,
        unit:'ft'
    })
    const[heightUnit,setHeightUnit]=useState({
        value:0,
        unit:'ft'
    })
    const[thicknessUnit,setThicknessUnit]=useState({
        value:0,
        unit:'mm'
    })
    const[weightUnit,setWeightUnit]=useState({
        value:0,
        unit:'kg'
    })
    const[tax,setTax]=useState({
        state:9,
        central:9
    })
    const[sellingUnit,setSellingUnit]=useState({
        value:0,
        unit:'kg'
    })
    const [name,setName]=useState('')
    const [buyingPrice,setBuyingPrice]=useState(0)
    const [mrp,setMrp]=useState(0)
    const [category,setCategory]=useState({
        name:'',
        description:''
    })

    const formSubmission=async(e)=>{
        e.preventDefault()
        const body={
            name:name,
            quantity:quantityUnit,
            sold:{
                value:sold.value,
                unit:quantityUnit.unit
            },
            characteristics:{
                width:widthUnit,
                height:heightUnit,
                thickness:thicknessUnit,
                weight:weightUnit
            },
            buyingPrice:buyingPrice,
            maximumRetailPrice:mrp,
            specialCalculations:{
                storingUnit:quantityUnit.unit,
                sellingUnit:sellingUnit.unit
            },
            category:category,
            tax:{
                state:tax.state,
                central:tax.central
            }
        }
        if(updateInventory==null){
            const response=await(request('product',{body:body,method:"POST"}))
            console.log(response)
            if(response.response.name){
                window.location.reload()
            }
        }else{
            const response=await(request(`product/${updateInventory._id}`,{body:body,method:"PATCH"}))
            console.log(response)
            if(response.response.modifiedCount==1){
                window.location.reload()
            }
        }
    }

    useEffect(()=>{
        if(updateInventory){
            setWidthUnit({unit:updateInventory?.characteristics?.width?.unit,value:updateInventory?.characteristics?.width?.value})
            setHeightUnit({unit:updateInventory?.characteristics?.height?.unit,value:updateInventory?.characteristics?.height?.value})
            setThicknessUnit({unit:updateInventory?.characteristics?.thickness?.unit,value:updateInventory?.characteristics?.thickness?.value})
            setWeightUnit({unit:updateInventory?.characteristics?.weight?.unit,value:updateInventory?.characteristics?.weight?.value})
            setName(updateInventory?.name)
            setQuantityUnit({unit:updateInventory?.quantity?.unit,value:updateInventory?.quantity?.value})
            setCategory({name:updateInventory?.category?.name,description:updateInventory?.category?.description})
            setSellingUnit({unit:updateInventory?.specialCalculations?.sellingUnit,value:0})
            setBuyingPrice(updateInventory?.buyingPrice)
            setMrp(updateInventory?.maximumRetailPrice)
            setTax({
                state:updateInventory?.state,
                central:updateInventory?.central
            })
            setSold({
                unit:updateInventory?.sold?.unit,value:updateInventory?.sold?.value
            })
        }
    },[])
    
    return(
        <>
            <div className=" rounded shadow-sm p-3 border-gray-400 ">
                <form onSubmit={formSubmission}>
                    <ul className=" flex flex-wrap justify-center gap-[5%]">
                        <li className="py-2 flex flex-col justify-center w-[45%] ">
                            <label className=" font-semibold">Name</label>
                            <input value={name} required onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="Name" className=" py-2 px-3 rounded shadow-sm border border-gray-400 text-gray-400" />
                        </li>
                        <li className="py-2 flex flex-col justify-center w-[45%]  ">
                            <label className=" font-semibold">Quantity</label>
                            <input value={quantityUnit?.value} required onChange={(e)=>setQuantityUnit((prev)=>{return{unit:prev.unit,value:e.target.value}})} type="number" name="name" placeholder="Quantity" className=" py-2 px-3 rounded shadow-sm border border-gray-400 text-gray-400" />
                            <div className="relative  ">
                                <Toggel onChanged={quantityUnit?.unit} options={['piece','kg','m','sqft']} classNames={'py-2 px-1 absolute mobile:right-0 right-1 bottom-[2.5px]'} onChange={setQuantityUnit} />
                            </div>
                        </li>
                       {updateInventory?.sold && <li className="py-2 flex flex-col justify-center w-[45%]  ">
                            <label className=" font-semibold">Sold</label>
                            <input value={sold.value} required onChange={(e)=>setSold((prev)=>{return{unit:prev.unit,value:e.target.value}})} type="number" name="name" placeholder="Quantity" className=" py-2 px-3 rounded shadow-sm border border-gray-400 text-gray-400" />
                            <div className="relative  ">
                                <Toggel onChanged={sold.unit} options={[sold.unit]} classNames={'py-2 px-1 absolute mobile:right-0 right-1 bottom-[2.5px]'}/>
                            </div>
                        </li>}
                        <li className="py-2 flex flex-col justify-center w-[45%] ">
                            <label className=" font-semibold">Buying Price</label>
                            <input value={buyingPrice} required onChange={(e)=>setBuyingPrice(e.target.value)} type="number" name="name" placeholder="Buying Price" className=" py-2 px-3 rounded shadow-sm border border-gray-400 text-gray-400" />
                        </li>
                        <li className="py-2 flex flex-col justify-center w-[45%] ">
                            <label className=" font-semibold">MRP</label>
                            <input value={mrp} required onChange={(e)=>setMrp(e.target.value)} type="number" name="name" placeholder="MRP" className=" py-2 px-3 rounded shadow-sm border border-gray-400 text-gray-400" />
                        </li>
                        <li className="py-2 flex flex-col justify-center w-[90%] ">
                            <label className=" font-semibold">Category</label>
                            <div className=" flex justify-between gap-3 items-center border p-2">
                                <input required onChange={(e)=>setCategory((prev)=>{return{name:e.target.value,description:prev.description}})} value={category.name} type="text" name="cat-name" placeholder="Name" className=" w-full  py-2 px-3 rounded shadow-sm border border-gray-400 text-gray-400" />
                                <input required onChange={(e)=>setCategory((prev)=>{return{name:prev.name,description:e.target.value}})} value={category.description} type="text" name="cat-description" placeholder="Description" className=" w-full  py-2 px-3 rounded shadow-sm border border-gray-400 text-gray-400" />
                            </div>
                        </li>
                        <li className="py-2 flex flex-col justify-center w-[90%] ">
                            <label className=" font-semibold">Characterstics</label>
                            <div className=" flex flex-wrap justify-center gap-[5%] border p-1 rounded ">
                                <input value={widthUnit?.value} onChange={(e)=>{setWidthUnit((prev)=>{return{unit:prev.unit,value:e.target.value}})}} type="number" name="width" placeholder="Width" className=" py-2 px-3 w-[40%] my-1 rounded shadow-sm border border-gray-400 text-gray-400" />
                                <div className="relative  ">
                                    <Toggel onChanged={widthUnit?.unit} options={['ft','m','mm','inch']} onChange={setWidthUnit} classNames={'py-2 px-1 absolute mobile:right-3 right-[17px] bottom-[6px]'}  />
                                </div>
                                <input value={heightUnit?.value} onChange={(e)=>{setHeightUnit((prev)=>{return{unit:prev.unit,value:e.target.value}})}} type="number" name="height" placeholder="Height" className=" py-2 px-3 rounded w-[40%] my-1 shadow-sm border border-gray-400 text-gray-400" />
                                <div className="relative  ">
                                    <Toggel onChanged={heightUnit?.unit} options={['ft','m','mm','inch']} onChange={setHeightUnit} classNames={'py-2 px-1 absolute mobile:right-3 right-[17px] bottom-[6px]'}  />
                                </div>
                                <input value={thicknessUnit?.value} onChange={(e)=>{setThicknessUnit((prev)=>{return{unit:prev.unit,value:e.target.value}})}} type="number" name="thickness" placeholder="Thickness" className=" py-2 px-3 rounded w-[40%] my-1 shadow-sm border border-gray-400 text-gray-400" />
                                <div className="relative  ">
                                    <Toggel onChanged={thicknessUnit?.unit} options={['mm','m','ft','inch']} onChange={setThicknessUnit} classNames={'py-2 px-1 absolute mobile:right-3 right-[17px] bottom-[6px]'}  />
                                </div>
                                <input value={weightUnit?.value} onChange={(e)=>{setWeightUnit((prev)=>{return{unit:prev.unit,value:e.target.value}})}} type="number" name="weight" placeholder="Weight" className=" py-2 px-3 rounded w-[40%] my-1 shadow-sm border border-gray-400 text-gray-400" />
                                <div className="relative  ">
                                    <Toggel onChanged={weightUnit?.unit} options={['kg']} onChange={setWeightUnit} classNames={'py-2 px-1 absolute mobile:right-3 right-[17px] bottom-[6px]'}  />
                                </div>
                            </div>
                        </li>
                        <li className="py-2 flex flex-col justify-center w-[90%] ">
                            <label className=" font-semibold">Special Calculations</label>
                            <div className=" flex justify-center gap-[5%] border p-2 rounded ">
                                <ol className=" flex justify-between items-center gap-5">
                                    <li className=" flex flex-col">
                                        <label className=" font-semibold">Storing Unit</label>
                                        <Toggel options={['kg','piece','m','sqft']} onChange={setQuantityUnit} onChanged={quantityUnit.unit} classNames={'px-1'}  />
                                    </li>
                                    <li className=" flex flex-col">
                                        <label className=" font-semibold">Selling Unit</label>
                                        <Toggel options={['kg','piece','m','sqft']} onChange={setSellingUnit} onChanged={sellingUnit.unit} classNames={'px-1'} />
                                    </li>
                                </ol>
                            </div>
                        </li>
                        <li className="py-2 flex flex-col justify-center w-[90%] ">
                            <label className=" font-semibold">Tax</label>
                            <div className=" flex justify-center gap-[5%] border p-5 rounded ">
                                <input required value={tax.state} onChange={(e)=>setTax((prev)=>{return{state:e.target.value,central:prev.central}})} type="number" name="name" placeholder="SGST" className=" py-2 px-3 w-[50%] rounded shadow-sm border border-gray-400 text-gray-400" />
                                <input required value={tax.central} onChange={(e)=>setTax((prev)=>{return{central:e.target.value,state:prev.state}})} type="number" name="name" placeholder="CGST" className=" py-2 px-3 rounded w-[50%] shadow-sm border border-gray-400 text-gray-400" />
                            </div>
                        </li>
                        <li className=" flex justify-end items-end gap-5 mt-5">
                            <button onClick={()=>setCreateInventory(false)} type="button" className="font-semibold bg-gray-300 rounded py-2 px-3 shadow-sm hover:bg-gray-200">Cancel</button>
                            <button
                            type="submit" className="  font-semibold  py-2 px-3 bg-blue-400 rounded shadow-sm hover:bg-blue-300">Submit</button>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    )
}
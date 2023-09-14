import Navbar from "../components/Navbar";
import {TbBuildingStore} from 'react-icons/tb'
import SideBar from "../components/SideBar";
import { DoughnutChart } from "../components/Doughnut";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import FormInventory from "../components/Forms/FormInventory";
import { request } from "../utils";
import Loader from "react-loaders";

// eslint-disable-next-line react/prop-types
export default function InventoryStock({displaySidebar,setDisplaySidebar,AddButton}){
    const [deleteBtn,setDeleteBtn]=useState(false)
    const [coordinates,setCoordinates]=useState({x:0,y:0})
    const [updateInventoryModal,setUpdateInventoryModal]=useState(false)
    const [updateInventory,setUpdateInventory]=useState(null)
    const [products,setProducts]=useState([])

    // const deleteStock=async(id)=>{
    //     const response=await request(`product/${id}`,{method:"DELETE"})
    //     console.log(response)
    // }

    useEffect(()=>{
        const fetchProducts=async()=>{
            const response=await request('product',{})
            // console.log(response)
            if(response.response.length){
                setProducts(response.response)
            }
        }
        fetchProducts()
        setDisplaySidebar(false)
    },[])
    return(
        <>
            <SideBar displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
            <div className=" relative mobile:ml-0 ml-[210px] min-h-screen">
                <Loader type="ball-spin-fade-loader"/>
                <Navbar name={'Inventory'} Logo={TbBuildingStore} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}/>
                <div className=" pb-10 mt-16">
                    {/* <h1 className="h1-bg-img mobile:text-[30px] py-5">Products Available</h1> */}
                   <div className=" flex flex-wrap justify-center items-center gap-5 py-15 px-20">
                        {products?.map((prodcut,ind)=>{
                            return (
                            <div  onContextMenu={(e)=>{
                                e.preventDefault()
                                setCoordinates({x:e.pageX,y:e.pageY})
                                setDeleteBtn(true)
                                setUpdateInventory(prodcut)
                            }} key={ind} className=" rounded-sm shadow-lg w-fit py-3 px-2 border">
                            <div className=" flex justify-center items-center ">
                                <h1 className=" text-center font-bold text-lg">{prodcut.name}</h1>
                            </div>
                            <div className=" w-[250px] h-[250px] m-2">
                                <DoughnutChart inpOutUnit={prodcut.specialCalculations.storingUnit} name={prodcut.name} input={prodcut.quantity.value} output={prodcut.sold.value}/>
                            </div>
                            <div>
                                {/* {new Date(prodcut?.createdAt).toLocaleDateString()} */}
                            </div>
                            {deleteBtn && <div onMouseLeave={()=>setDeleteBtn(false)} style={{left:coordinates.x-60,top:coordinates.y}} className=" bg-white rounded shadow-lg absolute w-20">
                                <button onClick={()=>setUpdateInventoryModal(true)} className="w-full py-1 px-3 text-start hover:bg-gray-100">Edit</button>
                                {/* <button onClick={()=>deleteStock()} className="w-full py-1 px-3 text-start hover:bg-gray-100">Delete</button> */}
                                <button onClick={()=>setDeleteBtn(false)} className="w-full py-1 px-3 text-start hover:bg-gray-100">Close</button>
                            </div>}
                        </div>
                        )
                        })}
                        
                   </div>
                </div>
            </div>
            <AddButton/>
            <Modal isOpen={updateInventoryModal} closeModal={()=>setUpdateInventoryModal(false)}>
                <FormInventory setCreateInventory={setUpdateInventoryModal} updateInventory={updateInventory}/>
            </Modal>
        </>
    )
}
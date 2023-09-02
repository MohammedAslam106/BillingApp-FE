import {  useState } from 'react'
import {TbBuildingStore, TbFileInvoice, TbPlus, TbUser, TbX} from 'react-icons/tb'
import Modal from './Modal'
import FormBill from './Forms/FormBill'
import FormInventory from './Forms/FormInventory'
import FormCustomer from './Forms/FormCustomer'
export default function AddButton(){
    const [displayButtons,setDisplayButtons]=useState(false)
    const [createBill,setCreateBill]=useState(false)
    const [createCustomer,setCreateCustomer]=useState(false)
    const [createInventory,setCreateInventory]=useState(false)
    return(
        <>
            <div className=' fixed right-8 bottom-5'>
             <div onMouseLeave={()=>{setDisplayButtons(false)}} className={'relative'}>
             {displayButtons && <div className={ `${displayButtons}`?"animate-out flex flex-col items-center gap-3":"animate-out flex flex-col items-center gap-3"}>
                       
                        <button onClick={()=>setCreateBill(true)} style={{animationDelay:'0.4s'}} className=' animate-in'>
                            <TbFileInvoice className='text-[60px] p-4 bg-teal-400 text-white rounded-full'/>
                        </button>
                         <button onClick={()=>setCreateCustomer(true)} style={{animationDelay:'0.6s'}} className=' animate-in'>
                            <TbUser className='text-[60px] p-4 bg-teal-400 text-white rounded-full'/>
                        </button>
                         <button onClick={()=>setCreateInventory(true)} style={{animationDelay:'0.8s'}} className=' animate-in'>
                            <TbBuildingStore className='text-[60px] p-4 bg-teal-400 text-white rounded-full'/>
                        </button>
                    </div>}
                    <button onClick={()=>setDisplayButtons(!displayButtons)}  className='mt-3'>
                        {!displayButtons ? <TbPlus className='text-[60px] p-4 bg-blue-400 text-white rounded-full'/>
                        :<TbX className='text-[60px] p-4 bg-red-400 text-white rounded-full'/>}
                    </button>
                </div>
            </div>
            <Modal isOpen={createBill} closeModal={()=>setCreateBill(false)}>
                <FormBill/>
            </Modal>
            <Modal isOpen={createInventory} closeModal={()=>setCreateInventory(false)}>
                <FormInventory setCreateInventory={setCreateInventory}/>
            </Modal>
            <Modal isOpen={createCustomer} closeModal={()=>setCreateCustomer(false)}>
                <FormCustomer setCreateCustomer={setCreateCustomer}/>
            </Modal>
        </>
    )
}
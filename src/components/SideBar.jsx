import {MdDashboard} from 'react-icons/md'
import { TbArrowBigLeftFilled, TbBuildingStore, TbFileInvoice, TbReportMoney, TbUserCircle} from 'react-icons/tb'
import {GoSignOut} from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// eslint-disable-next-line react/prop-types
export default function SideBar({displaySidebar,setDisplaySidebar}){
    const {signout}=useAuth()
    return(
        <>
            <div className="  mobile:hidden min-h-[100vh] bg-[#283a47]  fixed left-0 bottom-0 top-0 pb-10 text-gray-300 font-semibold w-[210px] ">
                <div className='bg-[#23333e] flex justify-center items-center gap-2 py-5 px-5 cursor-pointer'>
                    <TbUserCircle size={30} className=' '/>
                    <p>Khaja Sawmill</p>
                </div>
                <ul className='mt-20 flex flex-col justify-between gap-3'>
                    <li className='  relative'>
                        <Link to={'/'} className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <MdDashboard size={25} className=''/>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className='  relative'>
                        <Link to={'/bills'} className='side-list w-full flex items-center gap-3 ps-5 py-2 px-2  pe-12 '>
                            <TbFileInvoice  size={25} className=''/>
                            <p>Bills</p>
                        </Link>
                    </li>
                    <li className='  relative'>
                        <Link to={'/payments'} className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <TbReportMoney size={25} className=''/>
                            <p>Payments</p>
                        </Link>
                    </li>
                    <li className='   relative'>
                        <Link to={'/inventory'} className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <TbBuildingStore size={25} className=''/>
                            <p>Inventory</p>
                        </Link>
                    </li>
                    <li className='   relative'>
                        <button onClick={()=>signout()} type='button' className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <GoSignOut size={25} className=''/>
                            <p>Signout</p>
                        </button>
                    </li>
                </ul>
            </div>
            {/* For mobile view */}
            {displaySidebar && <div className=" animate-slide z-10 min-h-[100vh] bg-[#283a47]  fixed left-0 bottom-0 top-0 pb-10 text-gray-300 font-semibold">
                <div className='bg-[#23333e] flex justify-between items-center ps-5 gap-3 py-5 px-12 cursor-pointer'>
                    <TbUserCircle size={30} className=' '/>
                    <p>Khaja Sawmill</p>
                </div>
                <ul className='mt-20 flex flex-col justify-between gap-3'>
                    <li className='  relative'>
                        <Link to={'/'} className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <MdDashboard size={25} className=''/>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className='  relative'>
                        <Link to={'/bills'} className='side-list w-full flex items-center gap-3 ps-5 py-2 px-2  pe-12 '>
                            <TbFileInvoice  size={25} className=''/>
                            <p>Bills</p>
                        </Link>
                    </li>
                    <li className='  relative'>
                        <Link to={'/payments'} className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <TbReportMoney size={25} className=''/>
                            <p>Payments</p>
                        </Link>
                    </li>
                    <li className='   relative'>
                        <Link to={'/inventory'} className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <TbBuildingStore size={25} className=''/>
                            <p>Inventory</p>
                        </Link>
                    </li>
                    <li className='   relative'>
                        <button onClick={()=>{
                            signout()
                        }} type='button' className='side-list ps-5 py-2 px-2 w-full pe-12  flex  items-center gap-3'>
                            <GoSignOut size={25} className=''/>
                            <p>Signout</p>
                        </button>
                    </li>
                </ul>
                <div className='relative'>
                    <TbArrowBigLeftFilled onClick={()=>setDisplaySidebar(false)} className=' fixed bottom-5 left-5' size={30}/>
                </div>
            </div>}
        </>
    )
}
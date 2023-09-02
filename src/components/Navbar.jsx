import { TbList } from "react-icons/tb";

// eslint-disable-next-line react/prop-types
export default function Navbar({Logo,name,displaySidebar,setDisplaySidebar}){
    return(
        <>
            <div className="bg-[#429a86] w-full p-5 px-10">
                <div className=" flex justify-between items-center gap-3">
                    {displaySidebar ? <p />:<TbList size={30} onMouseOver={()=>setDisplaySidebar(true)} className=' mobile:block cursor-pointer hidden z-10'/>}
                    <div className=" flex justify-start items-center gap-2">
                        <Logo className=' text-[30px]'/>
                        <p className=" font-extrabold">
                            {name}
                        </p>
                    </div>
                </div>   
            </div>
        </>
    )
}